(function (window)
{
	'use strict';
	var Clue = window.Clue;

	Clue.Player =
	{
		id: -1,

		vars:
		{
			/** Check if valid properties have been found (about what media content is playing now) and if is true will allow to detected GUI data for rendering */
			allowData: false,
			/** Used especially to identify the video content type (movie or tvshow episode) in order to now what JSON query to use to get the playing data */
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
			/** Details of now playing screen/control */
			properties: ["speed", "shuffled", "repeat", "time", "totaltime", "position", "percentage", "partymode", "playlistid", "type"]
		},

		/**
		 * Reset properties and variables
		 */
		reset: function ()
		{
			console.log("Player.reset");
			Clue.Player.id = -1;

			Clue.Player.props.speed = 0;
			Clue.Player.props.shuffled = false;
			Clue.Player.props.repeat = "off";
			Clue.Player.props.time = 0;
			Clue.Player.props.type = null;
			Clue.Player.props.totalTime = 0;
			Clue.Player.props.position = 0;
			Clue.Player.props.percentage = 0;
			Clue.Player.props.partymode = false;
			Clue.Player.props.playlistid = 0;

			Clue.Player.props.volume = 100;
			Clue.Player.props.mute = false;

			Clue.Player.vars.allowData = false;
			Clue.Player.vars.contentType = null;
			Clue.Player.vars.fileReference = null;
		},

		/**
		 * Get player Id. This is a standard method for a generic Clue object. This type of method should use the
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
				var reference = {"input":input, "callback":Clue.Player.getId, "chain":chain};

				Clue.json.call("Player.GetActivePlayers", {}, reference);
			}
			else
			{
				console.log("Player.getId-Callback");
				if (output && output.result != '') Clue.Player.id = output.result[0].playerid;
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
				console.log("Player.getProperties(" + Clue.Player.id + ")");

				var reference = {"input":input, "callback":Clue.Player.getProperties, "chain":chain};
				Clue.json.call("Player.GetProperties", {"playerid":Clue.Player.id, "properties":Clue.Player.const.properties}, reference);
			}
			else
			{
				console.log("Player.getProperties-Callback");

				if (output && output.result)
				{
					Clue.Player.props.playlistid = output.result.playlistid;
					Clue.Player.props.partymode = output.result.partymode;
					Clue.Player.props.position = output.result.position;
					Clue.Player.props.percentage = Math.round(output.result.percentage);
					Clue.Player.props.time = Clue.libs.timeToDuration(output.result.time);
					Clue.Player.props.totalTime = Clue.libs.timeToDuration(output.result.totaltime);
					Clue.Player.props.repeat = output.result.repeat;
					Clue.Player.props.shuffled = output.result.shuffled;
					Clue.Player.props.speed = output.result.speed;
					Clue.Player.props.type = output.result.type;

					//console.log("Player Properties: " + JSON.stringify(output.result));
					Clue.Player.vars.allowData = true;
				}
				else Clue.Player.vars.allowData = false;
			}
		},

		/**
		 * The player read volume properties by reading data from Clue through JSON calls
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
				var reference = {"input":input, "callback":Clue.Player.getVolume, "chain":chain};

				Clue.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, reference);
			}
			else
			{
				console.log("Player.getVolume-Callback");

				if (output.result)
				{
					Clue.Player.props.mute = output.result.muted;
					Clue.Player.props.volume = output.result.volume;
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
				var reference = {"input":input, "callback":Clue.Player.getPlayingItemDetails, "chain":chain};

				if (Clue.Player.id == 0)
				{
					properties = Clue.json.const.props.audio;
				}
				else if (Clue.Player.id == 1)
				{
					if (Clue.Player.vars.contentType == "movie") properties = Clue.json.const.props.movie;
						else if (Clue.Player.vars.contentType == "episode") properties = Clue.json.const.props.episode;
				}

				Clue.json.call("Player.GetItem", {"playerid":Clue.Player.id, "properties":properties}, reference);
			}
			else
			{
				console.log("Player.getPlayingItemDetails-Callback");

				if (output.result && output.result.item)
				{
					var text, item = output.result.item;

					//get file reference of the playing item
					Clue.Player.data.reference = item.file;

					//analyze and define the content of thumbnail
					if (item.thumbnail != null && item.thumbnail != "" && item.thumbnail.indexOf("Default") < 0) Clue.Player.data.thumbnail = Clue.libs.formatAssetURL(item.thumbnail);
						else Clue.Player.data.thumbnail = null;

					if (Clue.Player.id == 0)			//set audio content
					{
						if (Clue.Player.data.thumbnail == null) Clue.Player.data.thumbnail = "/resources/images/album.png";

						if (item.title != null && item.title != "") Clue.Player.data.title = item.title;
							else Clue.Player.data.title = item.label;

						text = [];
						if (item.artist != null && item.artist != "") text[text.length] = "<b>" + item.artist + "</b>";
						if (item.album != null && item.album != "") text[text.length] = item.album;
						if (item.year != null && item.year != "") text[text.length] = item.year;

						if (text.length > 0) Clue.Player.data.details = text.join(" &bull; ");
							else Clue.Player.data.details = null;

						Clue.Player.vars.contentType = item.type;
					}
					else if (Clue.Player.id == 1)	//set video content
					{
						if (Clue.Player.data.thumbnail == null) Clue.Player.data.thumbnail = "/resources/images/video.png";

						if (Clue.Player.vars.contentType == "movie")
						{
							if (item.title != null && item.title != "") Clue.Player.data.title = item.title;
								else Clue.Player.data.title = item.label;

							text = [];
							if (item.genre != null && item.genre.length > 3) item.genre.splice(3);
							if (item.genre != null && item.genre.length > 0) text[text.length] = item.genre.join(",");
							if (item.year != null && item.year != "") text[text.length] = item.year;
							if (item.rating != null && item.rating != "") text[text.length] = item.rating.toFixed(1);

							if (text.length > 0) Clue.Player.data.details = text.join(" &bull; ");
								else Clue.Player.data.details = null;
						}
						else if (Clue.Player.vars.contentType == "episode")
						{
							if (item.title != null && item.title != "") Clue.Player.data.title = item.title;
								else Clue.Player.data.title = item.label;

							text = [];
							if (item.showtitle != null && item.showtitle != "") text[text.length] = "<b>" + item.showtitle + "</b>";
							if (item.season != null && item.season != "") text[text.length] = "Season " + item.season;
							if (item.episode != null && item.episode != "") text[text.length] = "Episode " + item.episode;
							if (item.rating != null && item.rating != "")text[text.length] = item.rating.toFixed(1);

							if (text.length > 0) Clue.Player.data.details = text.join(" &bull; ");
								else Clue.Player.data.details = null;
						}
						else if (Clue.Player.vars.contentType == null)
						{
							if (item.label != null && item.label != "") Clue.Player.data.title = item.label;
								else Clue.Player.data.title = null;

							Clue.Player.data.details = null;
							Clue.Player.vars.contentType = item.type;
							Clue.Player.getPlayingItemDetails(input, null, chain);
						}
					}

					//allow screen details to become visible and display them
					Clue.Player.vars.allowData = true;
				}
				else Clue.Player.vars.allowData = false;
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
				var reference = {"input":input, "callback":Clue.Player.setPlay, "chain":chain};

				Clue.json.call("Player.PlayPause", {"playerid":Clue.Player.id}, reference);
			}
			else
			{
				console.log("Player.setPlay-Callback");
				if (output && output.result != null) Clue.Player.props.speed = output.result.speed;
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
				var reference = {"input":input, "callback":Clue.Player.setStop ,"chain":chain};

				Clue.json.call("Player.Stop", {"playerid":Clue.Player.id}, reference);
			}
			else
			{
				if (output != null && output.result == "OK")
				{
					console.log("Player.setStop-Callback");
					Clue.Player.reset();
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
				var reference = {"input":input, "callback":Clue.Player.setFastPlayingMode, "chain":chain};

				Clue.json.call("Player.SetSpeed", {"playerid":Clue.Player.id, "speed":input}, reference);
			}
			else
			{
				console.log("Player.setFastPlayingMode-Callback");
				if (output && output.result != null) Clue.Player.props.speed = output.result.speed;
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
			Clue.Player.setFastPlayingMode("increment", output, chain);
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
			Clue.Player.setFastPlayingMode("decrement", output, chain);
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

				Clue.json.call("Player.GoTo", {"playerid":Clue.Player.id, "to":input}, reference);
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
			Clue.Player.setPlayingMode("next", output, chain);
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
			Clue.Player.setPlayingMode("previous", output, chain);
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
				var reference = {"input":input, "callback":Clue.Player.setPartyMode, "chain":chain};

				Clue.json.call("Player.SetPartymode", {"playerid":Clue.Player.id, "partymode":input}, reference);
			}
			else
			{
				if (output != null && output.result == "OK")
				{
					console.log("Player.setPartyMode-Callback");
					Clue.Player.props.partymode = input;
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

				if(Clue.Player.props.mute != input)
				{
					console.log("Player.setMute");
					var reference = {"input":input, "callback":Clue.Player.setMute, "chain":chain};

					Clue.json.call("Application.SetMute", {"mute":input}, reference);
				}
			}
			else
			{
				if (output != null && output.result != null)
				{
					console.log("Player.setMute-Callback");
					Clue.Player.props.mute = output.result;
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
				var reference = {"input":input, "callback":Clue.Player.setVolume, "chain":chain};

				Clue.json.call("Application.SetVolume", {"volume":input}, reference);
			}
			else
			{
				if(output != null && output.result != null)
				{
					console.log("Player.setVolume-Callback");

					Clue.Player.props.volume = output.result;
					Clue.Player.props.mute = false;
				}
                else Clue.Player.props.volume = -1;
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
			Clue.Player.setVolume("increment", null, chain);
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
			Clue.Player.setVolume("decrement", null, chain);
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
				mediaType = Clue.Player.vars.contentType;
			}
			else
			{
				if(input.mediatype != null) mediaType = input.mediatype;

				if(input.mediaid != null)
				{
					if (typeof input.mediaid === 'string') mediaId = parseInt(input.mediaid);
						else mediaId = input.mediaid;

					if(mediaType == null) mediaType = Clue.Player.vars.contentType;
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
				input = Clue.Player.getMediaStructure(input);
				console.log("Player.setOpen");

				var parameters, reference = {"input":input, "callback":Clue.Player.setOpenMedia, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}};

				Clue.json.call("Player.Open", parameters, reference);
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

	Clue.Player.GUI =
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

			Clue.Player.getProperties(null, null, {"nextcall":Clue.Player.getPlayingItemDetails, "chain":{"nextcall":Clue.Player.GUI.display}});
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

			if(Clue.Player.vars.allowData)
			{
				$('#nowPlayingData').removeClass("hide");
				$('#nowPlayingData').addClass("show");
				$('#nowPlayingNone').removeClass("show");
				$('#nowPlayingNone').addClass("hide");
				$('#nowPlayingCtrl').removeClass("hide");
				$('#nowPlayingCtrl').addClass("show");

				if(Clue.Player.data.title != null) $('#nowPlayingItemTitle').html(Clue.Player.data.title);
					else $('#nowPlayingItemTitle').html("&nbsp;");

				if(Clue.Player.data.details != null) $('#nowPlayingItemDetails').html(Clue.Player.data.details);
					else $('#nowPlayingItemDetails').html("&nbsp;");

				$('#nowPlayingItemProgress').css('width', Clue.Player.props.percentage + '%').attr("aria-valuenow", Clue.Player.props.percentage);
				$('#nowPlayingItemProgress').html(Clue.Player.props.percentage + "%");

				$('#nowPlayingItemFanart').attr("src", Clue.Player.data.thumbnail);
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
			if (Clue.Player.props.speed <= 0 || Clue.Player.props.speed > 1)
			{
				play.html('<span class="fa fa-play" aria-hidden="true"></span>');
			}
			else if(Clue.Player.props.speed == 1)
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

			console.log("Player.GUI.onClick(#" + id + ")");
            Clue.Player.GUI.call(id);
		},

		/**
		 * This is an internal method/function, able to provide to the GUI callers specific routines to make the
		 * calling action asynchronous but in the same time synchronous by linking GUI events into a single flow and
		 * making the GUI to show you one single action with a lag but hided by an waiting cursor.
		 *
		 * @param eid return execution routines for a specific execution key provided by the remote control.
		 *
		 * @returns {{runner: *, checker: *, pointer: *}}
		 * 	- runner	- executes the command that have to be executed by pressing selected remote control key
		 * 	- checker	- call server routines just to refresh local (browser) environment to be used by
		 * 				<code>pointer</code> routine
		 * 	- pointer	- it is a routine that checks if something has been changed after <code>runner</code>
		 * 				execution and if it was changed the asynch process must be stopped
		 */
		getCallerData: function(eid)
		{
			var runner, checker, pointer;

			switch (eid)
			{
				case 'nowPlayingRewind':
					runner = function ()
					{
						Clue.Player.setRewind();
					};
					checker = function ()
					{
						Clue.Player.getPlayingItemDetails();
						if(Clue.Player.props.percentage < 1) Clue.RemoteControl.GUI.vars.lockingCounter = 3;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("title", Clue.Player.data.title);
					};
					break;
				case 'nowPlayingFastRewind':
					runner = function ()
					{
						Clue.Player.setFastRewind();
					};
					checker = function ()
					{
						Clue.Player.getProperties();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					break;
				case 'nowPlayingStop':
					runner = function ()
					{
						Clue.Player.setStop();
					};
					checker = function ()
					{
						Clue.Player.getProperties();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					break;
				case 'nowPlayingPlay':
					runner = function ()
					{
						Clue.Player.setPlay();
					};
					checker = function ()
					{
						Clue.Player.getProperties();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					break;
				case 'nowPlayingFastForward':
					runner = function ()
					{
						Clue.Player.setFastForward();
					};
					checker = function ()
					{
						Clue.Player.getProperties();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					break;
				case 'nowPlayingForward':
					runner = function ()
					{
						Clue.Player.setForward();
					};
					checker = function ()
					{
						Clue.Player.getPlayingItemDetails();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("title", Clue.Player.data.title);
					};
					break;
			}

			return {"runner":runner, "checker":checker, "pointer":pointer};
		},

		/**
		 * Execute related command to the click event on a specific player button.
		 *
		 * @param eid control identifier that runs the action.
		 */
		call: function(eid)
		{
			var run = Clue.Player.GUI.getCallerData(eid);

			if(!Clue.RemoteControl.GUI.vars.lockingFlag)
            {
                console.log("Player.GUI.call(" + eid + ")");

				$('#' + eid).addClass("active");
				Clue.GUI.runWaitOn();

                Clue.RemoteControl.GUI.vars.newPropHash = run.pointer();
				Clue.RemoteControl.GUI.vars.oldPropHash = Clue.RemoteControl.GUI.vars.newPropHash;
				Clue.RemoteControl.GUI.vars.lockingFlag = true;
				Clue.RemoteControl.GUI.vars.lockingCounter = 0;

				run.runner();
				if(!Clue.GUI.vars.syncAction) Clue.RemoteControl.GUI.vars.lockingCounter = 3;
			}

			if((Clue.RemoteControl.GUI.vars.oldPropHash == Clue.RemoteControl.GUI.vars.newPropHash) && Clue.RemoteControl.GUI.vars.lockingCounter < 3)
			{
				console.log("Player.GUI.call-Timercall");
				run.checker();

				setTimeout(function()
				{
					Clue.Player.GUI.call(eid);
				}, 250);

				Clue.RemoteControl.GUI.vars.lockingCounter++;
				Clue.RemoteControl.GUI.vars.newPropHash = run.pointer();
			}
			else
			{
				Clue.RemoteControl.GUI.vars.oldPropHash = null;
				Clue.RemoteControl.GUI.vars.newPropHash = null;
				Clue.RemoteControl.GUI.vars.lockingFlag = false;
				Clue.RemoteControl.GUI.vars.lockingCounter = 0;

				Clue.GUI.refresh();

				$('#' + eid).removeClass("active");
				Clue.GUI.runWaitOff();
			}
		}
	};

	Clue.Player.Queue =
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
				input = Clue.Player.getMediaStructure(input);
				console.log("Player.Queue.setInsertMedia");

				var parameters, reference = {"input":input, "callback":Clue.Player.Queue.setInsertMedia, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}, "position":1, "playlistid":Clue.Player.id};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}, "position":1, "playlistid":Clue.Player.id};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}, "position":1, "playlistid":Clue.Player.id};

				Clue.json.call("Playlist.Insert", parameters, reference);
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
				input = Clue.Player.getMediaStructure(input);
				console.log("Player.Queue.setAppendMedia");

				var parameters, reference = {"input":input, "callback":Clue.Player.Queue.setAppendMedia, "chain":chain};

				if(input.mediatype == "song") parameters ={"item":{"songid":input.mediaid}, "playlistid":Clue.Player.id};
					else if(input.mediatype == "movie") parameters = {"item":{"movieid":input.mediaid}, "playlistid":Clue.Player.id};
						else if(input.mediatype == "episode") parameters = {"item":{"episodeid":input.mediaid}, "playlistid":Clue.Player.id};

				Clue.json.call("Playlist.Add", parameters, reference);
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