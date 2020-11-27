(function (window)
{
	'use strict';
	var Clue = window.Clue;

	Clue.RemoteControl =
	{
        vars:
        {
            /** Remote screen id displayed by Clue player */
            remoteScreenId: null,
             /** Remote screen label displayed by Clue player */
            remoteScreenLabel: null,
             /** Control label currently managed by the remote control and displayed by Clue player */
            remoteControlLabel: null
        },

		/**
		 * Set a remote control command to display on media center a specific screen.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setScreen: function(input, output, chain)
		{
			console.log("RemoteControl.setScreen");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("GUI.ActivateWindow", {"window":input}, reference);
		},

		/**
		 * Set a remote control command to display on media center <code>Music</code> screen.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setMusicScreen: function(input, output, chain)
		{
			console.log("RemoteControl.setMusicScreen");
			Clue.RemoteControl.setScreen("music", null, chain);
		},

		/**
		 * Set a remote control command to display on media center <code>Video</code> screen.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setVideoScreen: function(input, output, chain)
		{
			console.log("RemoteControl.setVideoScreen");
			Clue.RemoteControl.setScreen("video", null, chain);
		},

		/**
		 * Set a remote control command to display on media center <code>Photo</code> screen.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setPhotoScreen: function(input, output, chain)
		{
			console.log("RemoteControl.setPhotoScreen");
			Clue.RemoteControl.setScreen("pictures", null, chain);
		},

		/**
		 * Set a remote control command to display on media center <code>Settings</code> screen.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setSettingsScreen: function(input, output, chain)
		{
			console.log("RemoteControl.setSettingsScreen");
			Clue.RemoteControl.setScreen("settings", null, chain);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Home</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setHomeKey: function(input, output, chain)
		{
			console.log("RemoteControl.setHomeKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Home", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Up</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setUpKey: function(input, output, chain)
		{
			console.log("RemoteControl.setUpKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Up", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Down</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setDownKey: function(input, output, chain)
		{
			console.log("RemoteControl.setDownKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Down", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Left</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setLeftKey: function(input, output, chain)
		{
			console.log("RemoteControl.setLeftKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Left", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Right</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setRightKey: function(input, output, chain)
		{
			console.log("RemoteControl.setRightKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Right", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Select</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setSelectKey: function(input, output, chain)
		{
			console.log("RemoteControl.setSelectKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Select", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Info</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setInfoKey: function(input, output, chain)
		{
			console.log("RemoteControl.setInfoKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Info", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Back</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setBackKey: function(input, output, chain)
		{
			console.log("RemoteControl.setBackKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.Back", {}, reference);
		},

		/**
		 * Set a remote control command to run on media center related action to <code>Context</code> key.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setContextKey: function(input, output, chain)
		{
			console.log("RemoteControl.setContextKey");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.ContextMenu", {}, reference);
		},

		/**
		 * Set a remote control command to toggle fullscreen action on media center.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setFullscreen: function(input, output, chain)
		{
			console.log("RemoteControl.setFullscreen");
			var reference = {"input":input, "chain":chain};

			if(input == null) input="toggle";
			Clue.json.call("GUI.SetFullscreen", {"fullscreen":input}, reference);
		},

		/**
		 * Set a remote control command to run a standard action on media center.
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setStandardAction: function(input, output, chain)
		{
			console.log("RemoteControl.setStandardAction");
			var reference = {"input":input, "chain":chain};

			Clue.json.call("Input.ExecuteAction", {"action":input}, reference);
		},

		/**
		 * Set a remote control command to display playlist screen to show the entries from the current playlist .
		 *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
		 */
		setShowPlaylist: function(input, output, chain)
		{
			console.log("RemoteControl.setShowPlaylist");
			Clue.RemoteControl.setStandardAction("playlist", null, chain);
		},

		/**
		 * Send keydown character when the keyboard is used.
		 *
		 * @param text key character or text message to be sent to Clue server through a JSON message
		 * @param done when was sent the last letter/message to be processed by the player
		 */
		sendText: function(text, done)
		{
			if((typeof done === 'undefined') || (done == null)) done = false;

			Clue.json.call("Input.SendText", {"text":text, "done":done});
		},

        /**
         * Get Clue screen details (id, label and current control label) managed through remote control actions.
         *
		 * @param input input value of structure (could be any data type).
		 * @param output data structure received from server that should contain the callback processing details.
		 * @param chain data structure for chained method execution, to define a process flow.
         */
        getRemoteScreen: function(input, output, chain)
        {
			if(output == null)
			{
				console.log("RemoteControl.getRemoteScreen");
				var reference = {"input":input, "callback":Clue.RemoteControl.getRemoteScreen, "chain":chain};

				Clue.json.call("GUI.GetProperties", {"properties":["currentwindow", "currentcontrol"]}, reference);
			}
			else
			{
				console.log("RemoteControl.getRemoteScreen-Callback");
				if (output && output.result != null)
                {
                    Clue.RemoteControl.vars.remoteScreenId = output.result.currentwindow.id;
                    Clue.RemoteControl.vars.remoteScreenLabel = output.result.currentwindow.label;
                    Clue.RemoteControl.vars.remoteControlLabel = output.result.currentcontrol.label;
                }
			}
        }

	};

	Clue.RemoteControl.GUI =
	{
		vars:
		{
			/** Store key pressed on keyboard just to integrate keyboard input device into remote control interface */
			keyText: '',
			/** It is the hashcode of now playing data in order to know if the data has been changed to render it again or not, or for other comparing actions */
			newPropHash: null,
			/** It is the hashcode of previous playing data in order to know if the data has been changed to render it again or not, or for other comparing actions */
			oldPropHash: null,
			/** Flag to allow evaluation of player properties. This is usually used when the add-on will read from player the specific function property and the GUI is not synchronized with the player properties */
			lockingFlag: false,
			/** Counter for locking mechanism. With this variable it is possible to unlock the player properties even if the GUI is not synchronized with the player */
			lockingCounter: 0
		},

		/**
		 * This method is called when the remote control dialog is open and the following related actions have
		 * to run synchronously:
		 *  1) get player properties
		 *  2) get player volume details
		 *  3) load GUI details of this window/dialog
		 */
		open: function()
		{
			console.log("RemoteControl.GUI.open");

			Clue.Player.getProperties(null, null, {"nextcall":Clue.Player.getVolume, "chain":{"nextcall":Clue.RemoteControl.getRemoteScreen, "chain":{"nextcall":Clue.RemoteControl.GUI.display}}});
		},

		/**
		 * Fill in the graphical details of this dialog:
		 * 1) set the player controls status
		 * 2) set the partymode status
		 * 3) set the volume level and if the player is in mute or un-mute mode
		 */
		display: function()
		{
			console.log("RemoteControl.GUI.display");

			var play = $('#remotePlay');
			var mute = $('#remoteVolumeMute');
			var party = $('#remotePartyMode');
            var screen = $('#remoteScreen');

			if (Clue.Player.props.speed <= 0 || Clue.Player.props.speed > 1)
			{
				play.html('<span class="fa fa-play" aria-hidden="true"></span>');
			}
			else if(Clue.Player.props.speed == 1)
			{
				play.html('<span class="fa fa-pause" aria-hidden="true"></span>');
			}

			if(Clue.Player.props.partymode == true)
			{
				party.addClass("active");
			}
			else
			{
				party.removeClass("active");
			}

			if(Clue.Player.props.mute == true)
			{
				mute.html('<span class="fa fa-volume-off fa-lg" aria-hidden="true"></span>  <span class="badge">' + Clue.Player.props.volume + '</span>');
				mute.addClass("active");
			}
			else
			{
				mute.html('<span class="fa fa-volume-up fa-lg" aria-hidden="true"></span>  <span class="badge">' + Clue.Player.props.volume + '</span>');
				mute.removeClass("active");
			}

            if(Clue.RemoteControl.vars.remoteScreenLabel != null && Clue.RemoteControl.vars.remoteControlLabel != null)
            {
                screen.html(Clue.RemoteControl.vars.remoteScreenLabel +
                    '&nbsp;<span class="fa fa-angle-double-right" aria-hidden="true"></span>&nbsp;' +
                    Clue.RemoteControl.vars.remoteControlLabel);
            }
            else if(Clue.RemoteControl.vars.remoteScreenLabel != null && Clue.RemoteControl.vars.remoteControlLabel == null)
            {
                screen.html(Clue.RemoteControl.vars.remoteScreenLabel);
            }
            else if(Clue.RemoteControl.vars.remoteScreenLabel == null && Clue.RemoteControl.vars.remoteControlLabel == null)
            {
                screen.html(" ");
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

			console.log("RemoteControl.GUI.onClick(#" + id + ")");
			Clue.RemoteControl.GUI.call(id);
		},

		/**
		 * Handles keydown events for specific keyboard keys.
		 *
		 * @param e keydown event.
		 */
		onKeyPress: function(e)
		{
			e.preventDefault();

			var keys =
			{
				9: 'remoteFullscreen',		// Tab
				13: 'remoteSelect',			// Enter
				27: 'remoteBack',			// Escape
				32: 'remotePlay',			// Space bar
				36: 'remoteHome',			// Home
				37: 'remoteLeft',			// Left
				38: 'remoteUp',				// Up
				39: 'remoteRight',			// Right
				40: 'remoteDown',			// Down
				67: 'remoteContext',		// C (Right Click)
				91: 'remoteContext',		// Left window (Right Click)
				107: 'volumeUp',			// + (num keypad)
				109: 'volumeDown',			// - (num keypad)
				187: 'volumeUp',			// + (alnum keypad)
				189: 'volumeDown'			// - (alnum keypad)
			};

			var which = e.which;
			var key = keys[which];

			console.log("RemoteControl.GUI.onKeyPress(" + (key != null ? which + "/" + key : which) + ")");

			e.data = {key: key};

			if (!key || (Clue.RemoteControl.vars.remoteScreenId == 10103 && key == "remoteContext"))
			{
				// Digits
				if (which >= 48 && which <= 57)
				{
					Clue.RemoteControl.GUI.vars.keyText += (which - 48) + "";
				}

				// Letters
				if (which >= 65 && which <= 90)
				{
					var offset = e.shiftKey ? 0 : 32;
					Clue.RemoteControl.GUI.vars.keyText += String.fromCharCode(which + offset);
				}

				// Digits
				if (which >= 96 && which <= 105)
				{
					Clue.RemoteControl.GUI.vars.keyText += (which - 96) + "";
				}

				e.data.text = Clue.RemoteControl.GUI.vars.keyText;
				e.data.key = 'text';
			}

			if(which == 13 && Clue.RemoteControl.GUI.vars.keyText != "" && Clue.RemoteControl.vars.remoteControlLabel == "Done")
			{
				e.data.key = 'text';
				e.data.text = Clue.RemoteControl.GUI.vars.keyText;
				Clue.RemoteControl.GUI.vars.keyText = '';
				return Clue.RemoteControl.sendText(e.data.text, true);
			}
			else if((which == 13 && Clue.RemoteControl.GUI.vars.keyText != "" && Clue.RemoteControl.vars.remoteControlLabel == "Backspace") || which == 8)
			{
				e.data.key = 'text';
				e.data.text = Clue.RemoteControl.GUI.vars.keyText.substr(0, Clue.RemoteControl.GUI.vars.keyText.length -1);
				return Clue.RemoteControl.sendText(e.data.text, false);
			}
			else if(e.data.key == "text")
			{
				return Clue.RemoteControl.sendText(e.data.text, false);
			}
			else
			{
				return Clue.RemoteControl.GUI.call(e.data.key);
			}
		},

		/**
		 * This is an internal method/function, able to provide to the GUI callers specific routines to make the
		 * calling action asynchronous but in the same time synchronous by linking GUI events into a single flow and
		 * making the GUI to show you one single action with a lag but hided by an waiting cursor.
		 *
		 * @param key return execution routines for a specific execution key provided by the remote control.
		 *
		 * @returns {{runner: *, checker: *, pointer: *, timer: number, loop: number, wfcall: *, wfskip: *}}
		 * 	- runner	- executes the command that have to be executed by pressing selected remote control key
		 * 	- checker	- call server routines just to refresh local (browser) environment to be used by
		 * 				<code>pointer</code> routine
		 * 	- pointer	- it is a routine that checks if something has been changed after <code>runner</code>
		 * 				execution and if it was changed the asynch process must be stopped
		 * 	- timer		- integer value that tells how long should wait the process for another function/runner
		 * 				call through timeout routine
		 * 	- loop		- integer value that specifies how many max loops could be executed through timeout routine
		 * 	- wfcall	- specific route that could be executed before refreshing the GUI
		 * 	- wfskip	- boolean value that can activate/deactivate routines to run before GUI refresh
		 */
		getCallerData: function(key)
		{
			var runner, checker, pointer, timer = 500, loop = 5, wfcall, wfskip;

			switch (key)
			{
				case 'remoteMusic':
					runner = function ()
					{
						Clue.RemoteControl.setMusicScreen();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10502) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteVideo':
					runner = function ()
					{
						Clue.RemoteControl.setVideoScreen();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10025) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remotePictures':
					runner = function ()
					{
						Clue.RemoteControl.setPhotoScreen();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10002) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteSettings':
					runner = function ()
					{
						Clue.RemoteControl.setSettingsScreen();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10004) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteVolumeMute':
					runner = function ()
					{
						Clue.Player.setMute();
					};
					checker = function ()
					{
						Clue.Player.getVolume();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("mute", Clue.Player.props.mute);
					};
					break;
				case 'remoteVolumeUp':
					runner = function ()
					{
						Clue.Player.setIncreaseVolume();
					};
					checker = function ()
					{
						Clue.Player.getVolume();
						if(Clue.libs.getHashcode("volume", Clue.Player.props.volume) == Clue.RemoteControl.GUI.vars.oldPropHash && Clue.Player.props.volume == 100) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("volume", Clue.Player.props.volume);
					};
					break;
				case 'remoteVolumeDown':
					runner = function ()
					{
						Clue.Player.setDecreaseVolume();
					};
					checker = function ()
					{
						Clue.Player.getVolume();
						if(Clue.libs.getHashcode("volume", Clue.Player.props.volume) == Clue.RemoteControl.GUI.vars.oldPropHash && Clue.Player.props.volume == 100) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("volume", Clue.Player.props.volume);
					};
					break;
				case 'remoteHome':
					runner = function ()
					{
						Clue.RemoteControl.setHomeKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10000) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteUp':
					runner = function ()
					{
						Clue.RemoteControl.setUpKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteDown':
					runner = function ()
					{
						Clue.RemoteControl.setDownKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteLeft':
					runner = function ()
					{
						Clue.RemoteControl.setLeftKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteRight':
					runner = function ()
					{
						Clue.RemoteControl.setRightKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteSelect':
					runner = function ()
					{
						Clue.RemoteControl.setSelectKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteBack':
					runner = function ()
					{
						Clue.RemoteControl.setBackKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteInfo':
					runner = function ()
					{
						Clue.RemoteControl.setInfoKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteContext':
					runner = function ()
					{
						Clue.RemoteControl.setContextKey();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen-control", Clue.RemoteControl.vars.remoteScreenId + "-" + Clue.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteRewind':
					runner = function ()
					{
						Clue.Player.setRewind();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
						if(Clue.Player.props.percentage < 1) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("title", Clue.Player.data.title);
					};
					loop = 3;
					break;
				case 'remoteFastRewind':
					runner = function ()
					{
						Clue.Player.setFastRewind();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteStop':
					runner = function ()
					{
						Clue.Player.setStop();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remotePlay':
					runner = function ()
					{
						Clue.Player.setPlay();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteFastForward':
					runner = function ()
					{
						Clue.Player.setFastForward();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("speed", Clue.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteForward':
					runner = function ()
					{
						Clue.Player.setForward();
					};
					checker = function ()
					{
						Clue.Player.getProperties(null, null, {"onsuccess":Clue.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("title", Clue.Player.data.title);
					};
					loop = 3;
					break;
				case 'remotePartyMode':
					runner = function ()
					{
						if(Clue.Player.id < 0) Clue.Player.id = 0;
						Clue.Player.setPartyMode();
					};
					checker = function ()
					{
						Clue.Player.getProperties();
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("partymode", Clue.Player.props.partymode)
					};
					wfcall = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
					};
					timer = 1000;
					loop = 30;
					break;
				case 'remoteFullscreen':
					runner = function ()
					{
						Clue.RemoteControl.setFullscreen();
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 12006) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remotePlaylist':
					runner = function ()
					{
						Clue.RemoteControl.setShowPlaylist()
					};
					checker = function ()
					{
						Clue.RemoteControl.getRemoteScreen();
						if(Clue.RemoteControl.vars.remoteScreenId == 10500) Clue.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return Clue.libs.getHashcode("screen", Clue.RemoteControl.vars.remoteScreenId);
					};
					break;
			}

			return {"runner":runner, "checker":checker, "pointer":pointer, "timer": timer, "loop":loop, "wfcall":wfcall, "wfskip":wfskip};
		},

		/**
		 * Execute related command to the keydown or click event.
		 *
		 * @param key application key code to select the action to be executed.
		 */
		call: function(key)
		{
			var run = Clue.RemoteControl.GUI.getCallerData(key);

			if(!Clue.RemoteControl.GUI.vars.lockingFlag)
            {
                console.log("RemoteControl.GUI.call(" + key + ")");

				$('#' + key).addClass("active");
				Clue.GUI.runWaitOn('#remoteContainer');

                Clue.RemoteControl.GUI.vars.newPropHash = run.pointer();
				Clue.RemoteControl.GUI.vars.oldPropHash = Clue.RemoteControl.GUI.vars.newPropHash;
				Clue.RemoteControl.GUI.vars.lockingFlag = true;
				Clue.RemoteControl.GUI.vars.lockingCounter = 0;

				run.runner();
				if(!Clue.GUI.vars.syncAction) Clue.RemoteControl.GUI.vars.lockingCounter = run.loop;
			}

			if((Clue.RemoteControl.GUI.vars.oldPropHash == Clue.RemoteControl.GUI.vars.newPropHash) && Clue.RemoteControl.GUI.vars.lockingCounter < run.loop )
			{
				console.log("RemoteControl.GUI.call-Timercall");
				run.checker();

				setTimeout(function()
				{
					Clue.RemoteControl.GUI.call(key);
				}, run.timer);

				Clue.RemoteControl.GUI.vars.lockingCounter++;
				Clue.RemoteControl.GUI.vars.newPropHash = run.pointer();
			}
			else
			{
				Clue.RemoteControl.GUI.vars.oldPropHash = null;
				Clue.RemoteControl.GUI.vars.newPropHash = null;
				Clue.RemoteControl.GUI.vars.lockingFlag = false;
				Clue.RemoteControl.GUI.vars.lockingCounter = 0;

				if(run.wfcall != null)
				{
					Clue.GUI.refresh({"call":run.wfcall});
				}
				else if(run.wfskip != null)
				{
					Clue.GUI.refresh({"skip":run.wfskip});
				}
				else
				{
					Clue.GUI.refresh({"skip":true});
				}

				$('#' + key).removeClass("active");
				Clue.GUI.runWaitOff('#remoteContainer');
			}
		}
	};
}(window));