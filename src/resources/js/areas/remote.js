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

	MCPi.GUI.RemoteControl =
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
		openDialog: function()
		{
			console.log("GUI.RemoteControl.openDialog");

			MCPi.Player.getId(null, null, {"onsuccess":MCPi.Player.getProperties, "chain":{"nextcall":MCPi.Player.getVolume, "chain":{"nextcall":MCPi.GUI.RemoteControl.loadDialog}}});
		},

		/**
		 * Fill in the graphical details of this dialog:
		 * 1) set the player controls status
		 * 2) set the partymode status
		 * 3) set the volume level and if the player is in mute or un-mute mode
		 */
		loadDialog: function()
		{
			console.log("GUI.RemoteControl.loadDialog");

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
			if(!MCPi.GUI.RemoteControl.vars.lockingFlag)
			{
				console.log("GUI.RemoteControl.runMute");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("mute", MCPi.Player.props.mute);
				MCPi.GUI.RemoteControl.vars.oldPropHash = MCPi.GUI.RemoteControl.vars.newPropHash;
				MCPi.GUI.RemoteControl.vars.lockingFlag = true;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.Player.setMute();
			}

			if((MCPi.GUI.RemoteControl.vars.oldPropHash == MCPi.GUI.RemoteControl.vars.newPropHash) && MCPi.GUI.RemoteControl.vars.lockingCounter < 60 )
			{
				console.log("GUI.RemoteControl.runMute-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.GUI.RemoteControl.runMute, 250);

				MCPi.GUI.RemoteControl.vars.lockingCounter++;
				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("mute", MCPi.Player.props.mute);
			}
			else
			{
				MCPi.GUI.RemoteControl.vars.oldPropHash = null;
				MCPi.GUI.RemoteControl.vars.newPropHash = null;
				MCPi.GUI.RemoteControl.vars.lockingFlag = false;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.GUI.RemoteControl.loadDialog();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to <code>increase</code> player volume and waits the synchronization
		 * with the GUI.
		 */
		runIncreaseVolume: function()
		{
			if(!MCPi.GUI.RemoteControl.vars.lockingFlag)
			{
				console.log("GUI.RemoteControl.runIncreaseVolume");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
				MCPi.GUI.RemoteControl.vars.oldPropHash = MCPi.GUI.RemoteControl.vars.newPropHash;
				MCPi.GUI.RemoteControl.vars.lockingFlag = true;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.Player.setIncreaseVolume();
			}

			if((MCPi.GUI.RemoteControl.vars.oldPropHash == MCPi.GUI.RemoteControl.vars.newPropHash) && MCPi.GUI.RemoteControl.vars.lockingCounter < 60 )
			{
				console.log("GUI.RemoteControl.runIncreaseVolume-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.GUI.RemoteControl.runIncreaseVolume, 250);

				MCPi.GUI.RemoteControl.vars.lockingCounter++;
				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
			}
			else
			{
				MCPi.GUI.RemoteControl.vars.oldPropHash = null;
				MCPi.GUI.RemoteControl.vars.newPropHash = null;
				MCPi.GUI.RemoteControl.vars.lockingFlag = false;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.GUI.RemoteControl.loadDialog();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to <code>decrease</code> player volume and waits the synchronization
		 * with the GUI.
		 */
		runDecreaseVolume: function()
		{
			if(!MCPi.GUI.RemoteControl.vars.lockingFlag)
			{
				console.log("GUI.RemoteControl.runDecreaseVolume");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
				MCPi.GUI.RemoteControl.vars.oldPropHash = MCPi.GUI.RemoteControl.vars.newPropHash;
				MCPi.GUI.RemoteControl.vars.lockingFlag = true;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.Player.setDecreaseVolume();
			}

			if((MCPi.GUI.RemoteControl.vars.oldPropHash == MCPi.GUI.RemoteControl.vars.newPropHash) && MCPi.GUI.RemoteControl.vars.lockingCounter < 60 )
			{
				console.log("GUI.RemoteControl.runDecreaseVolume-Timercall");

				MCPi.Player.getVolume();
				setTimeout(MCPi.GUI.RemoteControl.runDecreaseVolume, 250);

				MCPi.GUI.RemoteControl.vars.lockingCounter++;
				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("volume", MCPi.Player.props.volume);
			}
			else
			{
				MCPi.GUI.RemoteControl.vars.oldPropHash = null;
				MCPi.GUI.RemoteControl.vars.newPropHash = null;
				MCPi.GUI.RemoteControl.vars.lockingFlag = false;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.GUI.RemoteControl.loadDialog();
				MCPi.GUI.runWaitOff('#remoteContainer');
			}
		},

		/**
		 * Start action execution from remote control to set player in <code>party-mode</code> and waits the synchronization
		 * with the GUI.
		 */
		runPartyMode: function()
		{
			if(!MCPi.GUI.RemoteControl.vars.lockingFlag)
			{
				console.log("GUI.RemoteControl.runPartyMode");
				MCPi.GUI.runWaitOn('#remoteContainer');

				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("partymode", MCPi.Player.props.partymode);
				MCPi.GUI.RemoteControl.vars.oldPropHash = MCPi.GUI.RemoteControl.vars.newPropHash;
				MCPi.GUI.RemoteControl.vars.lockingFlag = true;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				if(MCPi.Player.id < 0) MCPi.Player.id = 0;

				MCPi.Player.setPartyMode();
			}

			if((MCPi.GUI.RemoteControl.vars.oldPropHash == MCPi.GUI.RemoteControl.vars.newPropHash) && MCPi.GUI.RemoteControl.vars.lockingCounter < 60 )
			{
				console.log("GUI.RemoteControl.runPartyMode-Timercall");

				MCPi.Player.getProperties();
				setTimeout(MCPi.GUI.RemoteControl.runPartyMode, 1000);

				MCPi.GUI.RemoteControl.vars.lockingCounter++;
				MCPi.GUI.RemoteControl.vars.newPropHash = MCPi.libs.getHashcode("partymode", MCPi.Player.props.partymode);
			}
			else
			{
				MCPi.GUI.RemoteControl.vars.oldPropHash = null;
				MCPi.GUI.RemoteControl.vars.newPropHash = null;
				MCPi.GUI.RemoteControl.vars.lockingFlag = false;
				MCPi.GUI.RemoteControl.vars.lockingCounter = 0;

				MCPi.GUI.RemoteControl.loadDialog();
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

			console.log("GUI.RemoteControl.onClick(#" + id + ")");
			MCPi.GUI.RemoteControl.call(id);
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

			console.log("GUI.RemoteControl.onKeyPress(" + key + ")");

			e.data = {key: key};

			if (!key)
			{
				// Digits
				if (which >= 48 && which <= 57)
				{
					MCPi.GUI.RemoteControl.vars.keyText += (which - 48) + "";
				}

				// Letters
				if (which >= 65 && which <= 90)
				{
					var offset = e.shiftKey ? 0 : 32;
					MCPi.GUI.RemoteControl.vars.keyText += String.fromCharCode(which + offset);
				}

				// Digits
				if (which >= 96 && which <= 105)
				{
					MCPi.GUI.RemoteControl.vars.keyText += (which - 96) + "";
				}

				e.data.text = MCPi.GUI.RemoteControl.vars.keyText;
				e.data.key = 'text';
			}

			if(which == 13 && MCPi.GUI.RemoteControl.vars.keyText != "")
			{
				e.data.key = 'text';
				e.data.text = MCPi.GUI.RemoteControl.vars.keyText;
				MCPi.GUI.RemoteControl.vars.keyText = '';

				return MCPi.RemoteControl.sendText(e.data.text, true);
			}
			else if(e.data.key == "text")
			{
				return MCPi.RemoteControl.sendText(e.data.text, false);
			}
			else
			{
				keyControl.addClass("active");
				var outcall = MCPi.GUI.RemoteControl.call(e.data.key);
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
			console.log("GUI.RemoteControl.call(" + key + ")");

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
					MCPi.GUI.RemoteControl.runMute();
					break;
				case 'remoteVolumeUp':
					MCPi.GUI.RemoteControl.runIncreaseVolume();
					break;
				case 'remoteVolumeDown':
					MCPi.GUI.RemoteControl.runDecreaseVolume();
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
					MCPi.Player.setFastRewind(null, null, MCPi.GUI.RemoteControl.loadDialog);
					break;
				case 'remoteRewind':
					MCPi.Player.setRewind();
					break;
				case 'remoteStop':
					MCPi.Player.setStop(null, null, MCPi.GUI.RemoteControl.loadDialog);
					break;
				case 'remotePlay':
					MCPi.Player.setPlay(null, null, MCPi.GUI.RemoteControl.loadDialog);
					break;
				case 'remoteFastForward':
					MCPi.Player.setFastForward(null, null, MCPi.GUI.RemoteControl.loadDialog);
					break;
				case 'remoteForward':
					MCPi.Player.setForward();
					break;
				case 'remotePartyMode':
					MCPi.GUI.RemoteControl.runPartyMode();
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