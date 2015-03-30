(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.player =
	{
		vars:
		{
			refresh: null,
			visible: false,
			videoType: null,
			lastPercentage: 0,
			callInterval: false,
			callIntervalValue: 5500,
			playerProperties: [ "speed", "shuffled", "repeat", "time", "totaltime", "position", "percentage", "partymode", "playlistid", "type"]
		},

		props:
		{
			id: -1,
			speed: 0,
			shuffled: false,
			repeat: "off",
			volume: 0,
			time: 0,
			type: null,
			totalTime: 0,
			position: 0,
			percentage: 0,
			playlist: 0,
			isMuted: false,
			partyMode: false
		},

		showing: function()
		{
			console.log("exec: player.showing");

			if(!MCPi.player.vars.visible)
			{
				MCPi.player.vars.visible = true;
				$('#nowPlayingButton').addClass('active');

				MCPi.player.getPlayerId();
				MCPi.player.vars.callInterval = true;
			}
		},

		hiding: function()
		{
			console.log("exec: player.hiding");

			if(MCPi.player.vars.visible)
			{
				MCPi.player.vars.visible = false;
				$('#nowPlayingButton').removeClass('active');

				if(MCPi.player.vars.refresh)
				{
					clearInterval(MCPi.player.vars.refresh);
					MCPi.player.vars.refresh = null;
				}
			}
		},

		getPlayerId: function(source)
		{
			console.log("exec: player.getPlayerId");

			if(source != null)
			{
				var reference = {"source": MCPi.player.getPlayerProperties, "params": source };
				return MCPi.json.call("Player.GetActivePlayers", {}, MCPi.player.setPlayerIdCallback, reference);
			}
			else
			{
				var reference = {"source": MCPi.player.getPlayerProperties};
				return MCPi.json.call("Player.GetActivePlayers", {}, MCPi.player.setPlayerIdCallback, reference);
			}
		},

		setPlayerIdCallback: function(data, reference)
		{
			console.log("exec: player.setPlayerIdCallback");

			if(data.result != '') MCPi.player.props.id = data.result[0].playerid;
				else MCPi.player.props.id = 0;
		},

		getPlayerProperties: function(reference)
		{
			console.log("exec: player.getPlayerProperties");

			if(reference != null) return MCPi.json.call("Player.GetProperties", {"playerid": MCPi.player.props.id, "properties":MCPi.player.vars.playerProperties}, MCPi.player.setPlayerPropertiesCallback, reference);
				else return MCPi.json.call("Player.GetProperties", {"playerid": MCPi.player.props.id, "properties":MCPi.player.vars.playerProperties}, MCPi.player.setPlayerPropertiesCallback);
		},

		setPlayerPropertiesCallback: function(data, reference)
		{
			console.log("exec: player.setPlayerPropertiesCallback ");

			if(data && data.result)
			{
				MCPi.player.props.playlist = data.result.playlistid;
				MCPi.player.props.partyMode = data.result.partymode;
				MCPi.player.props.position = data.result.position;
				MCPi.player.props.percentage = Math.round(data.result.percentage);
				MCPi.player.props.time = MCPi.libs.timeToDuration(data.result.time);
				MCPi.player.props.totalTime = MCPi.libs.timeToDuration(data.result.totaltime);
				MCPi.player.props.repeat = data.result.repeat;
				MCPi.player.props.shuffled = data.result.shuffled;
				MCPi.player.props.speed = data.result.speed;
				MCPi.player.props.type = data.result.type;

				if(MCPi.player.vars.visible) MCPi.player.vars.lastPercentage = MCPi.player.props.percentage;

				console.log("get: player.Properties {id=" + MCPi.player.props.id + ", playlist=" + MCPi.player.props.playlist
					+ ", partyMode=" + MCPi.player.props.partyMode + ", position=" + MCPi.player.props.position
					+ ", percentage=" + MCPi.player.props.percentage + ", time=" + MCPi.player.props.time
					+ ", totalTime=" + MCPi.player.props.totalTime + ", repeat=" + MCPi.player.props.repeat
					+ ", shuffled=" + MCPi.player.props.shuffled + ", speed=" + MCPi.player.props.speed
					+ ", type=" + MCPi.player.props.type);
			}

			//display controls and get content
			MCPi.player.setContentVisible(true);

			//repeat this execution block from 5 to 5 minutes
			if(!MCPi.player.vars.refresh && MCPi.player.vars.callInterval)
			{
				MCPi.player.vars.refresh = setInterval(MCPi.player.getPlayerProperties, MCPi.player.vars.callIntervalValue);
				MCPi.player.vars.callInterval = false;
			}
		},

		setContentVisible: function(flag)
		{
			console.log("exec: player.setContentVisible");

			if(flag && MCPi.player.vars.visible)
			{
				$('#playItemContent').removeClass("hidden");
				$('#playItemContent').addClass("show");
				$('#playerItemNone').removeClass("show");
				$('#playerItemNone').addClass("hidden");

				MCPi.player.getPlayingItemDetails();
			}
			else
			{
				$('#playItemContent').removeClass("show");
				$('#playItemContent').addClass("hidden");
				$('#playerItemNone').removeClass("hidden");
				$('#playerItemNone').addClass("show");

				$('#playItemTitle').html("&nbsp;");
				$('#playItemDetails').html("&nbsp;&nbsp;");
				$('#playItemYear').html("&nbsp;&nbsp;");
				$('#playItemFanart').attr('src', "#");
			}
		},

		getPlayingItemDetails: function(reference)
		{
			console.log("exec: player.getPlayingItemDetails");

			var properties = [];

			if(MCPi.player.props.id == 0) properties = MCPi.json.props.audio;
			else if(MCPi.player.props.id == 1)
			{
				if(MCPi.player.vars.videoType == "movie") properties = MCPi.json.props.movie;
					else if(MCPi.player.vars.videoType == "episode") properties = MCPi.json.props.episode;
			}

			if(reference != null) return MCPi.json.call("Player.GetItem", {"playerid": MCPi.player.props.id, "properties":properties}, MCPi.player.setPlayingItemDetailsCallback, reference);
				else return MCPi.json.call("Player.GetItem", {"playerid": MCPi.player.props.id, "properties":properties}, MCPi.player.setPlayingItemDetailsCallback);
		},

		setPlayingItemDetailsCallback: function(data, reference)
		{
			console.log("exec: player.setPlayingItemDetailsCallback - " +JSON.stringify(data));

			var title, text1, text2, thumbnail;

			if(data && data.result && data.result.item)
			{
				var item = data.result.item;

				if(item.thumbnail != null && item.thumbnail.indexOf("DefaultAlbumCover.png") < 0) thumbnail = item.thumbnail;

				if(MCPi.player.props.id == 0)
				{
					if(thumbnail == null || thumbnail == '') thumbnail = "/resources/images/album.png";

					if(item.title != null && item.title != "") title = item.title;
						else title = "Unknown";

					var text = [];
					if(item.artist != null && item.artist != "") text[text.length] =  "<b>" + item.artist + "</b>";
					if(item.album != null && item.album != "") text[text.length] = item.album;

					if(text.length > 0) text1 = text.join(" &bull; ");
							else text1 = "";

					if(item.year != null && item.year != '') text2 = item.year;
						else text2 = '';
				}
				else if(MCPi.player.props.id == 1)
				{
					if(thumbnail == null || thumbnail == '') thumbnail = "/resources/images/video.png";

					if(MCPi.player.vars.videoType == "movie")
					{
						if(item.title != null && item.title != "") title = item.title;
							else title = "Unknown";

						var text = [];
						if(item.genre != null && item.genre.length > 3) item.genre.splice(3);
						if(item.genre != null && item.genre.length > 0) text[text.length] = item.genre.join(",");
						if(item.rating) text[text.length] = item.rating.toFixed(1);

						if(text.length > 0) text1 = text.join(" &bull; ");
							else text1 = "";

						if(item.year != null && item.year != "") text2 = item.year;
							else text2 = "";
					}
					else if(MCPi.player.vars.videoType == "episode")
					{
						if(item.title != null && item.title != "") title = item.title;
							else title = "Unknown";

						if(item.showtitle != null) text1 = "<b>" +item.showtitle + "</b>";
							else text1= "";

						var text = [];
						if(item.season != null && item.season != '') text[text.length] =  "Season " + item.season;
						if(item.episode != null && item.episode != '') text[text.length] = "Episode " + item.episode;
						if(item.rating != null) text[text.length] = item.rating.toFixed(1);

						if(text.length > 0) text2 = text.join(" &bull; ");
								else text2 = "";
					}
					else if(MCPi.player.vars.videoType == null)
					{
						if(item.label != null && item.label != "") title = item.label;
							else title = "Unknown";

						text1 = "";
						text2 = "";

						MCPi.player.vars.videoType = item.type;
						MCPi.player.getPlayingItemDetails();
					}
				}

				console.log("get: player.ItemDetails {title=" + title + ", text1=" + text1 + ", text2=" + text2);

				$('#playItemTitle').html("&nbsp;" + title);
				$('#playItemDetails').html("&nbsp;&nbsp;" + text1);
				$('#playItemYear').html("&nbsp;&nbsp;" + text2);

				$('#playItemTotalTime').html(MCPi.libs.durationToString(MCPi.player.props.totalTime));

				$('#playItemProgress').css('width', MCPi.player.props.percentage + '%').attr("aria-valuenow", MCPi.player.props.percentage);
				$('#playItemProgress').html('<span class="sr-only">' + MCPi.player.props.percentage + '% Complete (success)</span>' + MCPi.player.props.percentage + "%");

				if(thumbnail != null && thumbnail != "")
				{
					if(thumbnail.indexOf("/resources/images/album.png") < 0 && thumbnail.indexOf("/resources/images/video.png") < 0)
					{
						thumbnail = MCPi.libs.formatAssetURL(thumbnail);
					}

					$('#playItemFanart').attr("src", thumbnail);
				}
			}
			else
			{
				MCPi.player.setContentVisible(false);
			}
		},

		getVolumeControl: function(reference)
		{
			console.log("exec: player.getVolumeControl");

			if(reference != null) return MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, MCPi.player.getVolumeControlCallback, reference);
				else return MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, MCPi.player.getVolumeControlCallback);
		},

		getVolumeControlCallback: function(data, reference)
		{
			console.log("exec: player.getVolumeControlCallback");

			if(data)
			{
				MCPi.player.props.isMuted = data.result.muted;
				MCPi.player.props.volume = data.result.volume;

				console.log("get: player.VolumeInfo {volume=" + MCPi.player.props.volume + ", isMuted=" + MCPi.player.props.isMuted);
			}
		}
	}
}(window));