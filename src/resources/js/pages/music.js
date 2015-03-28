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
					var item = MCPi.music.getNowPlayingItem(d);

					if(i == 0) $(id).html(item);
						else $(id).append(item);
				});
			}
		},

		getNowPlayingItem: function(data)
		{
			var image = data.thumbnail;
			var title = data.title;
			var details = [];

			if(data.artist && data.artist.length > 0) details[details.length] = '<b>' + data.artist[0] + '</b>';
			if(data.album) details[details.length] = data.album;
			if(data.genre && data.genre.length > 0) details[details.length] = data.genre[0];
			if(data.year) details[details.length] = data.year;
			if(data.duration) details[details.length] = MCPi.libs.durationToString(data.duration);

			return MCPi.music.getNowPlayingTemplate(data.songid, image, title, details.join(" &bull; "));
		},

		getNowPlayingTemplate: function(id, image, title, details)
		{
			if(image == null || image == "") image = "/resources/images/album.png";
				else image = MCPi.libs.formatAssetURL(image);

			return $([
				'<div class="row">' +
				'	<div class="col-md-12">' +
				'		<div class="dropdown">' +
				'			<div class="media thumbnail">' +
				'				<a class="pull-left" data-toggle="modal">' +
				'					<img class="media-object" src="' + image + '" style="height:2.9em;"/>' +
				'				</a>' +
				'				<div class="media-body">' +
				'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading"> ' + title + '</h5></a>' +
				'					<ul class="dropdown-menu" role="menu">' +
				'						<li><a href="#" data-menu="music" data-exec="playnow" data-refid="' + id + '">Play now</a></li>' +
				'						<li><a href="#" data-menu="music" data-exec="details" data-refid="' + id + '">Details</a></li>' +
				'						<li class="divider"></li>' +
				'						<li class="list-group-item-danger"><a href="#" data-menu="music" data-exec="delete" data-refid="' + id + '">Delete</a></li>' +
				'					</ul>' +
				'					<small> ' + details + ' </small>' +
				'				</div>' +
				'				<div class="media-right">' +
				'					<a href="#" class="btn btn-default btn-xs" role="button" data-refid="' + id + '"><span class="fa fa-arrow-up" aria-hidden="true"></span></a>' +
				'					<a href="#" class="btn btn-default btn-xs" role="button" data-refid="' + id + '"><span class="fa fa-arrow-down" aria-hidden="true"></span></a>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>'
				].join("\n"));
		}
	}
}(window));