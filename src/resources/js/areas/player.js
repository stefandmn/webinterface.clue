(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.player =
	{
		id: -1,

		vars:
		{
			visible: false,
			validData: false,
			contentType: null,

			isInitialCall: false,
			refreshInterval: 15500,
			refreshProcessId: null,

			playerHashcode: null,
			playerProperties: [ "speed", "shuffled", "repeat", "time", "totaltime", "position", "percentage", "partymode", "playlistid", "type"],
			persistentReference: null
		},

		scope:
		{
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
				isMuted: false,
				partyMode: false,
				playlistId: 0
			},

			/**
			 * Initialize control business status
			 */
			init: function()
			{
				console.log("player.scope.init");

				MCPi.player.vars.visible = false;

				MCPi.player.scope.reset();
				MCPi.player.scope.setId();
			},

			/**
			 * Reset properties and variables
			 */
			reset: function()
			{
				console.log("player.scope.reset");

				MCPi.player.id = -1;

				MCPi.player.scope.props.speed = 0;
				MCPi.player.scope.props.shuffled = false;
				MCPi.player.scope.props.repeat = "off";
				MCPi.player.scope.props.time = 0;
				MCPi.player.scope.props.type = null;
				MCPi.player.scope.props.totalTime = 0;
				MCPi.player.scope.props.position = 0;
				MCPi.player.scope.props.percentage = 0;
				MCPi.player.scope.props.partyMode = false;
				MCPi.player.scope.props.playlistId = 0;
				MCPi.player.vars.contentType = null;
			},

			/**
			 * Define a persistent reference to chain player workflow by other.
			 *
			 * @param reference reference method from other library
			 */
			setPersistentReference: function(reference)
			{
				MCPi.player.vars.persistentReference = reference;
			},

			/**
			 * Delete existent persistent reference
			 */
			delPersistentReference: function()
			{
				MCPi.player.vars.persistentReference = null;
			},

			/**
			 * Set automatic refresh (only one time - immediately after the screen is make it visible)
			 */
			setRefresh: function()
			{
				console.log("player.scope.setRefresh");

				if(!MCPi.player.vars.refreshProcessId && MCPi.player.vars.isInitialCall)
				{
					MCPi.player.vars.refreshProcessId = setInterval(MCPi.player.model.refresh, MCPi.player.vars.refreshInterval);
					MCPi.player.vars.isInitialCall = false;
				}
			},

			/**
			 * Delete automatic refresh (should be called when the screen is made hidden)
			 */
			delRefresh: function()
			{
				console.log("player.scope.delRefresh");

				if(MCPi.player.vars.refreshProcessId)
				{
					clearInterval(MCPi.player.vars.refreshProcessId);
					MCPi.player.vars.refreshProcessId = null;
				}
			},

			/**
			 * Set player identifier
			 *
			 * @param source transfer callback function to be executed after the current callback chain is executed
			 */
			setId: function(source)
			{
				console.log("player.scope.setId");

				if(source != null) MCPi.json.call("Player.GetActivePlayers", {}, MCPi.player.scope.setIdCallback, source);
					else MCPi.json.call("Player.GetActivePlayers", {}, MCPi.player.scope.setIdCallback);
			},

			/**
			 * Callback method of set player identifier. Receive data from server and set the corresponding properties.
			 *
			 * @param data data structure received from server
			 * @param reference another callback function to be transferred to functions that are called inside
			 */
			setIdCallback: function(data, reference)
			{
				var chain = false;
				console.log("player.scope.setIdCallback, JSON = " + JSON.stringify(data));

				//if player id exists: set player id and get player properties
				if(data && data.result != '')
				{
					chain = true;
					MCPi.player.id = data.result[0].playerid;

					if(reference != null) MCPi.player.scope.setProperties(reference);
						else MCPi.player.scope.setProperties();
				}
				else
				{
					MCPi.player.vars.validData = false;
					MCPi.player.scope.reset();
				}

				// call references if the execution chain is interrupted here
				if(!chain) MCPi.player.scope.runChain(reference);
			},

			/**
			 * Set the properties of the current player.
			 *
			 * @param reference transfer callback function to be executed after the current callback chain is executed
			 */
			setProperties: function(reference)
			{
				console.log("player.scope.setProperties, PlayerID = " + MCPi.player.id);

				if(MCPi.player.id >= 0)
				{
					if(reference != null) MCPi.json.call("Player.GetProperties", {"playerid": MCPi.player.id, "properties": MCPi.player.vars.playerProperties}, MCPi.player.scope.setPropertiesCallback, reference);
						else MCPi.json.call("Player.GetProperties", {"playerid": MCPi.player.id, "properties": MCPi.player.vars.playerProperties}, MCPi.player.scope.setPropertiesCallback);
				}
			},

			/**
			 * Callback method of player properties to till in all player properties
			 *
			 * @param data data structure received from server
			 * @param reference another callback function to be transferred to functions that are called inside
			 */
			setPropertiesCallback: function(data, reference)
			{
				var chain = false;
				console.log("player.scope.setPropertiesCallback()");

				if(data && data.result)
				{
					if(MCPi.player.scope.props.partyMode == true && data.result.partymode == false)
					{
						MCPi.player.vars.validData = false;
						MCPi.player.scope.reset();
					}
					else
					{
						chain = true;

						MCPi.player.vars.validData = true;
						MCPi.player.vars.playerHashcode = JSON.stringify(data).hashCode();

						MCPi.player.scope.props.playlistId = data.result.playlistid;
						MCPi.player.scope.props.partyMode = data.result.partymode;
						MCPi.player.scope.props.position = data.result.position;
						MCPi.player.scope.props.percentage = Math.round(data.result.percentage);
						MCPi.player.scope.props.time = MCPi.libs.timeToDuration(data.result.time);
						MCPi.player.scope.props.totalTime = MCPi.libs.timeToDuration(data.result.totaltime);
						MCPi.player.scope.props.repeat = data.result.repeat;
						MCPi.player.scope.props.shuffled = data.result.shuffled;
						MCPi.player.scope.props.speed = data.result.speed;
						MCPi.player.scope.props.type = data.result.type;
					}

					if(MCPi.player.vars.validData && MCPi.player.model.isVisible())
					{
						if(reference != null) MCPi.player.scope.setPlayingItem(reference);
							else MCPi.player.scope.setPlayingItem();
					}
					else chain = false;
				}

				// call references if the execution chain is interrupted here
				if(!chain) MCPi.player.scope.runChain(reference);
			},

			/**
			 * Set playing item details doesn't matter what type of entity is about.
			 *
			 * @param reference transfer callback function to be executed after the current callback chain is executed
			 */
			setPlayingItem: function(reference)
			{
				console.log("player.scope.getPlayingItem");

				var properties = [];

				if(MCPi.player.id == 0)
				{
					properties = MCPi.json.props.audio;
				}
				else if(MCPi.player.id == 1)
				{
					if(MCPi.player.vars.contentType == "movie") properties = MCPi.json.props.movie;
						else if(MCPi.player.vars.contentType == "episode") properties = MCPi.json.props.episode;
				}

				if(reference != null) MCPi.json.call("Player.GetItem", {"playerid": MCPi.player.id, "properties":properties}, MCPi.player.scope.setPlayingItemCallback, reference);
					else MCPi.json.call("Player.GetItem", {"playerid": MCPi.player.id, "properties":properties}, MCPi.player.scope.setPlayingItemCallback);
			},

			/**
			 * Callback method of item details to decode and format item details, doesn't matter
			 * what type of entity is about. This method will fill in several screen properties.
			 *
			 * @param data data structure received from server
			 * @param reference another callback function to be transferred to functions that are called inside
			 */
			setPlayingItemCallback: function(data, reference)
			{
				var chain = false;
				console.log("player.scope.setPlayingItemCallback");

				if(data && data.result && data.result.item)
				{
					var text, item = data.result.item;

					if(item.thumbnail != null && item.thumbnail != "" && item.thumbnail.indexOf("Default") < 0)
					{
						MCPi.player.model.props.thumbnail = MCPi.libs.formatAssetURL(item.thumbnail);
					}
					else MCPi.player.model.props.thumbnail = null;

					if(MCPi.player.id == 0)
					{
						if(MCPi.player.model.props.thumbnail == null) MCPi.player.model.props.thumbnail = "/resources/images/album.png";

						if(item.title != null && item.title != "") MCPi.player.model.props.title = item.title;
							else MCPi.player.model.props.title = null;

						text = [];
						if(item.artist != null && item.artist != "") text[text.length] =  "<b>" + item.artist + "</b>";
						if(item.album != null && item.album != "") text[text.length] = item.album;

						if(text.length > 0) MCPi.player.model.props.description1 = text.join(" &bull; ");
								else MCPi.player.model.props.description1 = null;

						if(item.year != null && item.year != '') MCPi.player.model.props.description2 = item.year;
							else MCPi.player.model.props.description2 = null;

						MCPi.player.vars.contentType = item.type;
					}
					else if(MCPi.player.id == 1)
					{
						if(MCPi.player.model.props.thumbnail == null) MCPi.player.model.props.thumbnail = "/resources/images/video.png";

						if(MCPi.player.vars.contentType == "movie")
						{
							if(item.title != null && item.title != "") MCPi.player.model.props.title = item.title;
								else MCPi.player.model.props.title = null;

							text = [];
							if(item.genre != null && item.genre.length > 3) item.genre.splice(3);
							if(item.genre != null && item.genre.length > 0) text[text.length] = item.genre.join(",");
							if(item.rating) text[text.length] = item.rating.toFixed(1);

							if(text.length > 0) MCPi.player.model.props.description1 = text.join(" &bull; ");
								else MCPi.player.model.props.description1 = null;

							if(item.year != null && item.year != "") MCPi.player.model.props.description2 = item.year;
								else MCPi.player.model.props.description2 = null;
						}
						else if(MCPi.player.vars.contentType == "episode")
						{
							if(item.title != null && item.title != "") MCPi.player.model.props.title = item.title;
								else MCPi.player.model.props.title = null;

							if(item.showtitle != null) MCPi.player.model.props.description1 = "<b>" +item.showtitle + "</b>";
								else MCPi.player.model.props.description1= null;

							text = [];
							if(item.season != null && item.season != '') text[text.length] =  "Season " + item.season;
							if(item.episode != null && item.episode != '') text[text.length] = "Episode " + item.episode;
							if(item.rating != null) text[text.length] = item.rating.toFixed(1);

							if(text.length > 0) MCPi.player.model.props.description2 = text.join(" &bull; ");
									else MCPi.player.model.props.description2 = null;

						}
						else if(MCPi.player.vars.contentType == null)
						{
							chain = true;

							if(item.label != null && item.label != "") MCPi.player.model.props.title = item.label;
								else MCPi.player.model.props.title = null;

							MCPi.player.model.props.description1= null;
							MCPi.player.model.props.description2 = null;

							MCPi.player.vars.contentType = item.type;
							MCPi.player.scope.getPlayingItem(reference);
						}
					}

					//allow screen details to become visible and display them
					MCPi.player.vars.validData = true;
				}
				else
				{
					MCPi.player.vars.validData = false;
				}

				// call references if the execution chain is interrupted here
				if(!chain) MCPi.player.scope.runChain(reference);
			},

			/**
			 * The volume properties.
			 *
			 * @param reference another callback function to be transferred to functions that are called inside
			 */
			setVolume: function(reference)
			{
				console.log("player.scope.setVolume");

				if(reference != null) MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, MCPi.player.scope.setVolumeCallback, reference);
					else MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, MCPi.player.scope.setVolumeCallback);
			},

			/**
			 * This is the callback method of setting player volume
			 *
			 * @param data data structure received from server
			 * @param reference another callback function to be transferred to functions that are called inside
			 */
			setVolumeCallback: function(data, reference)
			{
				console.log("player.scope.setVolumeCallback");

				if(data && data.result)
				{
					MCPi.player.scope.props.isMuted = data.result.muted;
					MCPi.player.scope.props.volume = data.result.volume;
				}

				//call chain reference
				if(reference != null) MCPi.json.chain(reference);
			},

			/**
			 * Execute workflow reference and also execute persistent reference.
			 * A persistent reference is set when the player has to be chained by other
			 * module (library, e.g. music current playlist)
			 *
			 * @param reference this is the workflow reference
			 */
			runChain: function(reference)
			{
				console.log("player.scope.runChain");

				//call workflow reference
				if(reference != null) MCPi.json.chain(reference);

				//call persistent reference
				if(MCPi.player.vars.persistentReference != null) MCPi.json.chain(MCPi.player.vars.persistentReference);
			}
		},

		model:
		{
			props:
			{
				title: null,
				description1: null,
				description2: null,
				thumbnail: null				
			},
			
			/**
			 * Prepare controls and GUI details when the screen is open or shown
			 */
			show: function()
			{
				console.log("player.model.show");

				MCPi.player.vars.visible = true;
				MCPi.player.vars.isInitialCall = true;

				MCPi.player.scope.setId(MCPi.player.model.setContent);
				MCPi.player.scope.setRefresh();

				if(MCPi.music.model.isNowPlayingVisible())
				{
					MCPi.music.scope.delRefresh();
					MCPi.player.scope.setPersistentReference(MCPi.music.model.refresh);
				}
			},

			/**
			 * Release controls and GUI details when the screen is become hidden
			 */
			hide: function()
			{
				console.log("player.model.hide");

				MCPi.player.vars.visible = false;
				$('#nowPlayingButton').removeClass('active');

				MCPi.player.scope.delRefresh();
				MCPi.player.scope.delPersistentReference();

				if(MCPi.music.model.isNowPlayingVisible()) MCPi.music.scope.setRefresh();
			},

			/**
			 * Run automatic refresh routine. Run action to refresh and rebuild screen content
			 */
			refresh: function()
			{
				console.log("player.scope.refresh");

				MCPi.player.scope.setId(MCPi.player.model.setContent);
			},

			/**
			 * Check if screen panel is visible
			 *
			 * @returns true if screen panel is visible
			 */
			isVisible: function()
			{
				return MCPi.player.vars.visible;
			},

			setContent: function(reference)
			{
				console.log("player.model.setContent");

				if(MCPi.player.vars.validData)
				{
					$('#playItemContent').removeClass("hide");
					$('#playItemContent').addClass("show");
					$('#playerItemNone').removeClass("show");
					$('#playerItemNone').addClass("hide");

					if(MCPi.player.model.props.title != null) $('#playItemTitle').html("&nbsp;" + MCPi.player.model.props.title);
						else $('#playItemTitle').html("&nbsp;");

					if(MCPi.player.model.props.description1 != null) $('#playItemDetails').html("&nbsp;&nbsp;" + MCPi.player.model.props.description1);
						else $('#playItemDetails').html("&nbsp;&nbsp;");

					if(MCPi.player.model.props.description2 != null)  $('#playItemYear').html("&nbsp;&nbsp;" + MCPi.player.model.props.description2);
						else $('#playItemYear').html("&nbsp;&nbsp;");

					$('#playItemTotalTime').html(MCPi.libs.durationToString(MCPi.player.scope.props.totalTime));

					$('#playItemProgress').css('width', MCPi.player.scope.props.percentage + '%').attr("aria-valuenow", MCPi.player.scope.props.percentage);
					$('#playItemProgress').html('<span class="sr-only">' + MCPi.player.scope.props.percentage + '% Complete (success)</span>' + MCPi.player.scope.props.percentage + "%");

					$('#playItemFanart').attr("src", MCPi.player.model.props.thumbnail);
				}
				else
				{
					$('#playItemContent').removeClass("show");
					$('#playItemContent').addClass("hide");
					$('#playerItemNone').removeClass("hide");
					$('#playerItemNone').addClass("show");

					$('#playItemTitle').html("&nbsp;");
					$('#playItemDetails').html("&nbsp;&nbsp;");
					$('#playItemYear').html("&nbsp;&nbsp;");
					$('#playItemFanart').attr('src', "#");
				}

				//call workflow reference
				if(reference != null) MCPi.json.chain(reference);
			}
		}
	}
}(window));