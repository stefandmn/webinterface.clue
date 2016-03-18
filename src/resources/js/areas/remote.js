(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.RemoteControl =
	{
        vars:
        {
            /** Remote screen id displayed by MCPi player */
            remoteScreenId: null,
             /** Remote screen label displayed by MCPi player */
            remoteScreenLabel: null,
             /** Control label currently managed by the remote control and displayed by MCPi player */
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

			MCPi.json.call("GUI.ActivateWindow", {"window":input}, reference);
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
			MCPi.RemoteControl.setScreen("music", null, chain);
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
			MCPi.RemoteControl.setScreen("video", null, chain);
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
			MCPi.RemoteControl.setScreen("pictures", null, chain);
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
			MCPi.RemoteControl.setScreen("settings", null, chain);
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

			MCPi.json.call("Input.Home", {}, reference);
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

			MCPi.json.call("Input.Up", {}, reference);
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

			MCPi.json.call("Input.Down", {}, reference);
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

			MCPi.json.call("Input.Left", {}, reference);
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

			MCPi.json.call("Input.Right", {}, reference);
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

			MCPi.json.call("Input.Select", {}, reference);
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

			MCPi.json.call("Input.Info", {}, reference);
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

			MCPi.json.call("Input.Back", {}, reference);
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

			MCPi.json.call("Input.ContextMenu", {}, reference);
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
			MCPi.json.call("GUI.SetFullscreen", {"fullscreen":input}, reference);
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

			MCPi.json.call("Input.ExecuteAction", {"action":input}, reference);
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
			MCPi.RemoteControl.setStandardAction("playlist", null, chain);
		},

		/**
		 * Send keydown character when the keyboard is used.
		 *
		 * @param text key character or text message to be sent to MCPi server through a JSON message
		 * @param done when was sent the last letter/message to be processed by the player
		 */
		sendText: function(text, done)
		{
			if((typeof done === 'undefined') || (done == null)) done = false;

			MCPi.json.call("Input.SendText", {"text":text, "done":done});
		},

        /**
         * Get MCPi screen details (id, label and current control label) managed through remote control actions.
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
				var reference = {"input":input, "callback":MCPi.RemoteControl.getRemoteScreen, "chain":chain};

				MCPi.json.call("GUI.GetProperties", {"properties":["currentwindow", "currentcontrol"]}, reference);
			}
			else
			{
				console.log("RemoteControl.getRemoteScreen-Callback");
				if (output && output.result != null)
                {
                    MCPi.RemoteControl.vars.remoteScreenId = output.result.currentwindow.id;
                    MCPi.RemoteControl.vars.remoteScreenLabel = output.result.currentwindow.label;
                    MCPi.RemoteControl.vars.remoteControlLabel = output.result.currentcontrol.label;
                }
			}
        }

	};

	MCPi.RemoteControl.GUI =
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

			MCPi.Player.getProperties(null, null, {"nextcall":MCPi.Player.getVolume, "chain":{"nextcall":MCPi.RemoteControl.getRemoteScreen, "chain":{"nextcall":MCPi.RemoteControl.GUI.display}}});
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

			if (MCPi.Player.props.speed <= 0 || MCPi.Player.props.speed > 1)
			{
				play.html('<span class="fa fa-play" aria-hidden="true"></span>');
			}
			else if(MCPi.Player.props.speed == 1)
			{
				play.html('<span class="fa fa-pause" aria-hidden="true"></span>');
			}

			if(MCPi.Player.props.partymode == true)
			{
				party.addClass("active");
			}
			else
			{
				party.removeClass("active");
			}

			if(MCPi.Player.props.mute == true)
			{
				mute.html('<span class="fa fa-volume-off fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.Player.props.volume + '</span>');
				mute.addClass("active");
			}
			else
			{
				mute.html('<span class="fa fa-volume-up fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.Player.props.volume + '</span>');
				mute.removeClass("active");
			}

            if(MCPi.RemoteControl.vars.remoteScreenLabel != null && MCPi.RemoteControl.vars.remoteControlLabel != null)
            {
                screen.html(MCPi.RemoteControl.vars.remoteScreenLabel +
                    '&nbsp;<span class="fa fa-angle-double-right" aria-hidden="true"></span>&nbsp;' +
                    MCPi.RemoteControl.vars.remoteControlLabel);
            }
            else if(MCPi.RemoteControl.vars.remoteScreenLabel != null && MCPi.RemoteControl.vars.remoteControlLabel == null)
            {
                screen.html(MCPi.RemoteControl.vars.remoteScreenLabel);
            }
            else if(MCPi.RemoteControl.vars.remoteScreenLabel == null && MCPi.RemoteControl.vars.remoteControlLabel == null)
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
			MCPi.RemoteControl.GUI.call(id);
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

			if (!key || (MCPi.RemoteControl.vars.remoteScreenId == 10103 && key == "remoteContext"))
			{
				// Digits
				if (which >= 48 && which <= 57)
				{
					MCPi.RemoteControl.GUI.vars.keyText += (which - 48) + "";
				}

				// Letters
				if (which >= 65 && which <= 90)
				{
					var offset = e.shiftKey ? 0 : 32;
					MCPi.RemoteControl.GUI.vars.keyText += String.fromCharCode(which + offset);
				}

				// Digits
				if (which >= 96 && which <= 105)
				{
					MCPi.RemoteControl.GUI.vars.keyText += (which - 96) + "";
				}

				e.data.text = MCPi.RemoteControl.GUI.vars.keyText;
				e.data.key = 'text';
			}

			if(which == 13 && MCPi.RemoteControl.GUI.vars.keyText != "" && MCPi.RemoteControl.vars.remoteControlLabel == "Done")
			{
				e.data.key = 'text';
				e.data.text = MCPi.RemoteControl.GUI.vars.keyText;
				MCPi.RemoteControl.GUI.vars.keyText = '';
				return MCPi.RemoteControl.sendText(e.data.text, true);
			}
			else if((which == 13 && MCPi.RemoteControl.GUI.vars.keyText != "" && MCPi.RemoteControl.vars.remoteControlLabel == "Backspace") || which == 8)
			{
				e.data.key = 'text';
				e.data.text = MCPi.RemoteControl.GUI.vars.keyText.substr(0, MCPi.RemoteControl.GUI.vars.keyText.length -1);
				return MCPi.RemoteControl.sendText(e.data.text, false);
			}
			else if(e.data.key == "text")
			{
				return MCPi.RemoteControl.sendText(e.data.text, false);
			}
			else
			{
				return MCPi.RemoteControl.GUI.call(e.data.key);
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
		 * 	- checker	- call server routines just to refresh local (browser) environment to be used by <code>pointer</code> routine
		 * 	- pointer	- it is a routine that checks if something has been changed after <code>runner</code> execution and if it was changed the asynch process must be stopped
		 * 	- timer		- integer value that tells how long should wait the process for another function/runner call through timeout routine
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
						MCPi.RemoteControl.setMusicScreen()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10502) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteVideo':
					runner = function ()
					{
						MCPi.RemoteControl.setVideoScreen()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10025) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remotePictures':
					runner = function ()
					{
						MCPi.RemoteControl.setPhotoScreen()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10002) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteSettings':
					runner = function ()
					{
						MCPi.RemoteControl.setSettingsScreen()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10004) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remoteVolumeMute':
					runner = function ()
					{
						MCPi.Player.setMute();
					};
					checker = function ()
					{
						MCPi.Player.getVolume();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("mute", MCPi.Player.props.mute);
					};
					break;
				case 'remoteVolumeUp':
					runner = function ()
					{
						MCPi.Player.setIncreaseVolume();
					};
					checker = function ()
					{
						MCPi.Player.getVolume();
						if(MCPi.libs.getHashcode("volume", MCPi.Player.props.volume) == MCPi.RemoteControl.GUI.vars.oldPropHash && MCPi.Player.props.volume == 100) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
					};
					break;
				case 'remoteVolumeDown':
					runner = function ()
					{
						MCPi.Player.setDecreaseVolume();
					};
					checker = function ()
					{
						MCPi.Player.getVolume();
						if(MCPi.libs.getHashcode("volume", MCPi.Player.props.volume) == MCPi.RemoteControl.GUI.vars.oldPropHash && MCPi.Player.props.volume == 100) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
					};
					break;
				case 'remoteHome':
					runner = function ()
					{
						MCPi.RemoteControl.setHomeKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10000) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteUp':
					runner = function ()
					{
						MCPi.RemoteControl.setUpKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteDown':
					runner = function ()
					{
						MCPi.RemoteControl.setDownKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteLeft':
					runner = function ()
					{
						MCPi.RemoteControl.setLeftKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteRight':
					runner = function ()
					{
						MCPi.RemoteControl.setRightKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteSelect':
					runner = function ()
					{
						MCPi.RemoteControl.setSelectKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					timer = 250;
					break;
				case 'remoteBack':
					runner = function ()
					{
						MCPi.RemoteControl.setBackKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteInfo':
					runner = function ()
					{
						MCPi.RemoteControl.setInfoKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteContext':
					runner = function ()
					{
						MCPi.RemoteControl.setContextKey()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen-control", MCPi.RemoteControl.vars.remoteScreenId + "-" + MCPi.RemoteControl.vars.remoteControlLabel);
					};
					loop = 3;
					break;
				case 'remoteRewind':
					runner = function ()
					{
						MCPi.Player.setRewind()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
						if(MCPi.Player.props.percentage < 1) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("title", MCPi.Player.data.title);
					};
					loop = 3;
					break;
				case 'remoteFastRewind':
					runner = function ()
					{
						MCPi.Player.setFastRewind()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("speed", MCPi.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteStop':
					runner = function ()
					{
						MCPi.Player.setStop()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("speed", MCPi.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remotePlay':
					runner = function ()
					{
						MCPi.Player.setPlay()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("speed", MCPi.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteFastForward':
					runner = function ()
					{
						MCPi.Player.setFastForward()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("speed", MCPi.Player.props.speed);
					};
					loop = 3;
					break;
				case 'remoteForward':
					runner = function ()
					{
						MCPi.Player.setForward()
					};
					checker = function ()
					{
						MCPi.Player.getProperties(null, null, {"onsuccess":MCPi.Player.getPlayingItemDetails});
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("title", MCPi.Player.data.title);
					};
					loop = 3;
					break;
				case 'remotePartyMode':
					runner = function ()
					{
						if(MCPi.Player.id < 0) MCPi.Player.id = 0;
						MCPi.Player.setPartyMode();
					};
					checker = function ()
					{
						MCPi.Player.getProperties();
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("partymode", MCPi.Player.props.partymode)
					};
					wfcall = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
					};
					timer = 1000;
					loop = 30;
					break;
				case 'remoteFullscreen':
					runner = function ()
					{
						MCPi.RemoteControl.setFullscreen()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 12006) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
					};
					break;
				case 'remotePlaylist':
					runner = function ()
					{
						MCPi.RemoteControl.setShowPlaylist()
					};
					checker = function ()
					{
						MCPi.RemoteControl.getRemoteScreen();
						if(MCPi.RemoteControl.vars.remoteScreenId == 10500) MCPi.RemoteControl.GUI.vars.lockingCounter = loop;
					};
					pointer = function ()
					{
						return MCPi.libs.getHashcode("screen", MCPi.RemoteControl.vars.remoteScreenId);
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
			var run = MCPi.RemoteControl.GUI.getCallerData(key);

			if(!MCPi.RemoteControl.GUI.vars.lockingFlag)
            {
                console.log("RemoteControl.GUI.call(" + key + ")");

				$('#' + key).addClass("active");
				MCPi.GUI.runWaitOn('#remoteContainer');

                MCPi.RemoteControl.GUI.vars.newPropHash = run.pointer();
				MCPi.RemoteControl.GUI.vars.oldPropHash = MCPi.RemoteControl.GUI.vars.newPropHash;
				MCPi.RemoteControl.GUI.vars.lockingFlag = true;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				run.runner();
			}

			if((MCPi.RemoteControl.GUI.vars.oldPropHash == MCPi.RemoteControl.GUI.vars.newPropHash) && MCPi.RemoteControl.GUI.vars.lockingCounter < run.loop )
			{
				console.log("RemoteControl.GUI.call-Timercall");
				run.checker();

				setTimeout(function()
				{
					MCPi.RemoteControl.GUI.call(key);
				}, run.timer);

				MCPi.RemoteControl.GUI.vars.lockingCounter++;
				MCPi.RemoteControl.GUI.vars.newPropHash = run.pointer();
			}
			else
			{
				MCPi.RemoteControl.GUI.vars.oldPropHash = null;
				MCPi.RemoteControl.GUI.vars.newPropHash = null;
				MCPi.RemoteControl.GUI.vars.lockingFlag = false;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				if(run.wfcall != null)
				{
					MCPi.GUI.refresh({"call":run.wfcall});
				}
				else if(run.wfskip != null)
				{
					MCPi.GUI.refresh({"skip":run.wfskip});
				}
				else
				{
					MCPi.GUI.refresh({"skip":true});
				}

				$('#' + key).removeClass("active");
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		}
	};
}(window));