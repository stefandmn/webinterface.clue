(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.system =
	{
		updateAudio: function()
		{
			return MCPi.json.call("AudioLibrary.Scan", {});
		},

		cleanAudio: function()
		{
			return MCPi.json.call("AudioLibrary.Clean", {});
		},

		updateVideo: function()
		{
			return MCPi.json.call("VideoLibrary.Scan", {});
		},

		cleanVideo: function()
		{
			return MCPi.json.call("VideoLibrary.Clean", {});
		},

		shutdown: function()
		{
			return MCPi.json.call("System.Shutdown", {}, MCPi.power.shutdownCallback);
		},

		shutdownCallback: function(data)
		{
			if(data.result) return MCPi.power.shutdown();
				else return false;
		},

		reboot: function()
		{
			return MCPi.json.call("System.Reboot", {}, MCPi.power.rebootCallback);
		},

		rebootCallback: function(data)
		{
			if(data.result) return MCPi.power.reboot();
				else return false;
		},

		exit: function()
		{
			return MCPi.json.call("Application.Quit", {}, MCPi.power.exitCallback);
		},

		exitCallback: function(data)
		{
			if(data.result) return MCPi.power.exit();
				else return false;
		},

		notify: function()
		{
			var notificationTitle = $('#notification-title').val();
			var notificationDisplayTime = parseInt($('#notification-time').val());
			var notificationMessage = $('#notification-text').val();
			$('#notificationModal').modal('hide');

			if(notificationMessage) return MCPi.json.call("GUI.ShowNotification", {"title": notificationTitle, "message":notificationMessage, "displaytime":notificationDisplayTime});
				else return false;
		}
	}

}(window));