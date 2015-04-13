(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.system =
	{
		scope:
		{
			/**
			 * Execute scan operation for audio library
			 */
			runScanAudio: function()
			{
				console.log("system.scope.runScanAudio");

				MCPi.json.call("AudioLibrary.Scan", {});
			},

			/**
			 * Execute clean operation for audio library
			 */
			runCleanAudio: function()
			{
				console.log("system.scope.runCleanAudio");

				MCPi.json.call("AudioLibrary.Clean", {});
			},

			/**
			 * Execute scan operation for video library
			 */
			runScanVideo: function()
			{
				console.log("system.scope.runScanVideo");

				MCPi.json.call("VideoLibrary.Scan", {});
			},

			/**
			 * Execute clean operation for video library
			 */
			runCleanVideo: function()
			{
				console.log("system.scope.runCleanVideo");

				MCPi.json.call("VideoLibrary.Clean", {});
			},

			/**
			 * Execute shutdown on the machine or HDMI channel related to MCPi server
			 */
			runShutdown: function()
			{
				console.log("system.scope.runShutdown");

				MCPi.json.call("System.Shutdown", {}, MCPi.system.runShutdownCallback);
			},

			/**
			 * This is the callback method of shutdown operation calling in loop the same operation
			 *
			 * @param data JSON message of previous shutdown operation
			 */
			runShutdownCallback: function(data)
			{
				console.log("system.scope.runShutdownCallback");

				if(data && data.result) MCPi.system.runShutdown();
			},

			/**
			 * Execute reboot operation on the machine or on HDMI channel related to MCPi server
			 */
			runReboot: function()
			{
				console.log("system.scope.runReboot");

				MCPi.json.call("System.Reboot", {}, MCPi.system.runRebootCallback);
			},

			/**
			 * This is the callback method of reboot operation calling in loop the same operation
			 *
			 * @param data JSON message of previous reboot operation
			 */
			runRebootCallback: function(data)
			{
				console.log("system.scope.runRebootCallback");

				if(data && data.result) MCPi.system.runReboot();
			},

			/**
			 * Execute exit operation on the machine or on HDMI channel related to MCPi server
			 */
			runExit: function()
			{
				console.log("system.scope.runExit");

				MCPi.json.call("Application.Quit", {}, MCPi.system.runExitCallback);
			},

			/**
			 * This is the callback method of exit operation calling in loop the same operation
			 *
			 * @param data JSON message of previous exit operation
			 */
			runExitCallback: function(data)
			{
				console.log("system.scope.runExitCallback");

				if(data && data.result) MCPi.system.runExit();
			},

			/**
			 * Send a notification message to the main console of MCPi server. This method will be executed only if any
			 * text message is written in '#notification-text' edit control
			 */
			sendNotification: function()
			{
				var nTitle = $('#notification-title').val();
				var nDisplayTime = parseInt($('#notification-time').val());
				var nMessage = $('#notification-text').val();

				console.log("system.scope.sendNotification");

				if(nMessage && nTitle)
				{
					$('#notificationModal').modal('hide');

					MCPi.json.call("GUI.ShowNotification", {"title": nTitle, "message":nMessage, "displaytime":nDisplayTime});
				}
			},

			hideNotificationDialog: function()
			{
				console.log("system.scope.hideNotificationDialog");

				$('#notificationModal').modal('hide');
			}
		},

		model:
		{
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

				console.log("system.model.onClick(#" + id + ")");

				switch (id)
				{
					case 'videoLibraryUpdate':
						MCPi.system.scope.runScanVideo();
						break;
					case 'videoLibraryClean':
						MCPi.system.scope.runCleanVideo();
						break;
					case 'audioLibraryUpdate':
						MCPi.system.scope.runScanAudio();
						break;
					case 'audioLibraryClean':
						MCPi.system.scope.runCleanAudio();
						break;
					case 'powerOff':
						MCPi.system.scope.runShutdown();
						break;
					case 'powerReboot':
						MCPi.system.scope.runReboot();
						break;
					case 'powerExit':
						MCPi.system.scope.runExit();
						break;
					case 'sendNotifyMessage':
						MCPi.system.scope.sendNotification();
						break;
					case 'cancelNotifyDialog':
						MCPi.system.scope.hideNotificationDialog();
						break;
				}
			}
		}
	}

}(window));