(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.RemoteControl =
	{
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
		}
	};

	MCPi.RemoteControl.GUI =
	{
		vars:
		{
			/* Store key pressed on keyboard just to integrate keyboard input device into remote control interface */
			keyText: '',
			/* It is the hashcode of now playing data in order to know if the data has been changed to render it again or not, or for other comparing actions */
			newPropHash: null,
			/* It is the hashcode of previous playing data in order to know if the data has been changed to render it again or not, or for other comparing actions */
			oldPropHash: null,
			/* Flag to allow evaluation of player properties. This is usually used when the add-on will read from player the specific function property and the GUI is not synchronized with the player properties */
			lockingFlag: false,
			/* Counter for locking mechanism. With this variable it is possible to unlock the player properties even if the GUI is not synchronized with the player */
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

			MCPi.Player.getProperties(null, null, {"nextcall":MCPi.Player.getVolume, "chain":{"nextcall":MCPi.RemoteControl.GUI.display}});
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
		},

		/**
		 * Run action to set player in <code>Mute/Unmute</code> mode and waits the synchronization with the GUI.
		 * This action typically is located on the remote control.
		 */
		runMute: function()
		{
			if(!MCPi.RemoteControl.GUI.vars.lockingFlag)
			{
				console.log("RemoteControl.GUI.runMute");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("mute", MCPi.Player.props.mute);
				MCPi.RemoteControl.GUI.vars.oldPropHash = MCPi.RemoteControl.GUI.vars.newPropHash;
				MCPi.RemoteControl.GUI.vars.lockingFlag = true;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.Player.setMute();
			}

			if((MCPi.RemoteControl.GUI.vars.oldPropHash == MCPi.RemoteControl.GUI.vars.newPropHash) && MCPi.RemoteControl.GUI.vars.lockingCounter < 60 )
			{
				console.log("RemoteControl.GUI.runMute-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.RemoteControl.GUI.runMute, 250);

				MCPi.RemoteControl.GUI.vars.lockingCounter++;
				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("mute", MCPi.Player.props.mute);
			}
			else
			{
				MCPi.RemoteControl.GUI.vars.oldPropHash = null;
				MCPi.RemoteControl.GUI.vars.newPropHash = null;
				MCPi.RemoteControl.GUI.vars.lockingFlag = false;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.RemoteControl.GUI.display();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to <code>increase</code> player volume and waits the synchronization
		 * with the GUI.
		 */
		runIncreaseVolume: function()
		{
            var hdmi = false;

			if(!MCPi.RemoteControl.GUI.vars.lockingFlag)
			{
				console.log("RemoteControl.GUI.runIncreaseVolume");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
				MCPi.RemoteControl.GUI.vars.oldPropHash = MCPi.RemoteControl.GUI.vars.newPropHash;
				MCPi.RemoteControl.GUI.vars.lockingFlag = true;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.Player.setIncreaseVolume();
                if(MCPi.libs.getHashcode("volume", MCPi.Player.props.volume) == MCPi.RemoteControl.GUI.vars.oldPropHash && MCPi.Player.props.volume == 100) hdmi = true;
			}

			if((MCPi.RemoteControl.GUI.vars.oldPropHash == MCPi.RemoteControl.GUI.vars.newPropHash) && MCPi.RemoteControl.GUI.vars.lockingCounter < 60 )
			{
				console.log("RemoteControl.GUI.runIncreaseVolume-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.RemoteControl.GUI.runIncreaseVolume, 250);

				MCPi.RemoteControl.GUI.vars.lockingCounter++;
				if(!hdmi) MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
                    else MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume + 1);
			}
			else
			{
				MCPi.RemoteControl.GUI.vars.oldPropHash = null;
				MCPi.RemoteControl.GUI.vars.newPropHash = null;
				MCPi.RemoteControl.GUI.vars.lockingFlag = false;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.RemoteControl.GUI.display();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to <code>decrease</code> player volume and waits the synchronization
		 * with the GUI.
		 */
		runDecreaseVolume: function()
		{
            var hdmi = false;

			if(!MCPi.RemoteControl.GUI.vars.lockingFlag)
			{
				console.log("RemoteControl.GUI.runDecreaseVolume");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
				MCPi.RemoteControl.GUI.vars.oldPropHash = MCPi.RemoteControl.GUI.vars.newPropHash;
				MCPi.RemoteControl.GUI.vars.lockingFlag = true;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

                MCPi.Player.setDecreaseVolume();
                if(MCPi.libs.getHashcode("volume", MCPi.Player.props.volume) == MCPi.RemoteControl.GUI.vars.oldPropHash && MCPi.Player.props.volume == 100) hdmi = true;
			}

			if((MCPi.RemoteControl.GUI.vars.oldPropHash == MCPi.RemoteControl.GUI.vars.newPropHash) && MCPi.RemoteControl.GUI.vars.lockingCounter < 60 )
			{
				console.log("RemoteControl.GUI.runDecreaseVolume-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.RemoteControl.GUI.runDecreaseVolume, 250);

				MCPi.RemoteControl.GUI.vars.lockingCounter++;
				if(!hdmi) MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
                    else MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume - 1);
			}
			else
			{
				MCPi.RemoteControl.GUI.vars.oldPropHash = null;
				MCPi.RemoteControl.GUI.vars.newPropHash = null;
				MCPi.RemoteControl.GUI.vars.lockingFlag = false;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.RemoteControl.GUI.display();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to set player in <code>party-mode</code> and waits the synchronization
		 * with the GUI.
		 */
		runPartyMode: function()
		{
			if(!MCPi.RemoteControl.GUI.vars.lockingFlag)
			{
				console.log("RemoteControl.GUI.runPartyMode");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("partymode", MCPi.Player.props.partymode);
				MCPi.RemoteControl.GUI.vars.oldPropHash = MCPi.RemoteControl.GUI.vars.newPropHash;
				MCPi.RemoteControl.GUI.vars.lockingFlag = true;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				if(MCPi.Player.id < 0) MCPi.Player.id = 0;

				MCPi.Player.setPartyMode();
			}

			if((MCPi.RemoteControl.GUI.vars.oldPropHash == MCPi.RemoteControl.GUI.vars.newPropHash) && MCPi.RemoteControl.GUI.vars.lockingCounter < 60 )
			{
				console.log("RemoteControl.GUI.runPartyMode-Timercall");

				MCPi.Player.getProperties();
				setTimeout(MCPi.RemoteControl.GUI.runPartyMode, 1000);

				MCPi.RemoteControl.GUI.vars.lockingCounter++;
				MCPi.RemoteControl.GUI.vars.newPropHash = MCPi.libs.getHashcode("partymode", MCPi.Player.props.partymode);
			}
			else
			{
				MCPi.RemoteControl.GUI.vars.oldPropHash = null;
				MCPi.RemoteControl.GUI.vars.newPropHash = null;
				MCPi.RemoteControl.GUI.vars.lockingFlag = false;
				MCPi.RemoteControl.GUI.vars.lockingCounter = 0;

				MCPi.GUI.refresh();
				MCPi.GUI.runWaitOff('#remoteContainer');
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
			var keyControl = $('#' + key);

			console.log("RemoteControl.GUI.onKeyPress(" + key + ")");

			e.data = {key: key};

			if (!key)
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

			if(which == 13 && MCPi.RemoteControl.GUI.vars.keyText != "")
			{
				e.data.key = 'text';
				e.data.text = MCPi.RemoteControl.GUI.vars.keyText;
				MCPi.RemoteControl.GUI.vars.keyText = '';

				return MCPi.RemoteControl.sendText(e.data.text, true);
			}
			else if(e.data.key == "text")
			{
				return MCPi.RemoteControl.sendText(e.data.text, false);
			}
			else
			{
				keyControl.addClass("active");
				var outcall = MCPi.RemoteControl.GUI.call(e.data.key);
				keyControl.removeClass("active");

				return outcall;
			}
		},

		/**
		 * Execute related command to the keydown or click event.
		 *
		 * @param key application key code to select the action to be executed.
		 */
		call: function(key)
		{
			console.log("RemoteControl.GUI.call(" + key + ")");

			switch (key)
			{
				case 'remoteMusic':
					MCPi.RemoteControl.setMusicScreen();
					break;
				case 'remoteVideo':
					MCPi.RemoteControl.setVideoScreen();
					break;
				case 'remotePictures':
					MCPi.RemoteControl.setPhotoScreen();
					break;
				case 'remoteSettings':
					MCPi.RemoteControl.setSettingsScreen();
					break;
				case 'remoteVolumeMute':
					MCPi.RemoteControl.GUI.runMute();
					break;
				case 'remoteVolumeUp':
					MCPi.RemoteControl.GUI.runIncreaseVolume();
					break;
				case 'remoteVolumeDown':
					MCPi.RemoteControl.GUI.runDecreaseVolume();
					break;
				case 'remoteHome':
					MCPi.RemoteControl.setHomeKey();
					break;
				case 'remoteUp':
					MCPi.RemoteControl.setUpKey();
					break;
				case 'remoteDown':
					MCPi.RemoteControl.setDownKey();
					break;
				case 'remoteLeft':
					MCPi.RemoteControl.setLeftKey();
					break;
				case 'remoteRight':
					MCPi.RemoteControl.setRightKey();
					break;
				case 'remoteSelect':
					MCPi.RemoteControl.setSelectKey();
					break;
				case 'remoteBack':
					MCPi.RemoteControl.setBackKey();
					break;
				case 'remoteInfo':
					MCPi.RemoteControl.setInfoKey();
					break;
				case 'remoteContext':
					MCPi.RemoteControl.setContextKey();
					break;
				case 'remoteFastRewind':
					MCPi.Player.GUI.runFastRewind('#remoteContainer');
					break;
				case 'remoteRewind':
					MCPi.Player.GUI.runRewind('#remoteContainer');
					break;
				case 'remoteStop':
					MCPi.Player.GUI.runStop('#remoteContainer');
					break;
				case 'remotePlay':
					MCPi.Player.GUI.runPlay('#remoteContainer');
					break;
				case 'remoteFastForward':
					MCPi.Player.GUI.runFastForward('#remoteContainer');
					break;
				case 'remoteForward':
					MCPi.Player.GUI.runForward('#remoteContainer');
					break;
				case 'remotePartyMode':
					MCPi.RemoteControl.GUI.runPartyMode();
					break;
				case 'remoteFullscreen':
					MCPi.RemoteControl.setFullscreen();
					break;
				case 'remotePlaylist':
					MCPi.RemoteControl.setShowPlaylist();
					break;
			}
		}
	};
}(window));