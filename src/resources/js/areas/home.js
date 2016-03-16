(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.Home =
	{
		vars:
		{
			panelData: null
		},

		/**
		 * Read the latest songs deployed in Audio library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getLatestSongs: function (input, output, chain)
		{
			if (output == null)
			{
				console.log("Home.getLatestSongs");
				var reference = {"input":input, "callback":MCPi.Home.getLatestSongs, "chain":chain};

				MCPi.json.call('AudioLibrary.GetRecentlyAddedSongs', {"properties":MCPi.json.const.props.audio, "sort":{"method":'dateadded', "order":'descending'}, "limits":{"end": 5}}, reference);
			}
			else
			{
				if (output && output.result && output.result.songs)
				{
					console.log("Home.getLatestSongs-Callback");
					MCPi.Home.panelData = output.result.songs;
				}
				else MCPi.Home.panelData = null;
			}
		},

		/**
		 * Read the latest movies deployed in Video library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getLatestMovies: function(input, output, chain)
		{
			if (output == null)
			{
				console.log("Home.getLatestMovies");
				var reference = {"input":input, "callback":MCPi.Home.getLatestMovies, "chain":chain};

				MCPi.json.call('VideoLibrary.GetRecentlyAddedMovies', {"properties":MCPi.json.const.props.movie, "sort":{"method":'dateadded', "order":'descending'}, "limits":{"end":5}}, reference);
			}
			else
			{
				if(output && output.result && output.result.movies)
				{
					console.log("Home.getLatestMovies-Callback");
					MCPi.Home.panelData = output.result.movies;
				}
				else MCPi.Home.panelData = null;
			}
		},

		/**
		 * Read the latest showTV episode deployed in Video library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getLatestEpisodes: function (input, output, chain)
		{
			if (output == null)
			{
				console.log("Home.getLatestEpisodes");
				var reference = {"input":input, "callback":MCPi.Home.getLatestEpisodes, "chain":chain};

				MCPi.json.call('VideoLibrary.GetRecentlyAddedEpisodes', {"properties":MCPi.json.const.props.episode, "sort":{"method":'dateadded', "order":'descending'}, "limits":{"end":5}}, reference);
			}
			else
			{
				if (output && output.result && output.result.episodes)
				{
					console.log("Home.getLatestEpisodes-Callback");
					MCPi.Home.panelData = output.result.episodes;
				}
				else MCPi.Home.panelData = null;
			}
		}
	};

	MCPi.Home.GUI =
	{
		vars:
		{
			showPanel: false
		},

		const:
		{
			tmdbUrl: "http://api.themoviedb.org/3/movie/upcoming?api_key=13711e14126f77f8f9ab5fe7937bf6bc"
		},

		/**
		 * This method is called when the <code>home</code> page is called to be open and to display the content. In
		 * addition this method is called also when one of the panels (inside of home screen) is collapsed
		 */
		show: function()
		{
			var obj = $(this);
			var panel = obj.attr("id");
			console.log("Home.GUI.show");

			switch (panel)
			{
				case "recentsongs":
					MCPi.Home.getLatestSongs(null, null, MCPi.Home.GUI.showLatestSongs);
					break;
				case "recentmovies":
					MCPi.Home.getLatestMovies(null, null, MCPi.Home.GUI.showLatestMovies);
					break;
				case "recentepisodes":
					MCPi.Home.getLatestEpisodes(null, null, MCPi.Home.GUI.showLatestEpisodes);
					break;
				case "home":
					if(!MCPi.Home.GUI.vars.showPanel)
					{
						MCPi.Home.GUI.runExtraContent();
						MCPi.Home.GUI.vars.showPanel = true;
					}
					break;
			}
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

			MCPi.Player.vars.contentType = type;
			console.log("Home.GUI.onClick (" + exec + "(" + type + "))");

			switch (exec)
			{
				case "playnow":
					MCPi.Player.setOpenMedia(refid);
					break;

				case "playnext":
					MCPi.Player.Queue.setInsertMedia(refid);
					break;

				case "enqueue":
					MCPi.Player.Queue.setAppendMedia(refid);
					break;
			}
		},

		/**
		 * Fill in "#rads" panel the latest songs deployed in Audio library
		 */
		showLatestSongs: function ()
		{
			console.log("Home.GUI.showLatestSongs");

			if (MCPi.Home.panelData != null)
			{
				$.each(MCPi.Home.panelData, function (i, data)
				{
					var content, image = data.thumbnail, titles = [], details = [];

					if (data.artist) titles[titles.length] = '<b>' + data.artist + '</b>';
					if (data.title) titles[titles.length] = data.title;
					if (data.genre && data.genre.length > 3) data.genre.splice(3);
					if (data.genre && data.genre.length > 0) details[details.length] = data.genre.join(",");
					if (data.year) details[details.length] = data.year;

					content = MCPi.Home.GUI.getTemplateContent(data.songid, "song", image, titles.join(" - "), details.join(" &bull; "));

					if (i == 0) $('#rads').html(content);
						else $('#rads').append(content);
				});
			}
			else $('#rads').html("");

			MCPi.Home.panelData = null;
		},

		/**
		 * Fill in "#radm" panel the latest movies deployed in Video library
		 */
		showLatestMovies: function()
		{
			console.log("Home.GUI.showLatestMovies");

			if (MCPi.Home.panelData != null)
			{
				$.each(MCPi.Home.panelData, function (i, data)
				{
					var content, image = data.thumbnail, titles = [], details = [];

					if(data.title) titles[titles.length] = '<b>' + data.title + '</b>';
					if(data.genre && data.genre.length > 3) data.genre.splice(3);
					if(data.genre && data.genre.length > 0) details[details.length] = data.genre.join(",");
					if(data.rating) details[details.length] = data.rating.toFixed(1);
					if(data.year) details[details.length] = data.year;

					content = MCPi.Home.GUI.getTemplateContent(data.movieid, "movie", image, titles.join(" - "), details.join(" &bull; "));

					if(i == 0) $('#radm').html(content);
						else $('#radm').append(content);
				})
			}
			else $('#radm').html("");

			MCPi.Home.panelData = null;
		},

		/**
		 * Fill in "#rade" panel the latest showTV episode deployed in Video library
		 */
		showLatestEpisodes: function ()
		{
			console.log("Home.GUI.showLatestEpisodes");

			if (MCPi.Home.panelData != null)
			{
				$.each(MCPi.Home.panelData, function (i, data)
				{
					var content, image = data.thumbnail, titles = [], details = [];

					if (data.title) titles[titles.length] = '<b>' + data.title + '</b>';
					if (data.showtitle) titles[titles.length] = data.showtitle;
					if (data.season) details[details.length] = "Season " + data.season;
					if (data.episode) details[details.length] = "Episode " + data.episode;
					if (data.rating) details[details.length] = data.rating.toFixed(1);

					content = MCPi.Home.GUI.getTemplateContent(data.episodeid, "episode", image, titles.join(" - "), details.join(" &bull; "));

					if (i == 0) $('#rade').html(content);
						else $('#rade').append(content);
				})
			}
			else $('#rade').html("");
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
		getTemplateContent: function(id, type, image, title, details)
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

		runExtraContent: function()
		{
			console.log("Home.GUI.runExtraContent");

			$.ajax({
				url: MCPi.Home.GUI.const.tmdbUrl,
				crossDomain: true,
				dataType: 'json'
			}).done(function (output) {
				if(output != null && output.results != null)
				{
					$('#extracontent').html(
					'\n					<div class="panel panel-primary" id="upcoming" data-collapse="home">' +
					'\n						<div class="panel-heading">' +
					'\n							<h4 class="panel-title"><a data-toggle="collapse" data-parent="#upcoming" href="#radu" aria-expanded="true" aria-controls="rade">Upcoming</a></h4>' +
					'\n						</div>' +
					'\n						<div id="radu" class="panel-body panel-collapse collapse">'	);

					$.each(output.results, function(index, value) {
						if(value.backdrop_path != null) $('#radu').append(
						'\n							<div class="media thumbnail">' +
						'\n								<a class="pull-left" href="https://www.themoviedb.org/movie/' + value.id + '" target="_blank">' +
						'\n									<img src="https://image.tmdb.org/t/p/w185/' + value.backdrop_path + '" alt="' + value.title + '" style="height:4em;">' +
						'\n								</a>' +
						'\n								<div class="media-body">' +
						'\n									<h5 class="media-heading text-primary">' + value.title + '</h5>' +
						'\n									<small class="media-object"><span class="fa fa-calendar text-primary"></span> ' + value.release_date + '</small>' +
						'\n									<small class="media-object"><span class="fa fa-star text-primary"></span> ' + value.vote_average + '</small>' +
						'\n								</div>' +
						'\n							</div>'	);
					});

					$('#extracontent').append(
					'\n					</div>');
				}
			});
		}
	}
}(window));