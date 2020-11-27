(function (window)
{
	'use strict';
	var Clue = window.Clue;

	Clue.System =
	{
		/**
		 * Execute scan operation for audio library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setAudioScan: function(input, output, chain)
		{
			console.log("System.setAudioScan");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("AudioLibrary.Scan", {}, reference);
		},

		/**
		 * Execute clean operation for audio library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setAudioClean: function(input, output, chain)
		{
			console.log("System.setAudioClean");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("AudioLibrary.Clean", {}, reference);
		},

		/**
		 * Execute scan operation for video library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setVideoScan: function(input, output, chain)
		{
			console.log("System.setVideoScan");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("VideoLibrary.Scan", {}, reference);
		},

		/**
		 * Execute clean operation for video library
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setVideoClean: function(input, output, chain)
		{
			console.log("System.setVideoClean");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("VideoLibrary.Clean", {}, reference);
		},

		/**
		 * Execute shutdown on the machine or HDMI channel related to Clue server
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setShutdown: function(input, output, chain)
		{
			console.log("System.setShutdown");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("System.Shutdown", {}, reference);
		},

		/**
		 * Execute reboot operation on the machine or on HDMI channel related to Clue server
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setReboot: function(input, output, chain)
		{
			console.log("System.setReboot");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("System.Reboot", {}, reference);
		},

		/**
		 * Execute exit operation on the machine or on HDMI channel related to Clue server
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setExit: function(input, output, chain)
		{
			console.log("System.setExit");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Application.Quit", {}, reference);
		},

		/**
		 * Execute notification operation to be displayed on the player screen
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setNotification: function(input, output, chain)
		{
			console.log("System.setNotification");
			var nTitle = "Notification", nMessage, nDisplayTime = 5000, reference = {"input": input, "chain": chain};

			if (typeof input === 'string') nMessage = input;
			else
			{
				if (input.title != null) nTitle = input.title;
				if (input.message != null) nMessage = input.message;
				if (input.displaytime != null) nDisplayTime = input.displaytime;
			}

			if (nMessage != null)
			{
				Clue.json.call("GUI.ShowNotification", {"title": nTitle, "message": nMessage, "displaytime": nDisplayTime }, reference);
			}
		}
	};

	Clue.System.GUI =
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

			console.log("System.GUI.onClick(#" + id + ")");

			switch (id)
			{
				case 'videoLibraryUpdate':
					Clue.System.setVideoScan();
					break;
				case 'videoLibraryClean':
					Clue.System.setVideoClean();
					break;
				case 'audioLibraryUpdate':
					Clue.System.setAudioScan();
					break;
				case 'audioLibraryClean':
					Clue.System.setAudioClean();
					break;
				case 'systemPowerOff':
					Clue.System.setShutdown();
					break;
				case 'systemReboot':
					Clue.System.setReboot();
					break;
				case 'systemExit':
					Clue.System.setExit();
					break;
				case 'notifyInGUI':
					Clue.System.GUI.runNotification();
					break;
			}
		},

		/**
		 * Send a notification message to the main console of Clue server. This method will be executed only if any
		 * text message is written in '#notification-text' edit control
		 */
		runNotification: function()
		{
			var nTitle = $('#notification-title').val();
			var nDisplayTime = parseInt($('#notification-time').val());
			var nMessage = $('#notification-text').val();

			console.log("System.GUI.runNotification");

			if(nMessage && nTitle)
			{
				$('#notificationModal').modal('hide');

				Clue.System.setNotification({"title": nTitle, "message":nMessage, "displaytime":nDisplayTime});
			}
		}
	}

}(window));