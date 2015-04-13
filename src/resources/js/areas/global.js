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
					type: 'POST'
				}
			},

			props:
			{
				audio: ['title', 'artist', 'album', 'year', 'genre', 'thumbnail', 'fanart', 'rating'],
				movie: ['title', 'set', 'genre', 'year', 'rating', 'fanart', 'thumbnail'],
				episode: ['title', 'showtitle', 'season', 'episode', 'rating', 'fanart', 'thumbnail']
			},

			/**
			 * Execute a JSON call
			 *
			 * @param method JSON method
			 * @param params JSON parameters
			 * @param callback callback method to be executed after launching JSON principal command
			 * @param reference method or parameter to transfer it through to the callback method
			 * @returns the status of JSON call
			 */
			call: function (method, params, callback, reference)
			{
				var request, data =
				{
					'id': 1,
					'jsonrpc': '2.0',
					'method': method,
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
							if(reference != null) callback(output, reference);
								else callback(output);
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

			/**
			 * Translate a JSON output and check if it about an error
			 *
			 * @param output JSON output message
			 * @returns false if no error appeared or the formatted error message
			 */
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
			},

			/**
			 * Execute reference method.
			 *
			 * @param reference method or structure
			 */
			chain: function(reference)
			{
				//process references
				if(reference != null)
				{
					//run a source reference
					if(reference.source)
					{
						var source = reference.source;

						if(reference.params != null) source(reference.params);
							else source();
					}
					else
					{
						reference();
					}
				}
			}
		},

		global:
		{
			vars:
			{
				currentScreen: "#home"
			},

			scope:
			{
				init: function()
				{
					console.log("global.scope.init");

					MCPi.player.scope.init();
					MCPi.global.model.setContent(MCPi.global.vars.currentScreen);
				}
			},

			model:
			{
				/**
				 * Run click action on the links or buttons that contains "main" identifier
				 *
				 * @param event call event
				 */
				onClick: function (event)
				{
					console.log("global.model.onClick");

					event.preventDefault();

					var obj = $(this);
					var id = obj.attr('id');
					var name = id.slice(6).toLowerCase();

					MCPi.global.model.setContent("#" + name);
				},

				/**
				 * Display a specific content, showing the corresponding panel.
				 *
				 * @param name panel name to be shown
				 */
				setContent: function(name)
				{
					console.log("global.model.setContent");

					if(MCPi.global.vars.currentScreen != name)
					{
						$(MCPi.global.vars.currentScreen).collapse('hide');
					}

					MCPi.global.vars.currentScreen = name;

					$(MCPi.global.vars.currentScreen).collapse('show');
				},

				/**
				 * Write wait spinner control to a specific container and make it unusable until
				 * <code>setWaitOff</code> is called
				 *
				 * @param id div container where new code is appended
				 */
				setWaitOn: function(id)
				{
					var obj, text = '<div class="text-center wait-overlay"><i class="fa fa-spinner fa-spin fa-5x"></i></div>';

					if(id == null) obj = $('body');
						else obj = $(id);

					if(obj.children('.wait-overlay').length == 0)
					{
						obj.append(text);
					}

					obj.children('.wait-overlay').css('display', 'inline');
				},

				/**
				 * Remove wait spinner control from a specific container and let the end-user
				 * to use the GUI
				 *
				 * @param id div container where wait control is removed
				 */
				setWaitOff: function(id)
				{
					var obj;

					if(id == null) obj = $('body');
						else obj = $(id);

					if(obj.children('.wait-overlay').length > 0)
					{
						obj.children('.wait-overlay').css('display', 'none');
						obj.children('.wait-overlay').remove();
					}
				},

				showMessage: function(text)
				{
					// set the message to display: none to fade it in later.
					$('#errorMessageDialog p').html(text);
					$('#errorMessageDialog').modal('show');
				}
			}
		},

		libs:
		{
			/**
			 * Transform a time structure into a number of seconds.
			 *
			 * @param time time structure
			 * @returns number of seconds corresponding to the time structure
			 */
			timeToDuration: function (time)
			{
				var duration;

				time = time || {};
				duration = ((time.hours || 0) * 3600);
				duration += ((time.minutes || 0) * 60);
				duration += (time.seconds || 0);

				return duration;
			},

			/**
			 * Transform a duration number (number of seconds) into a formatted time string
			 *
			 * @param duration number of seconds
			 * @returns formatted time string
			 */
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

			/**
			 * Get a physical URL
			 *
			 * @param url an incomplete URL (without "image" sub-context)
			 * @returns a complete URL to be displayed in GUI
			 */
			formatAssetURL: function (url)
			{
				return "image/" + encodeURI(url);
			}
		}
	};

	window.MCPi = MCPi;

	$(function ()
	{
		//dedicated code for mobile to collapse navigation bar when click event has been performed
		$(document).on('click','.navbar-collapse.in', function(e)
		{
			if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) )
			{
				$(this).collapse('hide');
			}
		});

		//register and then handle the click events to change the screen panels
		$(document).on('click', '[data-clickthrough=main]', MCPi.global.model.onClick);

		//register and then handle the click events from system menu (all options from right side of navigation container)
		$(document).on('click', '[data-clickthrough=system]', MCPi.system.model.onClick);

		//register and then handle the click events from remote control dialog
		$(document).on('click', '[data-clickthrough=remote]', MCPi.remote.model.onClick);

		//register and then handle the keydown events from remote control dialog
		$(document).on('keydown', '[id=remoteControlModal]', jQuery.proxy(MCPi.remote.model.onKeyPress, this));

		//show remote control dialog
		$('#remoteControlModal').on('show.bs.modal',function (e)
		{
			MCPi.remote.model.show();
		});

		//expand nowplaying container panel
		$('#nowPlayingContainer').on('show.bs.collapse',function (e)
		{
			MCPi.player.model.show();
		});

		//collapse nowplaying container panel
		$('#nowPlayingContainer').on('hide.bs.collapse',function (e)
		{
			MCPi.player.model.hide();
		});

		//register and then handle the click events from drop down options related to latest entries from each list published on home panel screen
		$(document).on('click', '[data-clickthrough=home]', MCPi.home.model.onClick);

		//expand home screen panel
		$('#home').on('shown.bs.collapse', function(e)
		{
			//nothing here
			MCPi.home.model.show();
		});

		//expand event of recentsongs list from home screen panel
		$('#recentsongs').on('show.bs.collapse',function (e)
		{
			MCPi.home.scope.setLatestSongs();
		});

		//expand event of recentmovies list from home screen panel
		$('#recentmovies').on('show.bs.collapse',function (e)
		{
			MCPi.home.scope.setLatestMovies();
		});

		//expand event of recentepisodes list from home screen panel
		$('#recentepisodes').on('show.bs.collapse',function (e)
		{
			MCPi.home.scope.setLatestEpisodes()
		});

		//expand music screen panel
		$('#music').on('show.bs.collapse', function(e)
		{
			MCPi.music.model.show();
		});

		//collapse music screen panel
		$('#music').on('hide.bs.collapse', function(e)
		{
			MCPi.music.model.hide();
		});

		//sort items from nowplaying queue in music screen
		$('#musicListItems').sortable({items:'div.item', handle:'.media-object'});
		$('#musicListItems').on('sortable:update', function(e)
		{
			if(MCPi.music.vars.fillInNowPlayingQueue == false)
			{
				MCPi.music.model.onSortNowPlayingQueue();
			}
		});

		//register and then handle the click events for all buttons and links from music screen panel
		$(document).on('click', '[data-clickthrough=music]', MCPi.music.model.onClick);

		$('#movies').on('show.bs.collapse', function(e)
		{
			//
		});

		$('#photos').on('show.bs.collapse', function(e)
		{
			//
		});

		MCPi.global.scope.init();
	})

}(window, jQuery));