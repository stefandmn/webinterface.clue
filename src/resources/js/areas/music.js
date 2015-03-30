(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.music =
	{
		vars:
		{
			currentData: "#musicPlaylists",
			currentFilter: "#musicFilterA"
		},

		init: function()
		{
			//init screen
			MCPi.music.getNowPlaying();
		},

		onDataClick: function()
		{
			var obj = $(this);
			var prev = MCPi.music.vars.currentData;
			var type = obj.attr('id').toLowerCase().slice(5);

			if(prev != null)
			{
				$(prev).removeClass('active');
				$(prev).removeClass('btn-primary');
				$(prev).addClass('btn-default');
			}

			obj.addClass('active');
			obj.addClass('btn-primary');
			obj.removeClass('btn-default');

			MCPi.music.vars.currentData = "#" + obj.attr('id');

			if(type.indexOf("albums") >=0 || type.indexOf("artists") >= 0 || type.indexOf("songs") >=0 ) $('#musicFiltersPanel').collapse('show');
				else $('#musicFiltersPanel').collapse('hide');
		},

		onFilterClick: function()
		{
			var obj = $(this);
			var prev = MCPi.music.vars.currentFilter;

			$(prev).removeClass('active');
			$(prev).removeClass('btn-info');
			$(prev).addClass('btn-default');

			obj.addClass('active');
			obj.addClass('btn-info');
			obj.removeClass('btn-default');

			MCPi.music.vars.currentFilter = "#" + obj.attr('id');
		},

		getNowPlaying: function()
		{
			return MCPi.json.call("Playlist.GetItems", { "properties": ['title', 'album', 'artist', 'genre', 'thumbnail', 'duration'], "playlistid": 0 }, MCPi.music.getNowPlayingCallback, '#musicListItems');
		},

		getNowPlayingCallback: function(data, id)
		{
			if(data && data.result && data.result.items)
			{
				$.each(data.result.items, function (i, d)
				{
					var item = MCPi.music.getNowPlayingItem(i, d);

					if(i == 0) $(id).html(item);
						else $(id).append(item);
				});
			}
		},

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

			return MCPi.music.getNowPlayingTemplate(i, data.id, image, title, details.join(" &bull; "));
		},

		getNowPlayingTemplate: function(index, songId, image, title, details)
		{
			if(image == null || image == "" || image.indexOf("DefaultAlbumCover") >= 0) image = "/resources/images/album.png";
				else image = MCPi.libs.formatAssetURL(image);

			return $([
				'<div class="row' + (index > 0 ? ' item' : '') + '" id="listitem-' + index + '" data-refid="' + songId + '">' +
				'	<div class="col-md-12">' +
				'		<div class="dropdown">' +
				'			<div class="media thumbnail">' +
				'				<a class="pull-left" data-toggle="modal">' +
				'					<img class="media-object" src="' + image + '" style="height:2.9em;' + (index > 0 ? 'cursor:move;' : 'cursor:default;') + '"/>' +
				'				</a>' +
				'				<div class="media-body">' +
				'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading">' + (index == 0 ? '<span class="fa fa-play-circle text-primary"></span> ' : '') + title + '</h5></a>' +
				'					<ul class="dropdown-menu" role="menu">' +
				(index > 0 ? '						<li><a scope="music-actions" data-exec="playnow" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-play-circle text-primary"></span> Play now</a></li>' : '') +
				'						<li><a scope="music-actions" data-exec="details" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-info-circle"></span> Details</a></li>' +
				(index > 0 ? '						<li class="divider"></li>' : '') +
				(index > 0 ? '						<li><a scope="music-actions" data-exec="delete" data-refid="' + songId + '" data-index="' + index + '"><span class="fa fa-minus-circle text-danger"></span> Delete</a></li>' : '') +
				'					</ul>' +
				'					<small style="cursor:default;"> ' + details + ' </small>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>'
				].join("\n"));
		},

		onChangeNowPlaying: function()
		{
			var indexes = $('#musicListItems').sortable('toArray', {});
			var max = 0, cursor = -1, value = -1;

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

				MCPi.music.onChangeNowPlayingRemove(params);
			}
		},

		onChangeNowPlayingRemove: function(ref)
		{
			if(ref == null || ref == '')
			{
				MCPi.music.getNowPlaying();
			}
			else
			{
				var values = ref.split(":");

				if(values.length == 1)
				{
					var index = parseInt(values[0]);
					MCPi.json.call("Playlist.Remove", {"position": index, "playlistid": 0}, MCPi.music.getNowPlaying);
				}
				else if(values.length >= 3)
				{
					var index = parseInt(values[0]);
					var params = values[1] + ":" + values[2];

					//remove from cursor
					MCPi.json.call("Playlist.Remove", {"position": index, "playlistid": 0}, MCPi.music.onChangeNowPlayingInsert, params);
				}
				else
				{
					MCPi.music.getNowPlaying();
				}
			}
		},

		onChangeNowPlayingInsert: function(data, ref)
		{
			if(!data || !data.result || ref == null || ref.indexOf(":") < 0)
			{
				MCPi.music.getNowPlaying();
			}
			else
			{
				var values = ref.split(":");

				var index = parseInt(values[0]);
				var songId = parseInt(values[1]);

				//insert to index
				MCPi.json.call("Playlist.Insert", {"position": parseInt(index), "item":{"songid":parseInt(songId)}, "playlistid": 0}, MCPi.music.getNowPlaying);
			}
		},

		onChangeNowPlayingPlay: function(ref)
		{
			console.log("exec: music.onChangeNowPlayingPlay");

			if(ref == null || ref == '')
			{
				MCPi.music.getNowPlaying();
			}
			else
			{
				var index = parseInt(ref);
				MCPi.json.call("Player.Open", {"item": {"position": index, "playlistid": 0}}, MCPi.music.getNowPlaying);
			}
		},

		onMusicMenuClick: function(e)
		{
			e.preventDefault();

			var obj = $(this);
			var exec = obj.attr("data-exec");
			var index = obj.attr("data-index");
			var refid = obj.attr("data-refid");

			switch (exec)
			{
				case "playnow":
					MCPi.music.onChangeNowPlayingPlay(index);
					break;

				case "details":
					break;

				case "delete":
					MCPi.music.onChangeNowPlayingRemove(index);
					break;
			}
		}
	}
}(window));