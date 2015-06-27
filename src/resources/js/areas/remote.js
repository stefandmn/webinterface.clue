(function (window)
{
	'use strict';
	var MCPi = window.MCPi;

	MCPi.remote =
	{
		vars:
		{
			keyText: '',
			partyModeIndexLoop: 0,
			partyModeInitialHash: null
		},

		scope:
		{
			/**
			 * Call Music screen from remote control
			 */
			runShowMusicScreen: function()
			{
				console.log("remote.scope.runShowMusicScreen");

				MCPi.json.call("GUI.ActivateWindow", {"window":"musiclibrary"});
			},

			/**
			 * Call Video screen from remote control
			 */
			runShowVideoScreen: function()
			{
				console.log("remote.scope.runShowVideoScreen");

				MCPi.json.call("GUI.ActivateWindow", {"window":"videolibrary"});
			},

			/**
			 * Call Photo screen from remote control
			 */
			runShowPhotoScreen: function()
			{
				console.log("remote.scope.runShowPhotoScreen");

				MCPi.json.call("GUI.ActivateWindow", {"window":"pictures"});
			},

			/**
			 * Call Settings screen from remote control
			 */
			runShowSettingsScreen: function()
			{
				console.log("remote.scope.runShowSettingsScreen");

				MCPi.json.call("GUI.ActivateWindow", {"window":"settings"});
			},

			/**
			 * Press Home button from remote control
			 */
			runInputHome: function()
			{
				console.log("remote.scope.runInputHome");

				MCPi.json.call("Input.Home", {});
			},

			/**
			 * Press Hp button from remote control
			 */
			runInputUp: function()
			{
				console.log("remote.scope.runInputUp");

				MCPi.json.call("Input.Up", {});
			},

			/**
			 * Press Down button from remote control
			 */
			runInputDown: function()
			{
				console.log("remote.scope.runInputDown");

				MCPi.json.call("Input.Down", {});
			},

			/**
			 * Press Left button from remote control
			 */
			runInputLeft: function()
			{
				console.log("remote.scope.runInputLeft");

				MCPi.json.call("Input.Left", {});
			},

			/**
			 * Press Right button from remote control
			 */
			runInputRight: function()
			{
				console.log("remote.scope.runInputRight");

				MCPi.json.call("Input.Right", {});
			},

			/**
			 * Press Select button from remote control
			 */
			runInputSelect: function()
			{
				console.log("remote.scope.runInputSelect");

				MCPi.json.call("Input.Select", {});
			},

			/**
			 * Press Info button from remote control
			 */
			runInputInfo: function()
			{
				console.log("remote.scope.runInputInfo");

				MCPi.json.call("Input.Info", {});
			},

			/**
			 * Press Back button from remote control
			 */
			runInputBack: function()
			{
				console.log("remote.scope.runInputBack");

				MCPi.json.call("Input.Back", {});
			},

			/**
			 * Press Context menu button from remote control
			 */
			runInputContext: function()
			{
				console.log("remote.scope.runInputContext");

				MCPi.json.call("Input.ContextMenu", {});
			},

			/**
			 * Press FastRewind button from remote control
			 */
			runPlayerFastRewind: function()
			{
				var reference = {source: MCPi.player.scope.setProperties};
				console.log("remote.scope.runPlayerFastRewind");

				MCPi.json.call("Player.SetSpeed", {"playerid":MCPi.player.id, "speed": "decrement"}, null, reference);
			},

			/**
			 * Press Rewind button from remote control
			 */
			runPlayerRewind: function()
			{
				var reference = {source: MCPi.player.scope.setProperties};
				console.log("remote.scope.runPlayerRewind");

				MCPi.json.call("Player.GoTo", {"playerid":MCPi.player.id, "to": "previous"}, null, reference);
			},

			/**
			 * Press Stop button from remote control
			 */
			runPlayerStop: function()
			{
				var reference = {source: MCPi.player.scope.setId, params: {source: MCPi.player.model.setContent, params: {source: MCPi.remote.model.setContent}}};
				console.log("remote.scope.runPlayerStop");

				MCPi.global.scope.setEnabledQueue('#remoteContainer');
				MCPi.json.call("Player.Stop", {"playerid":MCPi.player.id}, null, reference);
			},

			/**
			 * Press Play button from remote control
			 */
			runPlayerPlay: function()
			{
				var reference = {source: MCPi.player.scope.setProperties, params: {source: MCPi.remote.model.setContent}};
				console.log("remote.scope.runPlayerPlay");

				MCPi.global.scope.setEnabledQueue('#remoteContainer');
				MCPi.json.call("Player.PlayPause", {"playerid":MCPi.player.id}, null, reference);
			},

			/**
			 * Press FastForward button from remote control
			 */
			runPlayerFastForward: function()
			{
				var reference = {source: MCPi.player.scope.setProperties};
				console.log("remote.scope.runPlayerFastForward");

				MCPi.json.call("Player.SetSpeed", {"playerid":MCPi.player.id, "speed": "increment"}, null, reference);
			},

			/**
			 * Press Forward button from remote control
			 */
			runPlayerForward: function()
			{
				var reference = {source: MCPi.player.scope.setProperties};
				console.log("remote.scope.runPlayerForward");

				MCPi.json.call("Player.GoTo", {"playerid":MCPi.player.id, "to": "next"}, null, reference);
			},

			/**
			 * Press PartyMode button from remote control
			 */
			runPartyMode: function()
			{
				var type;
				console.log("remote.scope.runPartyMode");

				type = MCPi.player.scope.props.playlistId == 0 ? 'music' : 'video';

				MCPi.remote.vars.partyModeIndexLoop = 0;
				MCPi.remote.vars.partyModeInitialHash = MCPi.player.vars.playerHashcode;

				MCPi.json.call("Player.Open", [{"partymode": type}], MCPi.remote.scope.runPartyModeCallback);
			},

			/**
			 * This is the callback function of calling party mode playlist. This is an iterative and recursive functions
			 * that will call himself until player.id will have a valid value.
			 *
			 * @param data JSON output message
			 */
			runPartyModeCallback: function(data)
			{
				var hash;
				console.log("remote.scope.runPartyModeCallback");

				if(!data || data.result == "OK")
				{
					if(MCPi.player.scope.props.partyMode) hash = MCPi.player.vars.playerHashcode;
						else hash = MCPi.remote.vars.partyModeInitialHash;

					if(MCPi.remote.vars.partyModeIndexLoop < 60 && hash == MCPi.remote.vars.partyModeInitialHash)
					{
						MCPi.player.scope.setId( {source: MCPi.player.model.setContent, params: {source: MCPi.remote.model.setContent}} );

						if(MCPi.remote.vars.partyModeIndexLoop == 0) MCPi.global.model.setWaitOn('#remoteContainer');

						MCPi.remote.vars.partyModeIndexLoop++;
						setTimeout(MCPi.remote.scope.runPartyModeCallback, 1000);
					}
					else
					{
						MCPi.remote.model.show();
						MCPi.global.model.setWaitOff('#remoteContainer');
					}
				}
			},

			/**
			 * Press Fullscreen button from remote control
			 */
			runShowFullscreen: function()
			{
				console.log("remote.scope.runShowFullscreen");

				return MCPi.json.call("GUI.SetFullscreen", {"fullscreen": "toggle"});
			},

			/**
			 * Press Fullscreen button from remote control
			 */
			runShowPlaylist: function()
			{
				console.log("remote.scope.runShowPlaylist");

				return MCPi.json.call("Input.ExecuteAction", {"action":"playlist"});
			},

			/**
			 * Press Mute button from remote control
			 */
			runMute: function()
			{
				console.log("remote.scope.runMute");

				MCPi.global.scope.setEnabledQueue('#remoteContainer');
				MCPi.json.call("Application.SetMute", {"mute":"toggle"}, MCPi.remote.scope.runMuteCallback);
			},

			/**
			 * Callback method used when the Mute button from software remote control is pressed (keydown or click events).
			 *
			 * @param data JSON output message
			 */
			runMuteCallback: function(data)
			{
				console.log("remote.scope.runMuteCallback - " + data.result);

				if(data)
				{
					if(MCPi.player.scope.props.isMuted == data.result) MCPi.player.scope.props.isMuted = !data.result;
						else MCPi.player.scope.props.isMuted = data.result;

					MCPi.remote.model.setContent();
				}
				else MCPi.global.scope.setDisabledQueue();
			},

			/**
			 * Press IncreaseVolume button from remote control
			 */
			runIncreaseVolume: function()
			{
				console.log("remote.scope.runIncreaseVolume");

				MCPi.global.scope.setEnabledQueue('#remoteContainer');
				MCPi.json.call("Application.SetVolume", {"volume":"increment"}, MCPi.remote.scope.runSetVolumeCallback);
			},

			/**
			 * Press DecreaseVolume button from remote control
			 */
			runDecreaseVolume: function()
			{
				console.log("remote.scope.runDecreaseVolume");

				MCPi.global.scope.setEnabledQueue('#remoteContainer');
				MCPi.json.call("Application.SetVolume", {"volume":"decrement"}, MCPi.remote.scope.runSetVolumeCallback);
			},

			/**
			 * Callback method used when IncreaseVolume or DecreaseVolume buttons are pressed
			 *
			 * @param data JSON output message
			 */
			runSetVolumeCallback: function(data)
			{
				console.log("remote.cope.runSetVolumeCallback");

				MCPi.player.scope.props.volume = data.result;
				MCPi.player.scope.props.isMuted = false;
				MCPi.remote.model.setContent();
			},

			/**
			 * Send keydown character when the keyboard is used.
			 *
			 * @param text key character or text message to be sent to MCPi server through a JSON message
			 * @param done
			 */
			sendText: function(text, done)
			{
				if(typeof done === 'undefined') done = false;
				MCPi.json.call("Input.SendText", {"text":text, "done":done});
			}
		},

		model:
		{
			/**
			 * Prepare controls and GUI details when the dialog is open or shown
			 */
			show: function()
			{
				var input;
				console.log("remote.model.show");

				if(!MCPi.player.model.isVisible())
				{
					input = {source: MCPi.player.scope.setVolume, params: {source: MCPi.remote.model.setContent}};

					if(MCPi.player.id < 0) MCPi.player.scope.setId(input);
						else MCPi.player.scope.setProperties(input);
				}
				else
				{
					MCPi.player.scope.setVolume(MCPi.remote.model.setContent);
				}
			},

			/**
			 * Display dialog content according to the player status
			 */
			setContent: function()
			{
				console.log("remote.model.setContent");

				var play = $('#remotePlay');
				var mute = $('#remoteVolumeMute');
				var party = $('#remotePartyMode');

				if (MCPi.player.scope.props.speed <= 0 || MCPi.player.scope.props.speed > 1)
				{
					play.html('<span class="fa fa-play" aria-hidden="true"></span>');
				}
				else if(MCPi.player.scope.props.speed == 1)
				{
					play.html('<span class="fa fa-pause" aria-hidden="true"></span>');
				}

				if(MCPi.player.scope.props.partyMode == true)
				{
					party.addClass("active");
				}
				else
				{
					party.removeClass("active");
				}

				if(MCPi.player.scope.props.isMuted == true)
				{
					mute.html('<span class="fa fa-volume-off fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.player.scope.props.volume + '</span>');
					mute.addClass("active");
				}
				else
				{
					mute.html('<span class="fa fa-volume-up fa-lg" aria-hidden="true"></span>  <span class="badge">' + MCPi.player.scope.props.volume + '</span>');
					mute.removeClass("active");
				}

				MCPi.global.scope.setDisabledQueue();
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

				console.log("remote.model.onClick(#" + id + ")");

				MCPi.remote.model.run(id);
			},

			/**
			 * Handles keydown events for specific keyboard keys.
			 *
			 * @param e keydown event.
			 */
			onKeyPress: function(e)
			{
				var keys =
				{
					8: 'remoteHome',			// Back space
					9: 'remoteFullscreen',		// Tab
					13: 'remoteSelect',			// Enter
					27: 'remoteBack',			// Escape
					32: 'remotePlay',			// Space bar
					36: 'remoteHome',			// Home
					37: 'remoteLeft',			// Left
					38: 'remoteUp',				// Up
					39: 'remoteRight',			// Right
					40: 'remoteDown',			// Down
					91: 'remoteContext',		// "Right Click = Window key"
					107: 'volumeUp',			// + (num keypad)
					109: 'volumeDown',			// - (num keypad)
					187: 'volumeUp',			// + (alnum keypad)
					189: 'volumeDown'			// - (alnum keypad)
				};

				var which = e.which;
				var key = keys[which];

				console.log("remote.model.onKeyPress(" + key + ")");

				e.data = {key: key};

				if (!key)
				{
					// Digits
					if (which >= 48 && which <= 57)
					{
						MCPi.remote.vars.keyText += (which - 48) + "";
					}

					// Letters
					if (which >= 65 && which <= 90)
					{
						var offset = e.shiftKey ? 0 : 32;
						MCPi.remote.vars.keyText += String.fromCharCode(which + offset);
					}

					// Digits
					if (which >= 96 && which <= 105)
					{
						MCPi.remote.vars.keyText += (which - 96) + "";
					}

					e.data.text = MCPi.remote.vars.keyText;
					e.data.key = 'text';
				}

				if(which == 13 && MCPi.remote.vars.keyText != "")
				{
					e.data.key = 'text';
					e.data.text = MCPi.remote.vars.keyText;
					MCPi.remote.vars.keyText = '';

					return MCPi.remote.scope.sendText(e.data.text, true);
				}
				else if(e.data.key == "text")
				{
					return MCPi.remote.scope.sendText(e.data.text, false);
				}
				else
				{
					return MCPi.remote.model.run(e.data.key);
				}
			},

			/**
			 * Execute related command to the keydown or click event.
			 *
			 * @param key application key code to select the action to be executed.
			 */
			run: function(key)
			{
				switch (key)
				{
					case 'remoteMusic':
						MCPi.remote.scope.runShowMusicScreen();
						break;
					case 'remoteVideo':
						MCPi.remote.scope.runShowVideoScreen();
						break;
					case 'remotePictures':
						MCPi.remote.scope.runShowPhotoScreen();
						break;
					case 'remoteSettings':
						MCPi.remote.scope.runShowSettingsScreen();
						break;
					case 'remoteVolumeMute':
						MCPi.remote.scope.runMute();
						break;
					case 'remoteVolumeUp':
						MCPi.remote.scope.runIncreaseVolume();
						break;
					case 'remoteVolumeDown':
						MCPi.remote.scope.runDecreaseVolume();
						break;
					case 'remoteHome':
						MCPi.remote.scope.runInputHome();
						break;
					case 'remoteUp':
						MCPi.remote.scope.runInputUp();
						break;
					case 'remoteDown':
						MCPi.remote.scope.runInputDown();
						break;
					case 'remoteLeft':
						MCPi.remote.scope.runInputLeft();
						break;
					case 'remoteRight':
						MCPi.remote.scope.runInputRight();
						break;
					case 'remoteSelect':
						MCPi.remote.scope.runInputSelect();
						break;
					case 'remoteBack':
						MCPi.remote.scope.runInputBack();
						break;
					case 'remoteInfo':
						MCPi.remote.scope.runInputInfo();
						break;
					case 'remoteContext':
						MCPi.remote.scope.runInputContext();
						break;
					case 'remoteFastRewind':
						MCPi.remote.scope.runPlayerFastRewind();
						break;
					case 'remoteRewind':
						MCPi.remote.scope.runPlayerRewind();
						break;
					case 'remoteStop':
						MCPi.remote.scope.runPlayerStop();
						break;
					case 'remotePlay':
						MCPi.remote.scope.runPlayerPlay();
						break;
					case 'remoteFastForward':
						MCPi.remote.scope.runPlayerFastForward();
						break;
					case 'remoteForward':
						MCPi.remote.scope.runPlayerForward();
						break;
					case 'remotePartyMode':
						MCPi.remote.scope.runPartyMode();
						break;
					case 'remoteFullscreen':
						MCPi.remote.scope.runShowFullscreen();
						break;
					case 'remotePlaylist':
						MCPi.remote.scope.runShowPlaylist();
						break;
				}
			}
		}
	};
}(window));