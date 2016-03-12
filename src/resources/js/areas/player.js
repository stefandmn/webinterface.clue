(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.Player =
	{
		id: -1,

		vars:
		{
			/* Check if valid properties have been found (about what media content is playing now) and if is true will allow to detected GUI data for rendering */
			allowData: false,
			/* Used especially to identify the video content type (movie or tvshow episode) in order to now what JSON query to use to get the playing data */
			contentType: null
		},

		props:
		{
			speed: 0,
			shuffled: false,
			repeat: "off",
			volume: 0,
			time: 0,
			type: null,
			totalTime: 0,
			position: 0,
			percentage: 0,
			mute: false,
			partymode: false,
			playlistid: 0
		},

		data:
		{
			title: null,
			details: null,
			thumbnail: null,
			reference: null
		},

		const:
		{
			/* Details of now playing screen/control */
			properties: ["speed", "shuffled", "repeat", "time", "totaltime", "position", "percentage", "partymode", "playlistid", "type"]
		},

		/**
		 * Reset properties and variables
		 */
		reset: function ()
		{
			console.log("Player.reset");
			MCPi.Player.id = -1;

			MCPi.Player.props.speed = 0;
			MCPi.Player.props.shuffled = false;
			MCPi.Player.props.repeat = "off";
			MCPi.Player.props.time = 0;
			MCPi.Player.props.type = null;
			MCPi.Player.props.totalTime = 0;
			MCPi.Player.props.position = 0;
			MCPi.Player.props.percentage = 0;
			MCPi.Player.props.partymode = false;
			MCPi.Player.props.playlistid = 0;

			MCPi.Player.props.volume = 100;
			MCPi.Player.props.mute = false;

			MCPi.Player.vars.allowData = false;
			MCPi.Player.vars.contentType = null;
			MCPi.Player.vars.fileReference = null;
		},

		/**
		 * Get player Id. This is a standard method for a generic MCPi object. This type of method should use the
		 * parameters (in the function signature) described below and it is implemented in the way to be used itself
		 * for callback procedure.
		 *
		 * @param input input value of structure (could be any data type). The input parameter is included in the reference structure
		 * 	to be able to be used in the callback implementation part
		 * @param output data structure received from server that should contain the callback processing details. Initially this parameter
		 * 	should be null and it will be filled by callback call
		 * @param chain data structure for chained method execution, to define a process flow. A chain structure is a JSON message and it
		 * 	could have the following attributes:
		 * 		- [<code>input: describes the input value or structure]
		 * 		- [<code>callback</code>: indicates the callback method; usually should be the same method name/signature]
		 * 		- [<code>onsuccess</code>: function/method to be called when the JSON call is executed with success]
		 * 		- [<code>onerror</code>: function/method to be called when the JSON call is executed with errors]
		 * 		- [<code>nextcall</code>: function/method to be called after JSON call, even if the call is executed with success or errors]
		 * 		- [<code>chain</code>: next chain structure to be called]
		 */
		getId: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.getId");
				var reference = {"input":input, "callback":MCPi.Player.getId, "chain":chain};

				MCPi.json.call("Player.GetActivePlayers", {}, reference);
			}
			else
			{
				console.log("Player.getId-Callback");
				if (output && output.result != '') MCPi.Player.id = output.result[0].playerid;
			}
		},

		/**
		 * Get the properties of the current player.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getProperties: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.getProperties(" + MCPi.Player.id + ")");

				var reference = {"input":input, "callback":MCPi.Player.getProperties, "chain":chain};
				MCPi.json.call("Player.GetProperties", {"playerid":MCPi.Player.id, "properties":MCPi.Player.const.properties}, reference);
			}
			else
			{
				console.log("Player.getProperties-Callback");

				if (output && output.result)
				{
					MCPi.Player.props.playlistid = output.result.playlistid;
					MCPi.Player.props.partymode = output.result.partymode;
					MCPi.Player.props.position = output.result.position;
					MCPi.Player.props.percentage = Math.round(output.result.percentage);
					MCPi.Player.props.time = MCPi.libs.timeToDuration(output.result.time);
					MCPi.Player.props.totalTime = MCPi.libs.timeToDuration(output.result.totaltime);
					MCPi.Player.props.repeat = output.result.repeat;
					MCPi.Player.props.shuffled = output.result.shuffled;
					MCPi.Player.props.speed = output.result.speed;
					MCPi.Player.props.type = output.result.type;

					MCPi.Player.vars.allowData = true;
				}
				else MCPi.Player.vars.allowData = false;
			}
		},

		/**
		 * The player read volume properties by reading data from MCPi through JSON calls
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getVolume: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.getVolume");
				var reference = {"input":input, "callback":MCPi.Player.getVolume, "chain":chain};

				MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, reference);
			}
			else
			{
				console.log("Player.getVolume-Callback");

				if (output.result)
				{
					MCPi.Player.props.mute = output.result.muted;
					MCPi.Player.props.volume = output.result.volume;
				}
			}
		},

		/**
		 * Read playing item details doesn't matter what type of entity is about.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		getPlayingItemDetails: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.getPlayingItemDetails");

				var properties = [];
				var reference = {"input":input, "callback":MCPi.Player.getPlayingItemDetails, "chain":chain};

				if (MCPi.Player.id == 0)
				{
					properties = MCPi.json.const.props.audio;
				}
				else if (MCPi.Player.id == 1)
				{
					if (MCPi.Player.vars.contentType == "movie") properties = MCPi.json.const.props.movie;
						else if (MCPi.Player.vars.contentType == "episode") properties = MCPi.json.const.props.episode;
				}

				MCPi.json.call("Player.GetItem", {"playerid":MCPi.Player.id, "properties":properties}, reference);
			}
			else
			{
				console.log("Player.getPlayingItemDetails-Callback");

				if (output.result && output.result.item)
				{
					var text, item = output.result.item;

					//get file reference of the playing item
					MCPi.Player.data.reference = item.file;

					//analyze and define the content of thumbnail
					if (item.thumbnail != null && item.thumbnail != "" && item.thumbnail.indexOf("Default") < 0) MCPi.Player.data.thumbnail = MCPi.libs.formatAssetURL(item.thumbnail);
						else MCPi.Player.data.thumbnail = null;

					if (MCPi.Player.id == 0)			//set audio content
					{
						if (MCPi.Player.data.thumbnail == null) MCPi.Player.data.thumbnail = "/resources/images/album.png";

						if (item.title != null && item.title != "") MCPi.Player.data.title = item.title;
							else MCPi.Player.data.title = item.label;

						text = [];
						if (item.artist != null && item.artist != "") text[text.length] = "<b>" + item.artist + "</b>";
						if (item.album != null && item.album != "") text[text.length] = item.album;
						if (item.year != null && item.year != "") text[text.length] = item.year;

						if (text.length > 0) MCPi.Player.data.details = text.join(" &bull; ");
							else MCPi.Player.data.details = null;

						MCPi.Player.vars.contentType = item.type;
					}
					else if (MCPi.Player.id == 1)	//set video content
					{
						if (MCPi.Player.data.thumbnail == null) MCPi.Player.data.thumbnail = "/resources/images/video.png";

						if (MCPi.Player.vars.contentType == "movie")
						{
							if (item.title != null && item.title != "") MCPi.Player.data.title = item.title;
								else MCPi.Player.data.title = item.label;

							text = [];
							if (item.genre != null && item.genre.length > 3) item.genre.splice(3);
							if (item.genre != null && item.genre.length > 0) text[text.length] = item.genre.join(",");
							if (item.year != null && item.year != "") text[text.length] = item.year;
							if (item.rating != null && item.rating != "") text[text.length] = item.rating.toFixed(1);

							if (text.length > 0) MCPi.Player.data.details = text.join(" &bull; ");
								else MCPi.Player.data.details = null;
						}
						else if (MCPi.Player.vars.contentType == "episode")
						{
							if (item.title != null && item.title != "") MCPi.Player.data.title = item.title;
								else MCPi.Player.data.title = item.label;

							text = [];
							if (item.showtitle != null && item.showtitle != "") text[text.length] = "<b>" + item.showtitle + "</b>";
							if (item.season != null && item.season != "") text[text.length] = "Season " + item.season;
							if (item.episode != null && item.episode != "") text[text.length] = "Episode " + item.episode;
							if (item.rating != null && item.rating != "")text[text.length] = item.rating.toFixed(1);

							if (text.length > 0) MCPi.Player.data.details = text.join(" &bull; ");
								else MCPi.Player.data.details = null;
						}
						else if (MCPi.Player.vars.contentType == null)
						{
							if (item.label != null && item.label != "") MCPi.Player.data.title = item.label;
								else MCPi.Player.data.title = null;

							MCPi.Player.data.details = null;
							MCPi.Player.vars.contentType = item.type;
							MCPi.Player.getPlayingItemDetails(input, null, chain);
						}
					}

					//allow screen details to become visible and display them
					MCPi.Player.vars.allowData = true;
				}
				else MCPi.Player.vars.allowData = false;
			}
		},

		/**
		 * Set <code>Play</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setPlay: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.setPlay");
				var reference = {"input":input, "callback":MCPi.Player.setPlay, "chain":chain};

				MCPi.json.call("Player.PlayPause", {"playerid":MCPi.Player.id}, reference);
			}
			else
			{
				console.log("Player.setPlay-Callback");
				if (output && output.result != null) MCPi.Player.props.speed = output.result.speed;
			}
		},

		/**
		 * Set <code>Stop</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setStop: function (input, output, chain)
		{
			if(output == null)
			{
				console.log("Player.setStop");
				var reference = {"input":input, "callback":MCPi.Player.setStop ,"chain":chain};

				MCPi.json.call("Player.Stop", {"playerid":MCPi.Player.id}, reference);
			}
			else
			{
				if (output != null && output.result == "OK")
				{
					console.log("Player.setStop-Callback");
					MCPi.Player.reset();
				}
			}
		},

		/**
		 * Set fast playing mode of the current player (fast forward or fast rewind)
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setFastPlayingMode: function (input, output, chain)
		{
			if(output == null)
			{
				if(input == null) input = "increment";

				console.log("Player.setFastPlayingMode");
				var reference = {"input":input, "callback":MCPi.Player.setFastPlayingMode, "chain":chain};

				MCPi.json.call("Player.SetSpeed", {"playerid":MCPi.Player.id, "speed":input}, reference);
			}
			else
			{
				console.log("Player.setFastPlayingMode-Callback");
				if (output && output.result != null) MCPi.Player.props.speed = output.result.speed;
			}
		},

		/**
		 * Set <code>FastForward</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setFastForward: function (input, output, chain)
		{
			console.log("Player.setFastForward");
			MCPi.Player.setFastPlayingMode("increment", output, chain);
		},

		/**
		 * Set <code>FastRewind</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setFastRewind: function (input, output, chain)
		{
			console.log("Player.setFastRewind");
			MCPi.Player.setFastPlayingMode("decrement", output, chain);
		},

		/**
		 * Set playing mode of the current player (forward or rewind)
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setPlayingMode: function (input, output, chain)
		{
			if(output == null)
			{
				if(input == null) input = "next";

				console.log("Player.setPlayingMode");
				var reference = {"input":input, "chain":chain};

				MCPi.json.call("Player.GoTo", {"playerid":MCPi.Player.id, "to":input}, reference);
			}
		},

		/**
		 * Set <code>Forward</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setForward: function (input, output, chain)
		{
			console.log("Player.setForward");
			MCPi.Player.setPlayingMode("next", output, chain);
		},

		/**
		 * Set <code>Rewind</code> mode of the current player
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setRewind: function (input, output, chain)
		{
			console.log("Player.setRewind");
			MCPi.Player.setPlayingMode("previous", output, chain);
		},

		/**
		 * Set player in <code>Party</code> mode.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setPartyMode: function(input, output, chain)
		{
			if(output == null)
			{
				if(input == null) input = true;

				console.log("Player.setPartyMode");
				var reference = {"input":input, "callback":MCPi.Player.setPartyMode, "chain":chain};

				MCPi.json.call("Player.SetPartymode", {"playerid":MCPi.Player.id, "partymode":input}, reference);
			}
			else
			{
				if (output != null && output.result == "OK")
				{
					console.log("Player.setPartyMode-Callback");
					MCPi.Player.props.partymode = input;
				}
			}
		},

		/**
		 * Set player in <code>Mute/Unmute</code> mode.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setMute: function(input, output, chain)
		{
			if(output == null)
			{
				if(input == null) input = "toggle";

				if(MCPi.Player.props.mute != input)
				{
					console.log("Player.setMute");
					var reference = {"input":input, "callback":MCPi.Player.setMute, "chain":chain};

					MCPi.json.call("Application.SetMute", {"mute":input}, reference);
				}
			}
			else
			{
				if (output != null && output.result != null)
				{
					console.log("Player.setMute-Callback");
					MCPi.Player.props.mute = output.result;
				}
			}
		},

		/**
		 * Set player volume
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setVolume: function(input, output, chain)
		{
			if(output == null)
			{
				if(input == null) input = "increment";

				console.log("Player.setVolume");
				var reference = {"input":input, "callback":MCPi.Player.setVolume, "chain":chain};

				MCPi.json.call("Application.SetVolume", {"volume":input}, reference);
			}
			else
			{
				if(output != null && output.result != null)
				{
					console.log("Player.setVolume-Callback");

					MCPi.Player.props.volume = output.result;
					MCPi.Player.props.mute = false;
				}
                else MCPi.Player.props.volume = -1;
			}
		},

		/**
		 * Increment player volume
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setIncreaseVolume: function(input, output, chain)
		{
			console.log("Player.setIncreaseVolume");
			MCPi.Player.setVolume("increment", null, chain);
		},

		/**
		 * Decrement player volume
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setDecreaseVolume: function(input, output, chain)
		{
			console.log("Player.setDecreaseVolume");
			MCPi.Player.setVolume("decrement", null, chain);
		},

		/**
		 * THis method is able to decode the <code>input<code> value into a media structure in order to access it.
		 *
		 * @param input input content that could be a string or a JSON structure
		 * @returns {{mediatype: *, mediaid: *}|*}
		 */
		getMediaStructure: function(input)
		{
			var mediaType, mediaId;

			if (typeof input === 'string')
			{
				mediaId = parseInt(input);
				mediaType = MCPi.Player.vars.contentType;
			}
			else
			{
				if(input.mediatype != null) mediaType = input.mediatype;

				if(input.mediaid != null)
				{
					if (typeof input.mediaid === 'string') mediaId = parseInt(input.mediaid);
						else mediaId = input.mediaid;

					if(mediaType == null) mediaType = MCPi.Player.vars.contentType;
				}
				else if(input.songid != null)
				{
					if (typeof input.songid === 'string') mediaId = parseInt(input.songid);
						else mediaId = input.songid;

					if(mediaType == null) mediaType = "song";
				}
				else if(input.movieid != null)
				{
					if (typeof input.movieid === 'string') mediaId = parseInt(input.movieid);
						else mediaId = input.movieid;

					if(mediaType == null) mediaType = "movie";
				}
				else if(input.episodeid != null)
				{
					if (typeof input.episodeid === 'string') mediaId = parseInt(input.episodeid);
						else mediaId = input.episodeid;

					if(mediaType == null) mediaType = "episode";
				}
			}

			return {"mediatype":mediaType, "mediaid": mediaId};
		},

		/**
		 * This method plays a specific media object (song, movie or tvshow episode) described in <code>input</code>
		 * parameter (the input structure is decoded by <code>getMediaStructure</code> method). In case the player
		 * has a queue (a playlist) it will stop playing the current media object and with start playing the specified
		 * media object. After that it will continue to run the queue starting with the next media object.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setOpenMedia: function(input, output, chain)
		{
			if(output == null)
			{
				input = MCPi.Player.getMediaStructure(input);
				console.log("Player.setOpen");

				var parameters, reference = {"input":input, "callback":MCPi.Player.setOpen, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}};

				MCPi.json.call("Player.Open", parameters, reference);
			}
			else
			{
				if(output && output.result == "OK")
				{
					console.log("Player.setOpen-Callback");
				}
			}
		}
	};

	MCPi.Player.GUI =
	{
		/**
		 * Show the NowPlaying panel based on the user action performed n the corresponding button on the
		 * main navigation panel. This action actually do:
		 * 1) set a new view of <code>nowPlayingButton</code> button on navigation panel
		 * 2) get payer id, read player properties, read items details and call <code>display</code> method of this
		 * object to render 'now playing item'.
		 */
		show: function()
		{
			console.log("Player.GUI.show");
			$('#nowPlayingButton span').removeClass("text-primary");

			MCPi.Player.getProperties(null, null, {"nextcall":MCPi.Player.getPlayingItemDetails, "chain":{"nextcall":MCPi.Player.GUI.display}});
		},

		/**
		 * Hone the NowPlaying panel based on the user action performed n the corresponding button on the
		 * main navigation panel. Also this method will display back the standard view of <code>nowPlayingButton</code>
		 * button (classes active and text-primary).
		 */
		hide: function()
		{
			console.log("Player.GUI.hide");

			$('#nowPlayingButton').removeClass('active');
			$('#nowPlayingButton span').addClass("text-primary");
		},

		/**
		 * Fill in the graphical details of this dialog:
		 * 1) display playing item details: title, description and fanart
		 * 2) show progress bar (and current level)
		 * 3) display player controls and their status
		 */
		display: function()
		{
			console.log("Player.GUI.display");

			if(MCPi.Player.vars.allowData)
			{
				$('#nowPlayingData').removeClass("hide");
				$('#nowPlayingData').addClass("show");
				$('#nowPlayingNone').removeClass("show");
				$('#nowPlayingNone').addClass("hide");
				$('#nowPlayingCtrl').removeClass("hide");
				$('#nowPlayingCtrl').addClass("show");

				if(MCPi.Player.data.title != null) $('#nowPlayingItemTitle').html(MCPi.Player.data.title);
					else $('#nowPlayingItemTitle').html("&nbsp;");

				if(MCPi.Player.data.details != null) $('#nowPlayingItemDetails').html(MCPi.Player.data.details);
					else $('#nowPlayingItemDetails').html("&nbsp;");

				$('#nowPlayingItemProgress').css('width', MCPi.Player.props.percentage + '%').attr("aria-valuenow", MCPi.Player.props.percentage);
				$('#nowPlayingItemProgress').html(MCPi.Player.props.percentage + "%");

				$('#nowPlayingItemFanart').attr("src", MCPi.Player.data.thumbnail);
			}
			else
			{
				$('#nowPlayingData').removeClass("show");
				$('#nowPlayingData').addClass("hide");
				$('#nowPlayingNone').removeClass("hide");
				$('#nowPlayingNone').addClass("show");
				$('#nowPlayingCtrl').removeClass("show");
				$('#nowPlayingCtrl').addClass("hide");

				$('#nowPlayingItemTitle').html("&nbsp;");
				$('#nowPlayingItemDetails').html("&nbsp;&nbsp;");
				$('#nowPlayingItemFanart').attr('src', "#");
			}

			var play = $('#nowPlayingPlay');
			if (MCPi.Player.props.speed <= 0 || MCPi.Player.props.speed > 1)
			{
				play.html('<span class="fa fa-play" aria-hidden="true"></span>');
			}
			else if(MCPi.Player.props.speed == 1)
			{
				play.html('<span class="fa fa-pause" aria-hidden="true"></span>');
			}
		},

        /**
		 * Handles click events all buttons and links.
		 *
		 * @param e click event.
		 */
		onClick: function (e)
		{
			e.preventDefault();

			var obj = $(this);
			var id = obj.attr('id');

			console.log("MCPi.Player.GUI.onClick(#" + id + ")");
            MCPi.GUI.runWaitOn();

            switch (id)
            {
				case 'nowPlayingRewind':
					MCPi.Player.GUI.runRewind();
					break;
				case 'nowPlayingFastRewind':
					MCPi.Player.GUI.runFastRewind();
					break;
				case 'nowPlayingStop':
					MCPi.Player.GUI.runStop();
					break;
				case 'nowPlayingPlay':
					MCPi.Player.GUI.runPlay();
					break;
				case 'nowPlayingFastForward':
					MCPi.Player.GUI.runFastForward();
					break;
				case 'nowPlayingForward':
                    MCPi.Player.GUI.runForward();
					break;
            }

            MCPi.GUI.runWaitOff();
		},

        /**
         * This is the synchrony workflow implementation for Rewind action in Player or RemoteControl.
         *
         * @param parentContainer this is the container control that will be used to block all user actions during execution fo this workflow
         */
        runRewind: function(parentContainer)
        {
            console.log("Player.GUI.runRewind");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setRewind();

            MCPi.Player.props.position = 0;
            MCPi.Player.props.percentage = 0;

            MCPi.GUI.refresh();
            MCPi.GUI.runWaitOff(parentContainer);
        },

        /**
         * This is the synchrony workflow implementation for Forward action in Player or RemoteControl.
         *
         * @param parentContainer this is the container control that will be used to block all user actions during execution fo this workflow
         */
        runForward: function(parentContainer)
        {
            console.log("Player.GUI.runForward");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setForward();

            MCPi.Player.props.position = 0;
            MCPi.Player.props.percentage = 0;

            MCPi.GUI.refresh();
            MCPi.GUI.runWaitOff(parentContainer);
        },

        runStop: function(parentContainer)
        {
            console.log("Player.GUI.runStop");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setStop();

            MCPi.GUI.refresh({skip:true});
            MCPi.GUI.runWaitOff(parentContainer);
        },

        runPlay: function(parentContainer)
        {
            console.log("Player.GUI.runPlay");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setPlay();

            MCPi.GUI.refresh();
            MCPi.GUI.runWaitOff(parentContainer);
        },

        runFastRewind: function(parentContainer)
        {
            console.log("Player.GUI.runFastRewind");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setFastRewind();

            MCPi.GUI.refresh();
            MCPi.GUI.runWaitOff(parentContainer);
        },

        runFastForward: function(parentContainer)
        {
            console.log("Player.GUI.runFastForward");

            MCPi.GUI.runWaitOn(parentContainer);
            MCPi.Player.setFastForward();

            MCPi.GUI.refresh();
            MCPi.GUI.runWaitOff(parentContainer);
        }
	};

	MCPi.Player.Queue =
	{
		/**
		 * This method insert on the first position in the current playlist (queue) a new media object. Just to make
		 * clear, in case the player plays the current playlist, the object that is run has index zero.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setInsertMedia: function(input, output, chain)
		{
			if(output == null)
			{
				input = MCPi.Player.getMediaStructure(input);
				console.log("Player.Queue.setInsertMedia");

				var parameters, reference = {"input":input, "callback":MCPi.Playlist.setInsertMedia, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}, "position":1, "playlistid":MCPi.Player.id};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}, "position":1, "playlistid":MCPi.Player.id};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}, "position":1, "playlistid":MCPi.Player.id};

				MCPi.json.call("Playlist.Insert", parameters, reference);
			}
			else
			{
				if(output && output.result == "OK")
				{
					console.log("Player.Queue.setInsertMedia-Callback");
				}
			}
		},

		/**
		 * This method a new media item in the curent playlist (in queue, even if the playlist is created based on
		 * party-mode function)
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setAppendMedia: function(input, output, chain)
		{
			if(output == null)
			{
				input = MCPi.Player.getMediaStructure(input);
				console.log("Player.Queue.setAppendMedia");

				var parameters, reference = {"input":input, "callback":MCPi.Playlist.setAppendMedia, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}, "playlistid":MCPi.Player.id};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}, "playlistid":MCPi.Player.id};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}, "playlistid":MCPi.Player.id};

				MCPi.json.call("Playlist.Add", parameters, reference);
			}
			else
			{
				if(output && output.result == "OK")
				{
					console.log("Player.Queue.setAppendMedia-Callback");
				}
			}
		}
	}
}(window));