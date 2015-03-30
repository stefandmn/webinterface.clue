(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.home =
	{
		init: function()
		{
			MCPi.home.getLatestSongs();
		},

		getLatestSongs: function()
		{
			return MCPi.json.call('AudioLibrary.GetRecentlyAddedSongs', {properties: MCPi.json.props.audio, sort: {method: 'dateadded', order: 'descending'}, limits: {end: 5} }, MCPi.home.popLatestSongs, '#rads');
		},

		popLatestSongs: function(data, id)
		{
			if(data && data.result && data.result.songs)
			{
				$.each(data.result.songs, function (i, d)
				{
					var item = MCPi.home.getSongItem(d);

					if(i == 0) $(id).html(item);
						else $(id).append(item);
				});
			}
		},

		getSongItem: function(data)
		{
			var image = data.thumbnail;
			var titles = [];
			var details = [];

			if(data.artist) titles[titles.length] = '<b>' + data.artist + '</b>';
			if(data.title) titles[titles.length] = data.title;
			if(data.genre && data.genre.length > 3) data.genre.splice(3);
			if(data.genre && data.genre.length > 0) details[details.length] = data.genre.join(",");
			if(data.year) details[details.length] = data.year;

			return MCPi.home.getTemplate(data.songid, "song", image, titles.join(" - "), details.join(" &bull; "));
		},

		getLatestMovies: function()
		{
			return MCPi.json.call('VideoLibrary.GetRecentlyAddedMovies', {properties: MCPi.json.props.movie, sort: {method: 'dateadded', order: 'descending'}, limits: {end: 5} }, MCPi.home.popLatestMovies, '#radm');
		},

		popLatestMovies: function(data, id)
		{
			if(data && data.result && data.result.movies)
			{
				$.each(data.result.movies, function (i, d)
				{
					var item = MCPi.home.getMovieItem(d);

					if(i == 0) $(id).html(item);
						else $(id).append(item);
				})
			}
		},

		getMovieItem: function(data)
		{
			var image = data.thumbnail;
			var titles = [];
			var details = [];

			if(data.title) titles[titles.length] = '<b>' + data.title + '</b>';
			if(data.genre && data.genre.length > 3) data.genre.splice(3);
			if(data.genre && data.genre.length > 0) details[details.length] = data.genre.join(",");
			if(data.rating) details[details.length] = data.rating.toFixed(1);
			if(data.year) details[details.length] = data.year;

			return MCPi.home.getTemplate(data.movieid, "movie", image, titles.join(" - "), details.join(" &bull; "));
		},

		getLatestEpisodes: function()
		{
			return MCPi.json.call('VideoLibrary.GetRecentlyAddedEpisodes', {properties: MCPi.json.props.episode, sort: {method: 'dateadded', order: 'descending'}, limits: {end: 5} }, MCPi.home.popLatestEpisodes, '#rade');
		},

		popLatestEpisodes: function(data, id)
		{
			if(data && data.result && data.result.episodes)
			{
				$.each(data.result.episodes, function (i, d)
				{
					var item = MCPi.home.getEpisodeItem(d);

					if(i == 0) $(id).html(item);
						else $(id).append(item);
				})
			}
			else $(id).html("");
		},

		getEpisodeItem: function(data)
		{
			var image = data.thumbnail;
			var titles = [];
			var details = [];

			if(data.title) titles[titles.length] = '<b>' + data.title + '</b>';
			if(data.showtitle) titles[titles.length] = data.showtitle;
			if(data.season) details[details.length] = "Season " + data.season;
			if(data.episode) details[details.length] = "Episode " + data.episode;
			if(data.rating) details[details.length] = data.rating.toFixed(1);

			return MCPi.home.getTemplate(data.episodeid, "episode", image, titles.join(" - "), details.join(" &bull; "));
		},

		getTemplate: function(id, type, image, title, details)
		{
			if(image == null || image == "")
			{
				if(type.indexOf("song" >= 0)) image = "/resources/images/album.png";
					else image = "/resources/images/video.png";
			}
			else image = MCPi.libs.formatAssetURL(image);

			return $([
				'<div class="row">' +
				'	<div class="col-md-12">' +
				'		<div class="dropdown">' +
				'			<div class="media thumbnail">' +
				'				<a class="pull-left" data-toggle="modal">' +
				'					<img src="' + image + '" style="height:2.9em;"/>' +
				'				</a>' +
				'				<div class="media-body">' +
				'					<a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading" style="cursor:default;"> ' + title + '</h5></a>' +
				'					<ul class="dropdown-menu" role="menu">' +
				'						<li><a scope="home-actions" data-exec="playnow" data-type="' + type + '" data-refid="' + id + '" style="cursor:default;"><span class="fa fa-play-circle text-primary"></span> Play now</a></li>' +
				'						<li class="divider"></li>' +
				'						<li><a scope="home-actions" data-exec="playnext" data-type="' + type + '" data-refid="' + id + '" style="cursor:default;">Add next item</a></li>' +
				'						<li><a scope="home-actions" data-exec="enqueue" data-type="' + type + '" data-refid="' + id + '" style="cursor:default;">Append to playlist</a></li>' +
				'					</ul>' +
				'					<small> ' + details + ' </small>' +
				'				</div>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>'
				].join("\n"));
		},

		onMenuClick: function(e)
		{
			e.preventDefault();
			console.log("exec: home.onMenuClick");

			var obj = $(this);
			var exec = obj.attr("data-exec");
			var type = obj.attr("data-type");
			var refid = obj.attr("data-refid");

			MCPi.player.vars.videoType = type;

			switch (exec)
			{
				case "playnow":
					switch (type)
					{
						case "song":
							MCPi.json.call("Player.Open", {"item":{"songid":parseInt(refid)}}, MCPi.home.onMenuClickCallback);
							break;
						case "movie":
							MCPi.json.call("Player.Open", {"item":{"movieid":parseInt(refid)}}, MCPi.home.onMenuClickCallback);
							break;
						case "episode":
							MCPi.json.call("Player.Open", {"item":{"episodeid":parseInt(refid)}}, MCPi.home.onMenuClickCallback);
							break;
					}
					break;

				case "playnext":
					switch (type)
					{
						case "song":
							MCPi.json.call("Playlist.Insert", {"item":{"songid":parseInt(refid)},"position":1,"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
						case "movie":
							MCPi.json.call("Playlist.Insert", {"item":{"movieid":parseInt(refid)},"position":1,"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
						case "episode":
							MCPi.json.call("Playlist.Insert", {"item":{"episodeid":parseInt(refid)},"position":1,"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
					}
					break;

				case "enqueue":
					switch (type)
					{
						case "song":
							MCPi.json.call("Playlist.Add", {"item":{"songid":parseInt(refid)},"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
						case "movie":
							MCPi.json.call("Playlist.Add", {"item":{"movieid":parseInt(refid)},"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
						case "episode":
							MCPi.json.call("Playlist.Add", {"item":{"episodeid":parseInt(refid)},"playlistid":MCPi.player.props.id}, MCPi.home.onMenuClickCallback);
							break;
					}
					break;
			}
		},

		onMenuClickCallback: function(data)
		{
			console.log("exec: home.onMenuClickCallback");

			if(data && data.result == "OK")
			{
				MCPi.player.getPlayerId();
			}
		}
	}
}(window));