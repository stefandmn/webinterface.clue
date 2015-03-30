/**
 * JavaScript component for MCPi
 * Main script that implements MCPi object and related methods
 */


(function (window, jQuery)
{
	var MCPi =
	{
		json:
		{
			vars:
			{
				header:
				{
					contentType: 'application/json',
					dataType: 'json',
					type: 'GET'
				}
			},

			props:
			{
				audio: ['title', 'artist', 'album', 'year', 'genre', 'thumbnail', 'fanart', 'rating'],
				movie: ['title', 'set', 'genre', 'year', 'rating', 'fanart', 'thumbnail'],
				episode: ['title', 'showtitle', 'season', 'episode', 'rating', 'fanart', 'thumbnail']
			},

			call: function (method, params, callback, reference)
			{
				var request, data =
				{
					'jsonrpc': '2.0',
					'method': method,
					'id': 1,
					'params': params
				};

				if(callback != null)
				{
					request = jQuery.extend({}, MCPi.json.vars.header,
					{
						url:'jsonrpc' + (MCPi.json.vars.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data),
						success: function (output)
						{
							//process references
							if(reference != null)
							{
								if(typeof reference === 'string')
								{
									callback(output, reference);
								}
								else
								{
									// run the callback method
									callback(output);

									//run a source reference
									if(reference.source != null)
									{
										var source = reference.source;

										if(reference.params != null) source(reference.params);
											else source();
									}
								}
							}
							else callback(output)
						}
					});
				}
				else if(callback == null && reference != null)
				{
					request = jQuery.extend({}, MCPi.json.vars.header,
					{
						url:'jsonrpc' + (MCPi.json.vars.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data),
						success: function (output)
						{
							//run a source reference
							if(reference.source != null)
							{
								var source = reference.source;

								if(reference.params != null) source(reference.params);
									else source();
							}
						}
					});
				}
				else
				{
					request = jQuery.extend({}, MCPi.json.vars.header,
					{
						url:'jsonrpc' + (MCPi.json.vars.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data)
					});
				}

				return $.ajax(request);
			},

			error: function(output)
			{
				if(output && output.error)
				{
					var errorMsg = "Error (" + output.error.code + "): " + output.error.message;

					if(output.error.data && output.error.data.method) errorMsg +="\n\tMethod: " + output.error.data.method;
					if(output.error.data && output.error.data.stack && output.error.data.stack.message) errorMsg +="\n\tDetails: " + output.error.data.stack.message;

					return errorMsg;
				}
				else return false;
			}
		},

		main:
		{
			vars:
			{
				currentScreen: "#home",
				keyText: ''
			},

			init: function()
			{
				MCPi.player.getPlayerId();
				MCPi.main.showContent(MCPi.main.vars.currentScreen);
			},

			onClick: function (event)
			{
				event.preventDefault();

				var obj = $(this);
				var id = obj.attr('id');

				return MCPi.main.run(id);
			},

			onClickContent: function (event)
			{
				event.preventDefault();

				var obj = $(this);
				var id = obj.attr('id');
				var name = id.slice(6).toLowerCase();

				MCPi.main.showContent("#" + name);
			},

			showContent: function(name)
			{
				if(MCPi.main.vars.currentScreen != name)
				{
					$(MCPi.main.vars.currentScreen).collapse('hide');
				}

				MCPi.main.vars.currentScreen = name;
				$(MCPi.main.vars.currentScreen).collapse('show');
			},

			sendText: function(text, done)
			{
				if(typeof done === 'undefined') done = false;
				return MCPi.json.call("Input.SendText", {"text":text, "done":done});
			},

			handleKeyPress: function(event)
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

				var which = event.which;
				var key = keys[which];

				event.data = {key: key};

				if (!key)
				{
					// Digits
					if (which >= 48 && which <= 57)
					{
						MCPi.main.vars.keyText += (which - 48) + "";
					}

					// Letters
					if (which >= 65 && which <= 90)
					{
						var offset = event.shiftKey ? 0 : 32;
						MCPi.main.vars.keyText += String.fromCharCode(which + offset);
					}

					// Digits
					if (which >= 96 && which <= 105)
					{
						MCPi.main.vars.keyText += (which - 96) + "";
					}

					event.data.text = MCPi.main.vars.keyText;
					event.data.key = 'text';
				}

				if(which == 13 && MCPi.main.vars.keyText != "")
				{
					event.data.key = 'text';
					event.data.text = MCPi.main.vars.keyText;
					MCPi.main.vars.keyText = '';

					return MCPi.main.sendText(event.data.text, true);
				}
				else if(event.data.key == "text")
				{
					return MCPi.main.sendText(event.data.text, false);
				}
				else
				{
					return MCPi.main.run(event.data.key);
				}
			},

			run: function(key)
			{
				switch (key)
				{
					case 'remoteMusic':
						return MCPi.remote.runShowMusic();
					case 'remoteVideo':
						return MCPi.remote.runShowVideo();
					case 'remotePictures':
						return MCPi.remote.runShowPictures();
					case 'remoteSettings':
						return MCPi.remote.runShowSettings();
					case 'remoteVolumeMute':
						return MCPi.remote.runMute();
					case 'remoteVolumeUp':
						return MCPi.remote.runIncreaseVolume();
					case 'remoteVolumeDown':
						return MCPi.remote.runDecreaseVolume();
					case 'remoteHome':
						return MCPi.remote.runInputHome();
					case 'remoteUp':
						return MCPi.remote.runInputUp();
					case 'remoteDown':
						return MCPi.remote.runInputDown();
					case 'remoteLeft':
						return MCPi.remote.runInputLeft();
					case 'remoteRight':
						return MCPi.remote.runInputRight();
					case 'remoteSelect':
						return MCPi.remote.runInputSelect();
					case 'remoteBack':
						return MCPi.remote.runInputBack();
					case 'remoteInfo':
						return MCPi.remote.runInputInfo();
					case 'remoteContext':
						return MCPi.remote.runInputContext();
					case 'remoteFastRewind':
						return MCPi.remote.runPlayerFastRewind();
					case 'remoteRewind':
						return MCPi.remote.runPlayerRewind();
					case 'remoteStop':
						return MCPi.remote.runPlayerStop();
					case 'remotePlay':
						return MCPi.remote.runPlayerPlay();
					case 'remoteForward':
						return MCPi.remote.runPlayerFastForward();
					case 'remoteFastForward':
						return MCPi.remote.runPlayerForward();
					case 'remotePartyMode':
						return MCPi.remote.runPartyMode();
					case 'remoteFullscreen':
						return MCPi.remote.runShowFullscreen();
					case 'remotePlaylist':
						return MCPi.remote.runShowPlaylist();
					case 'videoLibraryUpdate':
						return MCPi.system.updateVideo();
					case 'videoLibraryClean':
						return MCPi.system.cleanVideo();
					case 'audioLibraryUpdate':
						return MCPi.system.updateAudio();
					case 'audioLibraryClean':
						return MCPi.system.cleanAudio();
					case 'powerOff':
						return MCPi.system.shutdown();
					case 'powerReboot':
						return MCPi.system.reboot();
					case 'powerExit':
						return MCPi.system.exit();
					default:
						return false;
				}
			}
		},

		libs:
		{
			timeToDuration: function (time)
			{
				var duration;

				time = time || {};
				duration = ((time.hours || 0) * 3600);
				duration += ((time.minutes || 0) * 60);
				duration += (time.seconds || 0);

				return duration;
			},

			durationToString: function (duration)
			{
				var total_seconds = duration || 0,
					seconds = total_seconds % 60,
					minutes = Math.floor(total_seconds / 60) % 60,
					hours = Math.floor(total_seconds / 3600),
					result = ((hours > 0 && ((hours < 10 ? '0' : '') + hours + ':')) || '');

				result += (minutes < 10 ? '0' : '') + minutes + ':';
				result += (seconds < 10 ? '0' : '') + seconds;

				return result;
			},

			formatAssetURL: function (url)
			{
				return "image/" + encodeURI(url);
			}
		}
	};

	window.MCPi = MCPi;

	$(function ()
	{
		$(document).on('click', '[data-clickthrough=false]', MCPi.main.onClick);
		$(document).on('keydown', '[id=remoteModal]', jQuery.proxy(MCPi.main.handleKeyPress, this));
		$(document).on('click', '[data-content=true]', MCPi.main.onClickContent);

		$('#home').on('show.bs.collapse',function (e)
		{
			MCPi.home.init();
		});

		$('#music').on('show.bs.collapse', function(e)
		{
			MCPi.music.init();
		});

		//$('#movies').on('show', MCPi.home.init());
		//$('#photos').on('show', MCPi.home.init());

		$('#sendMessage').bind('click', MCPi.system.notify);

		$('#remoteModal').on('show.bs.modal',function (e)
		{
			MCPi.remote.init();
		});

		$('#nowPlayingContainer').on('show.bs.collapse',function (e)
		{
			MCPi.player.showing();
		});

		$('#nowPlayingContainer').on('hide.bs.collapse',function (e)
		{
			MCPi.player.hiding();
		});

		//dedicated code for mobile to collapse navigation bar when click event has been performed
		$(document).on('click','.navbar-collapse.in', function(e)
		{
			if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) )
			{
				$(this).collapse('hide');
			}
		});

		$('#recentsongs').on('show.bs.collapse',function (e)
		{
			MCPi.home.getLatestSongs();
		});

		$('#recentmovies').on('show.bs.collapse',function (e)
		{
			MCPi.home.getLatestMovies();
		});

		$('#recentepisodes').on('show.bs.collapse',function (e)
		{
			MCPi.home.getLatestEpisodes();
		});

		$(document).on('click', '[scope=home-actions]', MCPi.home.onMenuClick);

		$('#musicListItems').sortable({items:'div.item', handle:'.media-object'});
		$('#musicListItems').on('sortable:update', MCPi.music.onChangeNowPlaying);

		$(document).on('click', '[scope=music-data]', MCPi.music.onDataClick);
		$(document).on('click', '[scope=music-filter]', MCPi.music.onFilterClick);
		$(document).on('click', '[scope=music-actions]', MCPi.music.onMusicMenuClick);

		MCPi.main.init();
	})

}(window, jQuery));