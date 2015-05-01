(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.music =
	{
		vars:
		{
			visible: false,
			showNowPlaying: true,
			fillInNowPlayingQueue: false,
			hashcodeNowPlayingQueue: null,
			currentData: null,
			currentFilter: "#musicFilterA",
			refreshProcessId: null,
			nowPlayingProperties: ['title', 'album', 'artist', 'genre', 'thumbnail', 'duration'],
			genres: null,
			albums: null,
			artists: null,
			songs: null,
			files: null
		},

		scope:
		{
			/**
			 * Set automatic refresh (only one time - immediately after the screen is make it visible)
			 */
			setRefresh: function()
			{
				console.log("music.scope.setRefresh");

				if(!MCPi.music.vars.refreshProcessId)
				{
					MCPi.music.vars.refreshProcessId = setInterval(MCPi.music.model.refresh, MCPi.player.vars.refreshInterval);
				}
			},

			/**
			 * Delete automatic refresh (should be called when the screen is made hidden)
			 */
			delRefresh: function()
			{
				console.log("music.scope.delRefresh");

				if(MCPi.music.vars.refreshProcessId)
				{
					clearInterval(MCPi.music.vars.refreshProcessId);
					MCPi.music.vars.refreshProcessId = null;
				}
			},

			/**
			 * Ask MCPi server for the list of NowPlaying items. THis is a JSON command that will be processed by callback function.
			 */
			setNowPlayingQueue: function()
			{
				console.log("music.scope.setNowPlayingQueue");

				MCPi.music.vars.showNowPlaying = true;
				MCPi.json.call("Playlist.GetItems", { "properties": MCPi.music.vars.nowPlayingProperties, "playlistid": 0 }, MCPi.music.scope.setNowPlayingQueueCallback, '#musicListItems');
			},

			/**
			 * Callback function of asking the list of NoPlaying items.
			 *
			 * @param data JSON answer from server
			 * @param id element id of the list control that have to be filled in
			 */
			setNowPlayingQueueCallback: function(data, id)
			{
				var hashcode;
				console.log("music.scope.setNowPlayingQueueCallback");

				if(data && data.result && data.result.items)
				{
					hashcode = JSON.stringify(data).hashCode();

					if(hashcode != MCPi.music.vars.hashcodeNowPlayingQueue)
					{
						MCPi.music.vars.hashcodeNowPlayingQueue = hashcode;
						MCPi.music.vars.fillInNowPlayingQueue = true;

						$.each(data.result.items, function (i, d)
						{
							var item = MCPi.music.scope.getNowPlayingItem(i, d);

							if(i == 0) $(id).html(item);
								else $(id).append(item);
						});

						MCPi.music.vars.fillInNowPlayingQueue = false;
					}
				}
				else
				{
					$(id).html('<p>&nbsp;</p>');
				}

			},

			/**
			 * Get the HTML content of an item from NowPlaying queue
			 * @param i index of item from NoPlaying list
			 * @param data JSON structure fragment that represent an entry from the NowPlaying list
			 * @returns HTML content of an item from NowPlaying queue
			 */
			getNowPlayingItem: function(i, data)
			{
				var image = data.thumbnail;
				var title = data.title;
				var details = [];

				if(data.artist && data.artist.length > 0) details[details.length] = '<b>' + data.artist[0] + '</b>';
				if(data.album) details[details.length] = data.album;
				if(data.genre && data.genre.length > 0) details[details.length] = data.genre[0];
				if(data.year) details[details.length] = data.year;
				if(data.duration) details[details.length] = MCPi.libs.durationToString(data.duration);

				return MCPi.music.model.getNowPlayingTemplate(i, data.id, image, title, details.join(" &bull; "));
			},

			/**
			 * Delete an item from NowPlaying queue
			 *
			 * @param ref item reference (usually it is an index). When the reference has three elements
			 * (taking into account a specific delimiter) it means that the user did a drag and drop and after
			 * delete action follows an insert event.
			 */
			runDeleteNowPlayingQueue: function(ref)
			{
				console.log("music.scope.runDeleteNowPlayingQueue");

				if(ref == null || ref == '')
				{
					MCPi.music.scope.setNowPlayingQueue();
				}
				else
				{
					var values = ref.split(":");

					if(values.length == 1)
					{
						var index = parseInt(values[0]);
						MCPi.json.call("Playlist.Remove", {"position": index, "playlistid": 0}, MCPi.music.scope.setNowPlayingQueue);
					}
					else if(values.length >= 3)
					{
						var index = parseInt(values[0]);
						var params = values[1] + ":" + values[2];

						//remove from cursor
						MCPi.json.call("Playlist.Remove", {"position": index, "playlistid": 0}, MCPi.music.scope.runInsertNowPlayingQueue, params);
					}
					else
					{
						MCPi.music.scope.setNowPlayingQueue();
					}
				}
			},

			/**
			 * Insert a new element in NowPlaying queue, usually this type event should come from a drag & drop event.
			 *
			 * @param data
			 * @param ref
			 */
			runInsertNowPlayingQueue: function(data, ref)
			{
				console.log("music.scope.runInsertNowPlayingQueue");

				if(!data || !data.result || ref == null || ref.indexOf(":") < 0)
				{
					MCPi.music.scope.setNowPlayingQueue();
				}
				else
				{
					var values = ref.split(":");

					var index = parseInt(values[0]);
					var songId = parseInt(values[1]);

					//insert to index
					MCPi.json.call("Playlist.Insert", {"position": parseInt(index), "item":{"songid":parseInt(songId)}, "playlistid": 0}, MCPi.music.scope.setNowPlayingQueue);
				}
			},

			runPlayEntryNowPlayingQueue: function(ref)
			{
				console.log("music.scope.runPlayEntryNowPlayingQueue");

				if(ref == null || ref == '')
				{
					MCPi.music.scope.setNowPlayingQueue();
				}
				else
				{
					var index = parseInt(ref);
					MCPi.json.call("Player.Open", {"item": {"position": index, "playlistid": 0}}, MCPi.music.scope.setNowPlayingQueue);
				}
			},

			setGenres: function()
			{
				console.log("music.scope.setGenres");

				if(MCPi.music.vars.genres == null)
				{
					MCPi.json.call("AudioLibrary.GetGenres", {}, MCPi.music.scope.setGenresCallback);
				}
			},

			setGenresCallback: function(data)
			{
				console.log("music.scope.setGenresCallback");

				if(data && data.result) MCPi.music.vars.genres = data.result.genres;
			},

			setSongDetails: function(refid)
			{
				var properties = ["comment", "albumid", "artistid"];
				console.log("music.scope.runShowSongDetails(" + refid + ")");

				if(refid != null)
				{
					properties = properties.concat(MCPi.json.props.audio);
					MCPi.json.call("AudioLibrary.GetSongDetails", {"songid":parseInt(refid), "properties":properties}, MCPi.music.scope.setSongDetailsCallback);
				}
			},

			setSongDetailsCallback: function(data)
			{
				var output = {title:null, artist:null, album:null, albumid:null, year:null, comment:null, genre:null, rating: null};
				console.log("music.scope.runShowSongDetailsCallback");

				if(data != null && data.result != null && data.result.songdetails != null)
				{
					output.title = data.result.songdetails.title;
					output.artist = data.result.songdetails.artist != null ? data.result.songdetails.artist[0] : null;
					output.artistid = data.result.songdetails.artistid != null ? data.result.songdetails.artistid[0] : null;
					output.album = data.result.songdetails.album;
					output.albumid = data.result.songdetails.albumid;
					output.year= data.result.songdetails.year;
					output.comment = data.result.songdetails.comment;
					output.genre = data.result.songdetails.genre != null ? data.result.songdetails.genre[0] : null;
					output.rating = data.result.songdetails.rating != null ? data.result.songdetails.rating : 0;

					MCPi.music.model.openShowDetailsModalDialogCallback(output);
				}
			},

			saveSongRelatedData: function(input)
			{
				console.log("music.scope.saveSongRelatedData");

				if(input != null)
				{
					MCPi.music.scope.saveSongArtist(input);
				}
			},

			saveSongArtist: function(input)
			{
				var properties = null, refid = (input != null && input.artistid != null ? input.artistid : null);
				console.log("music.scope.saveSongArtist");

				if(input != null && refid != null && input.artist != null && input.artistall)
				{
					properties = {"artistid":parseInt(refid), "artist":input.artist};
					MCPi.json.call("AudioLibrary.SetArtistDetails", properties, MCPi.music.scope.saveSongArtistCallback, {params:input});
				}
				else MCPi.music.scope.saveSongAlbum(input);
			},

			saveSongArtistCallback: function(data, reference)
			{
				console.log("music.scope.saveSongArtistCallback");

				if(data && data.result)
				{
					MCPi.music.scope.saveSongAlbum(reference.params);
				}
			},

			saveSongAlbum: function(input)
			{
				var properties = null, refid = (input != null && input.albumid != null ? input.albumid : null);
				console.log("music.scope.saveSongAlbum(" + refid + ")");

				if(input != null && refid != null && input.album != null && input.albumall)
				{
					properties = {"albumid":parseInt(refid), "title":input.album};
					MCPi.json.call("AudioLibrary.SetAlbumDetails", properties, MCPi.music.scope.saveSongAlbumCallback, {params:input});
				}
				else MCPi.music.scope.saveSongDetails(input);
			},

			saveSongAlbumCallback: function(data, reference)
			{
				console.log("music.scope.saveSongAlbumCallback");

				if(data && data.result)
				{
					MCPi.music.scope.saveSongDetails(reference.params);
				}
			},

			saveSongDetails: function(input)
			{
				var properties = null, refid = (input != null && input.songid != null ? input.songid : null);
				console.log("music.scope.saveSongDetails(" + refid + ")");

				if(input != null && input.songid != null)
				{
					properties = {"songid":parseInt(refid), "title":input.title,
						"year":input.year, "comment":input.comment, "rating":input.rating,
						"album":input.album, "artist":[input.artist], "genre":[input.genre]};

					MCPi.json.call("AudioLibrary.SetSongDetails", properties, MCPi.music.scope.saveSongDetailsCallback, {params:input});
				}
			},

			saveSongDetailsCallback: function(data, reference)
			{
				var refid = reference != null && reference.params != null && reference.params.songid != null ? reference.params.songid : null;
				console.log("music.scope.saveSongDetailsCallback(" + refid + ") - " + JSON.stringify(data));

				if(data && data.result && refid != null)
				{
					if($('#musicListItems').children('div [data-refid=' +refid + "]").length > 0)
					{
						var elem = $('#musicListItems [data-refid=' + refid + ']');
						var index = parseInt(elem.attr("id").substring("listitem-".length));

						MCPi.music.scope.runDeleteNowPlayingQueue(index + ":" + index + ":" + refid);
					}
				}
			}
		},

		model:
		{
			show: function()
			{
				console.log("music.model.show");

				MCPi.music.vars.visible = true;
				MCPi.music.scope.setNowPlayingQueue();

				if(MCPi.player.model.isVisible()) MCPi.player.scope.setPersistentReference(MCPi.music.model.refresh);
					else MCPi.music.scope.setRefresh();
			},

			/**
			 * Release controls and GUI details when the screen is become hidden
			 */
			hide: function()
			{
				if(MCPi.player.model.isVisible() && MCPi.music.model.isNowPlayingVisible()) MCPi.player.scope.delPersistentReference();
					else MCPi.music.scope.delRefresh();

				MCPi.music.vars.visible = false;
			},

			isVisible: function()
			{
				return MCPi.music.vars.visible;
			},

			isNowPlayingVisible: function()
			{
				return MCPi.music.model.isVisible() && MCPi.music.vars.showNowPlaying;
			},

			/**
			 * Run automatic refresh routine. Run action to refresh and rebuild screen content
			 */
			refresh: function()
			{
				console.log("music.model.refresh");
				if(MCPi.music.model.isNowPlayingVisible()) MCPi.music.scope.setNowPlayingQueue();
			},

			onSortNowPlayingQueue: function()
			{
				var indexes = $('#musicListItems').sortable('toArray', {});
				var max = 0, cursor = -1, value = -1;

				console.log("music.model.onSortNowPlayingQueue");

				for(var i = 0; i < indexes.length; i++)
				{
					var c = i + 1;
					var v = parseInt(indexes[i].slice("listitem".length + 1));

					if (Math.abs(c - v) > max)
					{
						cursor = c;
						value = v;

						max = Math.abs(c - v);
					}
				}

				if( cursor > 0)
				{
					var songId = $('#listitem-' + value).attr("data-refid");
					var params = value + ":" + cursor + ":" + songId;

					MCPi.music.scope.runDeleteNowPlayingQueue(params);
				}
			},

			getNowPlayingTemplate: function(index, songId, image, title, details)
			{
				if(image == null || image == "" || image.indexOf("DefaultAlbumCover") >= 0) image = "/resources/images/album.png";
					else image = MCPi.libs.formatAssetURL(image);

				return $([
					'<div class="row' + (index > 0 ? ' item' : '') + '" id="listitem-' + index + '" data-refid="' + songId + '"' + (index == 0 ? ' style="cursor:default;"' : '') + '>' +
					'	<div class="col-md-12">' +
					'		<div class="dropdown">' +
					'			<div class="media thumbnail">' +
					'				<a class="pull-left" data-toggle="modal">' +
					'					<img class="media-object" src="' + image + '" style="height:2.9em;' + (index > 0 ? 'cursor:move;' : 'cursor:default;') + '"/>' +
					'				</a>' +
					'				<div class="media-body">' +
					'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading">' + (index == 0 ? '<span class="fa fa-play-circle text-primary"></span> ' : '') + title + '</h5></a>' +
					'					<ul class="dropdown-menu" role="menu">' +
					(index > 0 || MCPi.player.id  < 0 ? '						<li><a data-clickthrough="music" data-type="menu" data-exec="playnow" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-play-circle text-primary"></span> Play now</a></li>' : '') +
					'						<li><a data-clickthrough="music" data-type="menu" data-exec="details" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-info-circle"></span> Details</a></li>' +
					(index > 0 ? '						<li class="divider"></li>' : '') +
					(index > 0 ? '						<li><a data-clickthrough="music" data-type="menu" data-exec="delete" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-minus-circle text-danger"></span> Delete</a></li>' : '') +
					'					</ul>' +
					'					<small style="cursor:default;"> ' + details + ' </small>' +
					'				</div>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>'
					].join("\n"));
			},

			onClick: function(e)
			{
				var obj = $(this);
				var type = obj.attr("data-type");

				console.log("music.model.onClick(#" + obj.attr('id') + ")");
				e.preventDefault();

				if(type)
				{
					if(type == "area") MCPi.music.model.showArea(obj);
						else if(type == "filter") MCPi.music.model.showFilter(obj);
							else if(type == "menu") MCPi.music.model.runActionOnMenuItem(obj);
				}
				else
				{
					var name = obj.attr("id");

					switch(name)
					{
						case 'saveDetailsModal':
							MCPi.music.model.saveShowDetailsModalDialog();
							break;
					}
				}
			},

			showArea: function(obj)
			{
				var prev = MCPi.music.vars.currentData;
				var type = obj.attr('id').toLowerCase().slice(5);

				console.log("music.model.showArea");

				if(prev != null)
				{
					$(prev).removeClass('active');
					$(prev).removeClass('btn-primary');
					$(prev).addClass('btn-default');
					$(prev).children('span').addClass("text-primary");
				}

				obj.addClass('active');
				obj.addClass('btn-primary');
				obj.removeClass('btn-default');
				obj.children('span').removeClass("text-primary");

				MCPi.music.vars.showNowPlaying = false;
				MCPi.music.vars.currentData = "#" + obj.attr('id');

				if(type.indexOf("albums") >=0 || type.indexOf("artists") >= 0 || type.indexOf("songs") >=0 )
				{
					$('#musicFiltersPanel').collapse('show');
				}
				else
				{
					$('#musicFiltersPanel').collapse('hide');
				}
			},

			showFilter: function(obj)
			{
				var prev = MCPi.music.vars.currentFilter;

				console.log("music.model.showFilter");

				$(prev).removeClass('active');
				$(prev).removeClass('btn-info');
				$(prev).addClass('btn-default');

				obj.addClass('active');
				obj.addClass('btn-info');
				obj.removeClass('btn-default');

				MCPi.music.vars.currentFilter = "#" + obj.attr('id');
			},

			runActionOnMenuItem: function(obj)
			{
				var exec = obj.attr("data-exec");
				var index = obj.attr("data-index");
				var refid = obj.attr("data-refid");

				console.log("music.model.runActionOnMenuItem");

				switch (exec)
				{
					case "playnow":
						MCPi.music.scope.runPlayEntryNowPlayingQueue(index);
						break;

					case "details":
						MCPi.music.model.openShowDetailsModalDialog(index, refid);
						break;

					case "delete":
						MCPi.music.scope.runDeleteNowPlayingQueue(index);
						break;
				}
			},

			openShowDetailsModalDialog: function(index, refid)
			{
				var properties = ["comment", "albumartist"];
				console.log("music.model.openShowDetailsModalDialog(" + index + ", " + refid + ")");

				if(refid != null)
				{
					$('#saveDetailsModal').attr("data-clickthrough", "music");
					$('#showDetailsReferenceId').val(refid);

					if(index == 0) $('#saveDetailsModal').attr("disabled", "disabled");
						else $('#saveDetailsModal').removeAttr("disabled");

					MCPi.music.scope.setSongDetails(refid);
				}
			},

			openShowDetailsModalDialogCallback: function(data)
			{
				console.log("music.model.openShowDetailsModalDialogCallback " + data.artistid);

				if(data)
				{
					$('#musicTitle').val(data.title);
					$('#musicArtist').val(data.artist);
					$('#musicArtistId').val(data.artistid);
					$('#musicAlbum').val(data.album);
					$('#musicAlbumId').val(data.albumid);
					$('#musicYear').val(data.year);
					$('#musicGenre').val(data.genre);

					if(data.comment != null) $('#musicComment').val(data.comment);

					$('#musicRating').val(data.rating);
					$('#musicRating').rating();

					$('#musicShowDetails').removeClass("hide");
					$('#musicShowDetails').addClass("show");
					$('#showDetailsModal').modal('show');
				}
			},

			saveShowDetailsModalDialog: function()
			{
				var output = {songid:null, title:null, artistid:null, artist:null, albumid:null, album:null, year:null, comment:null, genre:null, rating: null};
				console.log("music.model.saveShowDetailsModalDialog");

				output.songid = $('#showDetailsReferenceId').val();
				output.title = $('#musicTitle').val();
				output.artist = $('#musicArtist').val();
				output.artistid = $('#musicArtistId').val();
				output.album = $('#musicAlbum').val();
				output.albumid = $('#musicAlbumId').val();
				output.genre = $('#musicGenre').val();
				output.comment = $('#musicComment').val();
				output.year = $('#musicYear').val() != null ? parseInt($('#musicYear').val()) : null;
				output.rating = $('#musicRating').val() != null ? parseInt($('#musicRating').val()) : 0;

				output.artistall = $("#musicArtistAll").is(":checked") ? true : false;
				output.albumall = $("#musicAlbumAll").is(":checked") ? true : false;

				MCPi.music.scope.saveSongRelatedData(output);

				$('#showDetailsModal').modal('hide');
			}
		}
	}
}(window));