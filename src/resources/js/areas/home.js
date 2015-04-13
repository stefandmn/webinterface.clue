(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.home =
	{
		scope:
		{
			/**
			 * Fill in "#rads" panel the latest songs deployed in Audio library
			 */
			setLatestSongs: function()
			{
				console.log("home.scope.setLatestSongs");

				MCPi.json.call('AudioLibrary.GetRecentlyAddedSongs', {properties: MCPi.json.props.audio, sort: {method: 'dateadded', order: 'ascending'}, limits: {end: 5} }, MCPi.home.scope.setLatestSongsCallback, '#rads');
			},

			/**
			 * Callback method of set latest songs. Receive data from server and fill it in the specified list control.
			 *
			 * @param data list data structure received from server
			 * @param id list identifier
			 */
			setLatestSongsCallback: function(data, id)
			{
				console.log("home.scope.setLatestSongsCallback");

				if(data && data.result && data.result.songs)
				{
					$.each(data.result.songs, function (i, d)
					{
						var item = MCPi.home.scope.getSongItem(d);

						if(i == 0) $(id).html(item);
							else $(id).append(item);
					});
				}
			},

			/**
			 * Returns the HTML content for a song entry that has to be insert in the list
			 *
			 * @param data song data structure with all attributes returned by a JSON call
			 * @returns HTML content for a song info
			 */
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

				return MCPi.home.model.getTemplate(data.songid, "song", image, titles.join(" - "), details.join(" &bull; "));
			},

			/**
			 * Fill in "#radm" panel the latest movies deployed in Video library
			 */
			setLatestMovies: function()
			{
				console.log("home.scope.setLatestMovies");

				MCPi.json.call('VideoLibrary.GetRecentlyAddedMovies', {properties: MCPi.json.props.movie, sort: {method: 'dateadded', order: 'descending'}, limits: {end: 5} }, MCPi.home.scope.setLatestMoviesCallback, '#radm');
			},

			/**
			 * Callback method of set latest movies. Receive data from server and fill it in the specified list control.
			 *
			 * @param data list data structure received from server
			 * @param id list identifier
			 */
			setLatestMoviesCallback: function(data, id)
			{
				console.log("home.scope.setLatestMoviesCallback");

				if(data && data.result && data.result.movies)
				{
					$.each(data.result.movies, function (i, d)
					{
						var item = MCPi.home.scope.getMovieItem(d);

						if(i == 0) $(id).html(item);
							else $(id).append(item);
					})
				}
			},

			/**
			 * Returns the HTML content for a movie entry that has to be insert in the list
			 *
			 * @param data movie data structure with all attributes returned by a JSON call
			 * @returns HTML content for a movie info
			 */
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

				return MCPi.home.model.getTemplate(data.movieid, "movie", image, titles.join(" - "), details.join(" &bull; "));
			},

			/**
			 * Fill in "#rade" panel the latest showTV episode deployed in Video library
			 */
			setLatestEpisodes: function()
			{
				console.log("home.scope.setLatestEpisodes");

				MCPi.json.call('VideoLibrary.GetRecentlyAddedEpisodes', {properties: MCPi.json.props.episode, sort: {method: 'dateadded', order: 'descending'}, limits: {end: 5} }, MCPi.home.scope.setLatestEpisodesCallback, '#rade');
			},

			/**
			 * Callback method of set latest episodes. Receive data from server and fill it in the specified list control.
			 *
			 * @param data list data structure received from server
			 * @param id list identifier
			 */
			setLatestEpisodesCallback: function(data, id)
			{
				console.log("home.scope.setLatestEpisodesCallback");

				if(data && data.result && data.result.episodes)
				{
					$.each(data.result.episodes, function (i, d)
					{
						var item = MCPi.home.scope.getEpisodeItem(d);

						if(i == 0) $(id).html(item);
							else $(id).append(item);
					})
				}
				else $(id).html("");
			},

			/**
			 * Returns the HTML content for a movie entry that has to be insert in the list
			 *
			 * @param data movie data structure with all attributes returned by a JSON call
			 * @returns HTML content for a movie info
			 */
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

				return MCPi.home.model.getTemplate(data.episodeid, "episode", image, titles.join(" - "), details.join(" &bull; "));
			}
		},

		model:
		{
			/**
			 * Prepare controls and GUI details when the screen is open or shown
			 */
			show: function()
			{
				console.log("home.model.show");

				if (!$('#rads').hasClass('in'))
				{
					$('#rads').collapse('show');
				}
			},

			setContent: function()
			{
				if (!$('#rads').hasClass('in'))
				{
					MCPi.home.scope.setLatestSongs();
				}

				if (!$('#radm').hasClass('in'))
				{
					MCPi.home.scope.setLatestMovies();
				}

				if (!$('#rade').hasClass('in'))
				{
					MCPi.home.scope.setLatestEpisodes();
				}
			},

			/**
			 * Build the HTML content related to a media object provided from JSON list of objects.
			 *
			 * @param id object id referred in the Audio or Video library
			 * @param type object type: song, movie or episode
			 * @param image thumbnail URL
			 * @param title obejct title: song, movie or episode name
			 * @param details other details that have to be displayed
			 * @returns HTML formatted content of the media object containing the presentation info and user actions.
			 */
			getTemplate: function(id, type, image, title, details)
			{
				if(image == null || image == "")
				{
					if(type.indexOf("song" >= 0)) image = "/resources/images/album.png";
						else image = "/resources/images/video.png";
				}
				else image = MCPi.libs.formatAssetURL(image);

				return $([
					'<div class="row" style="cursor:default;">' +
					'	<div class="col-md-12">' +
					'		<div class="dropdown">' +
					'			<div class="media thumbnail">' +
					'				<a class="pull-left" data-toggle="modal">' +
					'					<img src="' + image + '" style="height:2.9em;"/>' +
					'				</a>' +
					'				<div class="media-body">' +
					'					<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><h5 class="media-heading"> ' + title + '</h5></a>' +
					'					<ul class="dropdown-menu" role="menu">' +
					'						<li><a data-clickthrough="home" data-exec="playnow" data-type="' + type + '" data-refid="' + id + '"><span class="fa fa-play-circle text-primary"></span> Play now</a></li>' +
					'						<li class="divider"></li>' +
					'						<li><a data-clickthrough="home" data-exec="playnext" data-type="' + type + '" data-refid="' + id + '">Add next item</a></li>' +
					'						<li><a data-clickthrough="home" data-exec="enqueue" data-type="' + type + '" data-refid="' + id + '">Append to playlist</a></li>' +
					'					</ul>' +
					'					<small> ' + details + ' </small>' +
					'				</div>' +
					'			</div>' +
					'		</div>' +
					'	</div>' +
					'</div>'
					].join("\n"));
			},

			/**
			 * Handles click events on lists options.
			 *
			 * @param e click event.
			 */
			onClick: function(e)
			{
				e.preventDefault();

				var obj = $(this);
				var exec = obj.attr("data-exec");
				var type = obj.attr("data-type");
				var refid = obj.attr("data-refid");

				console.log("home.model.onClick");

				MCPi.player.vars.contentType = type;

				switch (exec)
				{
					case "playnow":
						switch (type)
						{
							case "song":
								MCPi.json.call("Player.Open", {"item":{"songid":parseInt(refid)}}, MCPi.home.model.onClickCallback);
								break;
							case "movie":
								MCPi.json.call("Player.Open", {"item":{"movieid":parseInt(refid)}}, MCPi.home.model.onClickCallback);
								break;
							case "episode":
								MCPi.json.call("Player.Open", {"item":{"episodeid":parseInt(refid)}}, MCPi.home.model.onClickCallback);
								break;
						}
						break;

					case "playnext":
						switch (type)
						{
							case "song":
								MCPi.json.call("Playlist.Insert", {"item":{"songid":parseInt(refid)},"position":1,"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
							case "movie":
								MCPi.json.call("Playlist.Insert", {"item":{"movieid":parseInt(refid)},"position":1,"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
							case "episode":
								MCPi.json.call("Playlist.Insert", {"item":{"episodeid":parseInt(refid)},"position":1,"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
						}
						break;

					case "enqueue":
						switch (type)
						{
							case "song":
								MCPi.json.call("Playlist.Add", {"item":{"songid":parseInt(refid)},"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
							case "movie":
								MCPi.json.call("Playlist.Add", {"item":{"movieid":parseInt(refid)},"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
							case "episode":
								MCPi.json.call("Playlist.Add", {"item":{"episodeid":parseInt(refid)},"playlistid":MCPi.player.id}, MCPi.home.model.onClickCallback);
								break;
						}
						break;
				}
			},

			/**
			 * The callback method of functions executed when a list option is pressed
			 *
			 * @param data JSON message returned when a specific list option is called
			 */
			onClickCallback: function(data)
			{
				console.log("home.model.onClickCallback");

				if(data && data.result == "OK")
				{
					MCPi.player.model.refresh();
				}
			}
		}
	}
}(window));