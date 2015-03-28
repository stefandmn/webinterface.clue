(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.remote =
	{
		init: function()
		{
			console.log("exec: remote.init");

			var reference = {"source": MCPi.player.getVolumeControl, "params": {"source":  MCPi.player.getPlayerId, "params": {"source": MCPi.remote.showing}}};
			MCPi.json.call("Application.GetProperties", {"properties":["volume", "muted"]}, null, reference);
		},

		showing: function()
		{
			console.log("exec: remote.showing");

			var play = $('#remotePlay');
			var mute = $('#remoteVolumeMute');
			var party = $('#remotePartyMode');

			if (MCPi.player.props.speed <= 0 || MCPi.player.props.speed > 1) play.html('<span class="fa fa-play" aria-hidden="true"></span>');
				else if(MCPi.player.props.speed == 1) play.html('<span class="fa fa-pause" aria-hidden="true"></span>');

			if(MCPi.player.props.partyMode == true) party.addClass("active");
				else party.removeClass("active");

			if(MCPi.player.props.isMuted == true) mute.html('<span class="fa fa-volume-up fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.player.props.volume + '</span>');
				else mute.html('<span class="fa fa-volume-off fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.player.props.volume + '</span>');

			mute.removeClass("active");
		},

		runShowMusic: function()
		{
			console.log("exec: remote.runShowMusic");

			return MCPi.json.call("GUI.ActivateWindow", {"window":"musiclibrary"});
		},

		runShowVideo: function()
		{
			console.log("exec: remote.runShowVideo");

			return MCPi.json.call("GUI.ActivateWindow", {"window":"videolibrary"});
		},

		runShowPictures: function()
		{
			console.log("exec: remote.runShowPictures");

			return MCPi.json.call("GUI.ActivateWindow", {"window":"pictures"});
		},

		runShowSettings: function()
		{
			console.log("exec: remote.runShowSettings");

			return MCPi.json.call("GUI.ActivateWindow", {"window":"settings"});
		},

		runInputHome: function()
		{
			console.log("exec: remote.runInputHome");

			return MCPi.json.call("Input.Home", {});
		},

		runInputUp: function()
		{
			console.log("exec: remote.runInputUp");

			return MCPi.json.call("Input.Up", {});
		},

		runInputDown: function()
		{
			console.log("exec: remote.runInputDown");

			return MCPi.json.call("Input.Down", {});
		},

		runInputLeft: function()
		{
			console.log("exec: remote.runInputLeft");

			return MCPi.json.call("Input.Left", {});
		},

		runInputRight: function()
		{
			console.log("exec: remote.runInputRight");

			return MCPi.json.call("Input.Right", {});
		},

		runInputSelect: function()
		{
			console.log("exec: remote.runInputSelect");

			return MCPi.json.call("Input.Select", {});
		},

		runInputInfo: function()
		{
			console.log("exec: remote.runInputInfo");

			return MCPi.json.call("Input.Info", {});
		},

		runInputBack: function()
		{
			console.log("exec: remote.runInputBack");

			return MCPi.json.call("Input.Back", {});
		},

		runInputContext: function()
		{
			console.log("exec: remote.runInputContext");

			return MCPi.json.call("Input.ContextMenu", {});
		},

		runPlayerFastRewind: function()
		{
			console.log("exec: remote.runPlayerFastRewind");

			var reference = {"source": MCPi.player.getPlayerProperties};
			MCPi.json.call("Player.SetSpeed", {"playerid":MCPi.player.props.id, "speed": "decrement"}, null, reference);
		},

		runPlayerRewind: function()
		{
			console.log("exec: remote.runPlayerRewind");

			var reference = {"source": MCPi.player.getPlayerProperties};
			MCPi.json.call("Player.GoTo", {"playerid":MCPi.player.props.id, "to": "previous"}, null, reference);
		},

		runPlayerStop: function()
		{
			console.log("exec: remote.runPlayerStop");

			var reference = {"source": MCPi.player.getPlayerProperties, "params": {"source": MCPi.remote.showing}};
			MCPi.json.call("Player.Stop", {"playerid":MCPi.player.props.id}, null, reference);
		},

		runPlayerPlay: function()
		{
			console.log("exec: remote.runPlayerPlay");

			var reference = {"source": MCPi.player.getPlayerProperties, "params": {"source": MCPi.remote.showing}};
			MCPi.json.call("Player.PlayPause", {"playerid":MCPi.player.props.id}, null, reference);
		},

		runPlayerFastForward: function()
		{
			console.log("exec: remote.runPlayerFastForward");

			var reference = {"source": MCPi.player.getPlayerProperties};
			MCPi.json.call("Player.SetSpeed", {"playerid":MCPi.player.props.id, "speed": "increment"}, null, reference);
		},

		runPlayerForward: function()
		{
			console.log("exec: remote.runPlayerForward");

			var reference = {"source": MCPi.player.getPlayerProperties};
			MCPi.json.call("Player.GoTo", {"playerid":MCPi.player.props.id, "to": "next"}, null, reference);
		},

		runPartyMode: function()
		{
			console.log("exec: remote.runPartyMode");

			var type = (MCPi.player.props.playlist == 0 ? 'music' : 'video');
			var reference = {"source": MCPi.player.getPlayerId, "params": {"source": MCPi.remote.showing}};
			MCPi.json.call("Player.Open", [{"partymode": type}], null, reference);
		},

		runShowFullscreen: function()
		{
			console.log("exec: remote.runShowFullscreen");

			return MCPi.json.call("GUI.SetFullscreen", {"fullscreen": "toggle"});
		},

		runShowPlaylist: function()
		{
			console.log("exec: remote.runShowPlaylist");

			return MCPi.json.call("Input.ExecuteAction", {"action":"playlist"});
		},

		runMute: function()
		{
			console.log("exec: remote.runMute");

			return MCPi.json.call("Application.SetMute", {"mute":"toggle"}, MCPi.remote.callbackMute);
		},

		callbackMute: function(data)
		{
			console.log("exec: remote.callbackMute");

			if(data)
			{
				MCPi.player.props.isMuted = data.result;
				MCPi.remote.showing();
			}
		},

		runIncreaseVolume: function()
		{
			console.log("exec: remote.runIncreaseVolume");

			return MCPi.json.call("Application.SetVolume", {"volume":"increment"}, MCPi.remote.callbackSetVolume);
		},

		runDecreaseVolume: function()
		{
			console.log("exec: remote.runDecreaseVolume");

			 return MCPi.json.call("Application.SetVolume", {"volume":"decrement"}, MCPi.remote.callbackSetVolume);
		},

		callbackSetVolume: function(data)
		{
			console.log("exec: remote.callbackSetVolume");

			MCPi.player.props.volume = data.result;
			MCPi.remote.showing();
		}
	};
}(window));