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
				hash: '',
				keyText: ''
			},

			hashChange: function (e)
			{
				// e = n.Event, this = Window
				var hash = window.location.hash || '#home';

				if (hash == MCPi.main.vars.hash) return;

				MCPi.main.vars.hash = hash;
				MCPi.main.fadeOut();

				$.get('pages/' + hash.substr(1) + '.html', function (d)
				{
					$('#mainContent').html(d);
					MCPi.main.fadeIn(hash);
				})
			},

			fadeOut: function ()
			{
				$('#spinnerOverlay').fadeIn('fast');
				$('#mainContent').fadeOut('fast');
				$('*.active').removeClass('active');
			},

			fadeIn: function (hash)
			{
				$('*[href=' + hash + ']').parent().addClass('active');
				$('#mainContent').fadeIn('fast');
				$('#spinnerOverlay').fadeOut('fast');
			},

			onClick: function (event)
			{
				event.preventDefault();

				var obj = $(this);
				var id = obj.attr('id');

				return MCPi.main.run(id);
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
		$(window).hashchange(MCPi.main.hashChange);
		$(window).trigger('hashchange');

		$(document).on('click', '[data-clickthrough=false]', MCPi.main.onClick);
		$(document).on('keydown', '[id=remoteModal]', jQuery.proxy(MCPi.main.handleKeyPress, this));

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
		$(document).on('click','.navbar-collapse.in',function(e)
		{
			if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) )
			{
				$(this).collapse('hide');
			}
		});

		MCPi.player.getPlayerId();
	})

}(window, jQuery));



/**
 * jQuery hashchange event
 */
(function ($, e, b)
{
	var c = "hashchange", h = document, f, g = $.event.special, i = h.documentMode, d = "on" + c in e && (i === b || i > 7);


	function a(j)
	{
		j = j || location.href;
		return"#" + j.replace(/^[^#]*#?(.*)$/, "$1")
	}


	$.fn[c] = function (j)
	{
		return j ? this.bind(c, j) : this.trigger(c)
	};


	$.fn[c].delay = 50;


	g[c] = $.extend(g[c], {setup: function ()
	{
		if (d)
		{
			return false
		}
		$(f.start)
	},

	teardown: function ()
	{
		if (d)
		{
			return false
		}
		$(f.stop)
	}});


	f = (function ()
	{
		var j = {}, p, m = a(), k = function (q)
		{
			return q
		}, l = k, o = k;

		j.start = function ()
		{
			p || n()
		};

		j.stop = function ()
		{
			p && clearTimeout(p);
			p = b
		};

		function n()
		{
			var r = a(), q = o(m);
			if (r !== m)
			{
				l(m = r, q);
				$(e).trigger(c)
			}
			else
			{
				if (q !== m)
				{
					location.href = location.href.replace(/#.*/, "") + q
				}
			}
			p = setTimeout(n, $.fn[c].delay)
		}

		return j
	})()

})(jQuery, this);
