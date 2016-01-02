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
			showFilterPanel: false,
			selectedPlaylist: null,
			fillInNowPlayingQueue: false,
			hashcodeNowPlayingQueue: null,
			currentData: null,
			currentFilter: "#musicFilterA",
			timerProcessId: null,
			nowPlayingProperties: ['title', 'album', 'artist', 'genre', 'thumbnail', 'duration', 'rating', 'file'],
			genres: null,
			albums: null,
			artists: null,
			songs: null,
			files: null
		},

		scope:
		{
			/**
			 * Ask MCPi server for the list of NowPlaying items. This is a JSON command that will be processed by callback function.
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
							var item = MCPi.music.model.getNowPlayingTemplate(i, d);

							if(i == 0) $(id).html(item);
								else $(id).append(item);
						});

						MCPi.music.vars.fillInNowPlayingQueue = false;

						//in case of Now Playing panel is visible you have to refresh it
						if(MCPi.player.model.isVisible()) MCPi.player.scope.setId(MCPi.player.model.setContent);
					}
				}
				else
				{
					$(id).html('<p>&nbsp;</p>');
				}

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
					var index, values = ref.split(":");

					if(values.length == 1)
					{
						index = parseInt(values[0]);
						MCPi.json.call("Playlist.Remove", {"position": index, "playlistid": 0}, MCPi.music.scope.setNowPlayingQueue);
					}
					else if(values.length >= 3)
					{
						index = parseInt(values[0]);
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
					var songid = parseInt(values[1]);

					//insert to index
					MCPi.json.call("Playlist.Insert", {"position": parseInt(index), "item":{"songid":parseInt(songid)}, "playlistid": 0}, MCPi.music.scope.setNowPlayingQueue);
				}
			},

			/**
			 * Select and Play an entry from now playing queue
			 *
			 * @param ref selected reference
			 */
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

			/**
			 * Read all genres and put them in library cache
			 */
			setGenres: function()
			{
				console.log("music.scope.setGenres");

				if(MCPi.music.vars.genres == null)
				{
					MCPi.json.call("AudioLibrary.GetGenres", {}, MCPi.music.scope.setGenresCallback);
				}
			},

			/**
			 * Callback method of reading genres
			 *
			 * @param data data structure received from server
			 */
			setGenresCallback: function(data)
			{
				console.log("music.scope.setGenresCallback");

				if(data && data.result) MCPi.music.vars.genres = data.result.genres;
			},

			/**
			 * Read selected song details to display them on a properties dialog
			 *
			 * @param refid song reference
			 */
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

			/**
			 * Callback method or reading song details to be displayed on the screen.
			 *
			 * @param data data structure received from server
			 */
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

			/**
			 * This is the main method triggered by the end-user when a song profile has be updated. This business method is called by
			 * <code>saveShowDetailsModalDialog</code> model method to start the data saving process in music library.
			 * The workflow starts updating the artist details.
			 * @param input
			 */
			saveSongRelatedData: function(input)
			{
				console.log("music.scope.saveSongRelatedData");

				if(input != null)
				{
					MCPi.music.scope.saveSongArtist(input);
				}
			},

			/**
			 * Save song artist using a JSON input structure. This method is update the artist record from music library and all song
			 * that refers the current artist name will take the new value of the of the specified artist name. This bulk update function is
			 * applicable only if artistall flag is true in the input structure. This flag corresponds in the GUI with a radio-button
			 * by default checked. The next step in song profile update workflow is to call the method that is saving the album
			 * (called here or in the callback method of this function)
			 * .
			 * @param input JSON structure where two attributes are mandatory: artistid and artist (which is the artist name)
			 */
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

			/**
			 * This is the callback function of saving artist routine and in case of successful execution of this operation will trigger
			 * next workflow step.
			 *
			 * @param data data structure received from server
			 * @param reference input parameters that have to be passed to the next workflow step
			 */
			saveSongArtistCallback: function(data, reference)
			{
				console.log("music.scope.saveSongArtistCallback");

				if(data && data.result)
				{
					MCPi.music.scope.saveSongAlbum(reference.params);
				}
			},

			/**
			 * Save song album using a JSON input structure. This method is update the album record from music library and all song
			 * that refers the current album name will take the new value of the of the specified album name. This bulk update function is
			 * applicable only if albumall flag is true in the input structure. This flag corresponds in the GUI with a checkbox-button
			 * by default checked. The next step in song profile update workflow is to call the method that is saving the other song details
			 * (called here or in the callback method of this function)
			 * .
			 * @param input JSON structure where two attributes are mandatory: albumid and album (which is the album name)
			 */
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

			/**
			 * This is the callback function of saving album routine and in case of successful execution of this operation will trigger
			 * next workflow step.
			 *
			 * @param data data structure received from server
			 * @param reference input parameters that have to be passed to the next workflow step
			 */
			saveSongAlbumCallback: function(data, reference)
			{
				console.log("music.scope.saveSongAlbumCallback");

				if(data && data.result)
				{
					MCPi.music.scope.saveSongDetails(reference.params);
				}
			},

			/**
			 * This method will save song direct tags (the properties that are attached directly and not referred). The action is
			 * executed based on a JSON input structure that will specify all song tag values and song library reference.
			 *
			 * @param input JSON input structure containing: title (song title), year, comment, rating, album, artist and genre
			 */
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

			/**
			 * This is the callback method is direct saving step from song profile updating workflow which should trigger
			 * GUI actions (refresh the list,enable/disable buttons, etc.) - depending by the execution status of this method.
			 *
			 * @param data data structure received from server
			 * @param reference input parameters that have to be passed to the next workflow step
			 */
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
			},

			/**
			 * Display the list of existing music playlists (read from playlist location from the MCPi file system).
			 * The answer of this call and the data fetching in the list are managed by callback function.
			 * This scope method is triggered by a "model" method called <code>setShowPlaylists</code>
			 */
			setPlaylists: function()
			{
				var properties = {"directory": "special://profile/playlists/music/", "media": "music", "sort": { "method": "label" } };
				console.log("music.scope.setPlaylists");

				MCPi.json.call("Files.GetDirectory", properties, MCPi.music.scope.setPlaylistsCallback);
			},

			/**
			 * Callback method to read playlist names and references and to pass them to the rendering functions
			 *
			 * @param data JSON output data structure that contains playlist data
			 * @param ref specific playlist reference
			 */
			setPlaylistsCallback: function(data, ref)
			{
				var id = "#musicListItems";
				console.log("music.scope.setPlaylistsCallback");

				if(data && data.result && data.result.files)
				{
					$(id).html( MCPi.music.model.getRootPlaylistTemplate(ref) );

					$.each(data.result.files, function (i, d)
					{
						$(id).append( MCPi.music.model.getPlaylistTemplate(i, d, ref) );
					});
				}
				else
				{
					$(id).html( MCPi.music.model.getRootPlaylistTemplate() );
				}
			},

			/**
			 * This is a "scope" method that is triggered by a "play playlist" GUI option that should performed the following actions:
			 * 1) stop party-mode (in case is activated), 2) clean the default queue, read selected playlist and add all items in queue and
			 * 3) start playing the first item in queue. After these actions the method should call the function to display the content of
			 * the default queue.
			 *
			 * @param ref reference of the selected playlist
			 */
			runPlaylistPlay: function(ref)
			{
				console.log("music.scope.runPlaylistPlay");

				MCPi.json.call("Files.GetDirectory", {"directory":ref, "media":"music", "properties": MCPi.music.vars.nowPlayingProperties}, MCPi.music.scope.setPlaylistsCallback, ref);
			},

			runPlaylistEnqueue: function(ref)
			{
				console.log("music.scope.runPlaylistEnqueue");
			},

			/**
			 * List the content of the selected music playlist
			 *
			 * @param ref playlist reference
			 * @param label playlist name (display name)
			 */
			runPlaylistBrowseInto: function(ref, label)
			{
				console.log("music.scope.runPlaylistBrowseInto");

				if(ref != null && ref != '')
				{
					MCPi.music.model.initDataList(label);
					MCPi.json.call("Files.GetDirectory", {"directory":ref, "media":"music", "properties": MCPi.music.vars.nowPlayingProperties}, MCPi.music.scope.setPlaylistsCallback, ref);
				}
			},

			cleanNowPlayingQueue: function(reference)
			{
				console.log("music.scope.cleanNowPlayingQueue");

				MCPi.json.call("Playlist.Clear", {"playlistid": MCPi.player.scope.props.playlistid}, MCPi.player.scope.setPartyModeCallback, reference);
			},

			cleanNowPlayingQueueCallback: function(data, reference)
			{
				console.log("music.scope.cleanNowPlayingQueueCallback");

				if(data && data.result == "OK")
				{
					//call chain reference
					MCPi.json.chain(reference);
				}
			},

			addPlaylistEntriesInNowPlayingQueue: function(reference)
			{

			}
		},

		model:
		{
			/**
			 * Prepare controls and GUI details when the screen is open or shown
			 */
			show: function()
			{
				console.log("music.model.show");

				MCPi.music.vars.visible = true;
				MCPi.global.scope.addReference(MCPi.music.model.setContent);
			},

			/**
			 * Release controls and GUI details when the screen is become hidden
			 */
			hide: function()
			{
				console.log("music.model.show");

				MCPi.music.vars.visible = false;
				MCPi.global.scope.delReference(MCPi.music.scope.setContent);
			},

			/**
			 * Check if screen panel is visible
			 *
			 * @returns true if screen panel is visible
			 */
			isVisible: function()
			{
				return MCPi.music.vars.visible;
			},

			/**
			 * Check is NowPlaying queue (list) is visible on the Music page.
			 *
			 * @returns true if the list is visible
			 */
			isNowPlayingVisible: function()
			{
				return MCPi.music.model.isVisible() && MCPi.music.vars.showNowPlaying;
			},

			/**
			 * Run automatic refresh routine. Run action to refresh and rebuild screen content
			 */
			setContent: function()
			{
				console.log("music.model.setContent");
				if(MCPi.music.model.isNowPlayingVisible()) MCPi.music.scope.setNowPlayingQueue();
			},

			/**
			 * Initialize music list control, displaying "loading" control and set the list title.
			 *
			 * @param title list title
			 */
			initDataList: function(title)
			{
				console.log("music.model.initDataList");

				if(title != null) $('#musicListTitle').html(title);
					else $('#musicListTitle').html("");

				$('#musicListItems').html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
			},

			/**
			 * This method returns the rating sign (one or many stars) for a song.
			 *
			 * @param rate song rating value
			 */
			getSongRatingSign:function(rate)
			{
				var sup = "";

				if(rate && rate > 0)
				{
					for(var i = 1; i <= rate; i++)
					{
						sup += '<span class="fa fa-star"></span>';
					}

					sup = '<sup>' + sup +'</sup>';
				}

				return sup;
			},

			/**
			 * Trigger all necessary actions and functions to display NowPlaying queue content
			 */
			setShowNowPlayingQueue: function()
			{
				var prev = MCPi.music.vars.currentData;
				console.log("music.model.setShowNowPlayingQueue");

				if(prev != null)
				{
					$(prev).removeClass('active');
					$(prev).removeClass('btn-primary');
					$(prev).addClass('btn-default');
					$(prev).children('span').addClass("text-primary");
				}

				MCPi.music.vars.hashcodeNowPlayingQueue = null;
				MCPi.music.vars.currentData = null;

				MCPi.music.model.initDataList("Now Playing");
				MCPi.music.scope.setNowPlayingQueue();
			},

			/**
			 * Trigger all necessary actions to display the playlists
			 */
			setShowPlaylists: function()
			{
				console.log("music.scope.setShowPlaylists");

				MCPi.music.model.initDataList("Playlists");
				MCPi.music.scope.setPlaylists();
			},

			/**
			 * Manually sort songs in NowPlaying queue by the end-user using drag&drop functions
			 */
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
					var songid = $('#listitem-' + value).attr("data-refid");
					var params = value + ":" + cursor + ":" + songid;

					MCPi.music.scope.runDeleteNowPlayingQueue(params);
				}
			},

			/**
			 * Design a graphical template of a new song item that have to be published in NowPlaying queue.
			 *
			 * @param index song index in the list
			 * @param data JSON structure fragment that represent an entry from the NowPlaying list
			 * @returns HTMl content for the specified song that have to be appended in NowPlaying list
			 */
			getNowPlayingTemplate: function(index, data)
			{
				var songid = data.id;
				var image = data.thumbnail;
				var title = data.title;
				var rating = data.rating;
				var file = data.file;
				var details = [];

				if(title == null || title == "") title = data.label;
				if(data.artist && data.artist.length > 0) details[details.length] = '<b>' + data.artist[0] + '</b>';
				if(data.album) details[details.length] = data.album;
				if(data.genre && data.genre.length > 0) details[details.length] = data.genre[0];
				if(data.year) details[details.length] = data.year;
				if(data.duration) details[details.length] = MCPi.libs.durationToString(data.duration);

				var showFixed = (MCPi.player.scope.props.partymode && index == 0) || (!MCPi.player.scope.props.partymode && MCPi.player.vars.fileReference == file);
				var showPlayNow = (MCPi.player.scope.props.partymode && index > 0) || MCPi.player.id  < 0;
				var showDetails = songid != null;
				var showDelete = index > 0;

				if(image == null || image == "" || image.indexOf("DefaultAlbumCover") >= 0) image = "/resources/images/album.png";
					else image = MCPi.libs.formatAssetURL(image);
				return $([
					'<div class="row' + (!showFixed ? ' item' : '') + '" id="listitem-' + index + '" data-refid="' + songid + '"' + (showFixed ? ' style="cursor:default;"' : '') + '>' +
					'	<div class="col-md-12">' +
					'		<div class="dropdown">' +
					'			<div class="media thumbnail">' +
					'				<a class="pull-left" data-toggle="modal">' +
					'					<img class="media-object" src="' + image + '" style="height:2.9em;' + (index > 0 ? 'cursor:move;' : 'cursor:default;') + '"/>' +
					'				</a>' +
					'				<div class="media-body">' +
					'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading">' + (showFixed ? '<span class="fa fa-play-circle text-primary"></span> ' : '') + title + ' ' + MCPi.music.model.getSongRatingSign(rating) + '</h5></a>' +
					'					<ul class="dropdown-menu" role="menu">' +
	(showPlayNow ?	'						<li><a data-clickthrough="music" data-type="menu-nowplaying" data-exec="playnow" data-refid="' + songid + '" data-index="' + index + '"><span class="fa fa-play-circle text-primary"></span> Play now</a></li>' : '') +
	(showDetails ?	'						<li><a data-clickthrough="music" data-type="menu-nowplaying" data-exec="details" data-refid="' + songid + '" data-index="' + index + '"><span class="fa fa-info-circle"></span> Details</a></li>' : '') +
	(showPlayNow ?	'						<li class="divider"></li>' : '') +
	(showDelete ?	'						<li><a data-clickthrough="music" data-type="menu-nowplaying" data-exec="delete" data-refid="' + songid + '" data-index="' + index + '"><span class="fa fa-minus-circle text-danger"></span> Delete</a></li>' : '') +
					'					</ul>' +
					'					<small style="cursor:default;"> ' + details.join(" &bull; ") + ' </small>' +
					'				</div>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>'
					].join("\n"));
			},

			/**
			 * Implementation of Click event in Music panel. Here are implemented all general options and the specific
			 * functions are implemented in the related methods.
			 *
			 * @param e click event
			 */
			onClick: function(e)
			{
				var obj = $(this);
				var type = obj.attr("data-type");

				console.log("music.model.onClick(" + (obj.attr('id') != null ? "#" + obj.attr('id') : type) + ")");
				e.preventDefault();

				if(type)
				{
					if(type == "area") MCPi.music.model.setSelectedArea(obj);
					else if(type == "filter") MCPi.music.model.setSelectedFilter(obj);
					else if(type == "menu-nowplaying") MCPi.music.model.runActionOnNowPlayingMenuItem(obj);
					else if(type == "menu-playlists") MCPi.music.model.runActionOnPlaylistsMenuItem(obj);
				}
				else
				{
					var name = obj.attr("id");

					switch(name)
					{
						case 'saveDetailsModal':
							MCPi.music.model.saveShowDetailsModalDialog();
							break;
						case 'showNowPlaying':
							MCPi.music.model.setShowNowPlayingQueue();
							break;
						case 'showPlaylists':
							MCPi.music.model.setShowPlaylists();
							break
					}
				}
			},

			/**
			 * This is the first workflow that is executed when an user is selecting a specific area
			 * from Music page/screen.
			 *
			 * @param obj selected area option provided by <code>onClick</code> method
			 */
			setSelectedArea: function(obj)
			{
				var prev = MCPi.music.vars.currentData;
				var type = obj.attr('id').toLowerCase().slice(5);

				console.log("music.model.setSelectedArea(" + type + ")");

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

				if(type != "playlists" && type != "files" && !MCPi.music.vars.showFilterPanel)
				{
					$('#musicFiltersPanel').collapse('show');
					MCPi.music.vars.showFilterPanel = true;
				}
				else if((type == "playlists" || type == "files") && MCPi.music.vars.showFilterPanel)
				{
					$('#musicFiltersPanel').collapse('hide');
					MCPi.music.vars.showFilterPanel = false;
				}

				//delete refresh option from NowPlaying list
				if(MCPi.music.vars.timerProcessId) MCPi.music.scope.delRefresh();

				//handle area option
				switch(type)
				{
					case 'playlists':
						MCPi.music.model.setShowPlaylists();
						break;
					case 'files':
						break;
					case 'songs':
						break;
					case 'albums':
						break;
					case 'artists':
						break;
				}
			},

			/**
			 * This is the first workflow that is executed when an user is selecting a specific filter
			 * from Music page/screen. THe filter panel is available only for specific areas (artists, albums, songs).
			 *
			 * @param obj selected filter option provided by <code>onClick</code> method
			 */
			setSelectedFilter: function(obj)
			{
				var prev = MCPi.music.vars.currentFilter;

				console.log("music.model.setSelectedFilter");

				$(prev).removeClass('active');
				$(prev).removeClass('btn-info');
				$(prev).addClass('btn-default');

				obj.addClass('active');
				obj.addClass('btn-info');
				obj.removeClass('btn-default');

				MCPi.music.vars.currentFilter = "#" + obj.attr('id');
			},

			/**
			 * Implementation of user events that are attached to each song published NowPlaying list
			 *
			 * @param obj related menu of selected song entity from NowPlaying queue
			 */
			runActionOnNowPlayingMenuItem: function(obj)
			{
				var exec = obj.attr("data-exec");
				var index = obj.attr("data-index");
				var refid = obj.attr("data-refid");

				console.log("music.model.runActionOnNowPlayingMenuItem");

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

			/**
			 * Open song details modal dialog to display song ID3 tags. These tags are editable and could be updated by the end-user.
			 * In this method the request to fetch song details (tags) is initiated, in the callback method will be displayed.
			 *
			 * @param index song index in the list. Index 0 in NowPlaying list is not editable
			 * @param refid song reference in the music library
			 */
			openShowDetailsModalDialog: function(index, refid)
			{
				var properties = ["comment", "albumartist"];
				console.log("music.model.openShowDetailsModalDialog(" + index + ", " + refid + ")");

				if(refid != null)
				{
					$('#saveDetailsModal').attr("data-clickthrough", "music");
					$('#showDetailsReferenceId').val(refid);

					if(index == 0 && MCPi.music.model.isNowPlayingVisible()) $('#saveDetailsModal').attr("disabled", "disabled");
						else $('#saveDetailsModal').removeAttr("disabled");

					MCPi.music.scope.setSongDetails(refid);
				}
			},

			/**
			 * This is the callback method of displaying song tags into a modal dialog (to just show them or to update them).
			 *
			 * @param data data structure received from server
			 */
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

			/**
			 * This is the main trigger of saving /updating ID3 tags related to the selected song in the modal dialog.
			 * The song reference (used to update the tags in music library) is stored into a hidden field.
			 */
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
			},

			getRootPlaylistTemplate: function(ref)
			{
				if(ref == null)
				{
					return $([
						'<div class="row">' +
						'	<div class="col-md-12">' +
						'			<div class="media thumbnail">' +
						'				<a class="pull-left" data-toggle="modal">' +
						'					<span class="fa fa-play-circle fa-lg text-primary">' +
						'				</a>' +
						'				<div class="media-body">' +
						'					<a href="#" data-clickthrough="music" id="showNowPlaying" aria-expanded="false"><h4 class="media-heading" title="Now Playing">&bull;&bull;</h4></a>' +
						'				</div>' +
						'			</div>' +
						'	</div>' +
						'</div>'
						].join("\n"));
				}
				else
				{
					return $([
						'<div class="row" data-refid="' + ref + '" style="cursor:default;">' +
						'	<div class="col-md-12">' +
						'			<div class="media thumbnail">' +
						'				<a class="pull-left" data-toggle="modal">' +
						'					<span class="fa fa-level-up fa-lg">' +
						'				</a>' +
						'				<div class="media-body">' +
						'					<a href="#" data-clickthrough="music" id="showPlaylists" aria-expanded="false"><h4 class="media-heading" title="Playlists">&bull;&bull;</h4></a>' +
						'				</div>' +
						'			</div>' +
						'	</div>' +
						'</div>'
						].join("\n"));
				}
			},

			getPlaylistTemplate: function(index, data, ref)
			{
				var refid, image, title, details, rating;

				if(ref == null)
				{
					refid = data.file;
					title = data.label;
					image = "/resources/images/album.png";

					return $([
						'<div class="row" id="listitem-' + index + '" data-refid="' + refid + '" style="cursor:default;">' +
						'	<div class="col-md-12">' +
						'		<div class="dropdown">' +
						'			<div class="media thumbnail">' +
						'				<a class="pull-left" data-toggle="modal">' +
						'					<img class="media-object" src="' + image + '" style="height:1.8em;"/>' +
						'				</a>' +
						'				<div class="media-body">' +
						'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h4 class="media-heading">' + title + '</h4></a>' +
						'					<ul class="dropdown-menu" role="menu">' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="play" data-refid="' + refid + '" data-label="' + title + '"><span class="fa fa-play-circle text-primary"></span> Play</a></li>' +
						'						<li class="divider"></li>' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="browse" data-refid="' + refid + '" data-label="' + title + '"><span class="fa fa-chevron-circle-up"></span> Browse Into</a></li>' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="enqueue" data-refid="' + refid + '" data-label="' + title + '"><span class="fa fa-plus-circle"></span> Enqueue</a></li>' +
						'					</ul>' +
						'				</div>' +
						'			</div>' +
						'		</div>' +
						'	</div>' +
						'</div>'
					].join("\n"));
				}
				else
				{
					refid = data.id;
					title = data.title;
					image = data.thumbnail;
					rating = data.rating;
					details = [];

					if(data.artist && data.artist.length > 0) details[details.length] = '<b>' + data.artist[0] + '</b>';
					if(data.album) details[details.length] = data.album;
					if(data.genre && data.genre.length > 0) details[details.length] = data.genre[0];
					if(data.year) details[details.length] = data.year;
					if(data.duration) details[details.length] = MCPi.libs.durationToString(data.duration);

					if(image == null || image == "" || image.indexOf("Default") >= 0) image = "/resources/images/album.png";
						else image = MCPi.libs.formatAssetURL(image);

					return $([
						'<div class="row" id="listitem-' + index + '" data-refid="' + refid + '" style="cursor:default;">' +
						'	<div class="col-md-12">' +
						'		<div class="dropdown">' +
						'			<div class="media thumbnail">' +
						'				<a class="pull-left" data-toggle="modal">' +
						'					<img class="media-object" src="' + image + '" style="height:2.9em;"/>' +
						'				</a>' +
						'				<div class="media-body">' +
						'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading">' + title + ' ' + MCPi.music.model.getSongRatingSign(rating) + '</h5></a>' +
						'					<ul class="dropdown-menu" role="menu">' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="playnow" data-refid="' + refid + '" data-index="' + index + '"><span class="fa fa-play-circle"></span> Play now</a></li>' +
						'						<li class="divider"></li>' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="enqueue" data-refid="' + refid + '" data-index="' + index + '"><span class="fa fa-plus-circle""></span> Enqueue</a></li>' +
						'						<li><a data-clickthrough="music" data-type="menu-playlists" data-exec="details" data-refid="' + refid + '" data-index="' + index + '"><span class="fa fa-info-circle"></span> Details</a></li>' +
						'					</ul>' +
						'					<small style="cursor:default;"> ' + details.join(" &bull; ") + ' </small>' +
						'				</div>' +
						'			</div>' +
						'		</div>' +
						'	</div>' +
						'</div>'
						].join("\n"));
				}
			},

			/**
			 * Implementation of user events that are attached to each song published NowPlaying list
			 *
			 * @param obj related menu of selected song entity from NowPlaying queue
			 */
			runActionOnPlaylistsMenuItem: function(obj)
			{
				var exec = obj.attr("data-exec");
				var refid = obj.attr("data-refid");
				var label = obj.attr("data-label");

				console.log("music.model.runActionOnPlaylistsMenuItem");

				switch (exec)
				{
					case "play":
						MCPi.music.scope.runPlaylistPlay(refid);
						break;

					case "enqueue":
						MCPi.music.scope.runPlaylistEnqueue(refid);
						break;

					case "browse":
						MCPi.music.scope.runPlaylistBrowseInto(refid, label);
						break;
				}
			}
		}
	}
}(window));