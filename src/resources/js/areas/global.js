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
				audio: ['title', 'artist', 'album', 'year', 'genre', 'thumbnail', 'fanart', 'rating', 'file'],
				movie: ['title', 'set', 'genre', 'year', 'rating', 'fanart', 'thumbnail', 'file'],
				episode: ['title', 'showtitle', 'season', 'episode', 'rating', 'fanart', 'thumbnail', 'file']
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
				console.log("  > json.call");

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
							if(reference != null)
							{
								console.log("    > callback(output,reference)");
								callback(output, reference);
							}
							else
							{
								console.log("    > callback(output)");
								callback(output);
							}

							MCPi.global.model.setOkStatus();
						},
						error: function(output)
						{
							var msg = MCPi.json.error(output);
							MCPi.global.model.setErrorStatus(msg);
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

								if(reference.params != null)
								{
									console.log("    > source(params)");
									source(reference.params);
								}
								else
								{
									console.log("    > source()");
									source();
								}
							}
							else if(reference.origin != null)
							{
								console.log("    > origin");

								//call chain reference
								MCPi.global.scope.runReference(reference.origin);
							}
							else
							{
								console.log("    > reference");
								reference();
							}

							MCPi.global.model.setOkStatus();
						},
						error: function(output)
						{
							var msg = MCPi.json.error(output);
							MCPi.global.model.setErrorStatus(msg);
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
					var errorMsg = null;

					if(output.error.code  && output.error.message)
					{
						errorMsg = "Error (" + output.error.code + "): " + output.error.message;

						if(output.error.data && output.error.data.method) errorMsg +="\n\tMethod: " + output.error.data.method;
						if(output.error.data && output.error.data.stack && output.error.data.stack.message) errorMsg +="\n\tDetails: " + output.error.data.stack.message;
					}
					else errorMsg = "Connection lost";

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
				console.log("  > json.chain");

				//process references
				if(reference != null)
				{
					if(reference.source != null)
					{
						var source = reference.source;

						if(reference.params != null)
						{
							console.log("    > source(params)");
							source(reference.params);

							//closing reference chain
							if(reference.params.source == null) MCPi.global.scope.setDisabledQueue();
						}
						else
						{
							console.log("    > source()");
							source();

							//closing reference chain
							MCPi.global.scope.setDisabledQueue();
						}
					}
					else if(reference.origin != null)
					{
						console.log("    > origin");

						//call chain reference
						MCPi.global.scope.runReference(reference.origin);
					}
					else
					{
						console.log("    > reference");
						reference();

						//closing reference chain
						MCPi.global.scope.setDisabledQueue();
					}
				}
				else
				{
					//closing reference chain
					MCPi.global.scope.setDisabledQueue();
				}
			}
		},

		global:
		{
			vars:
			{
				timerInterval: 15500,		/* interval time (in ms) to run reference queue */
				timerProcessId: null,		/* timer process id - if this is not null means that the reference queue has been scheduled */
				timerReferences: [],		/* reference functions that are in queue of execution */
				runningInQueue: false,		/* show if function(s) that registered in queue are currently running. In this situation the queue will not run over */
				currentScreen: "#home",		/* current screen name */
				userActionIdentifier: null	/* this is the tag object instance used to identify the current serialized user action that is run locking the screen or a screen area during execution */
			},

			scope:
			{
				/**
				 * Initialize MCPi web component: the player is reset, set the reference queue and in in it set player id function and
				 * set home page screen content.
				 */
				init: function()
				{
					console.log("global.scope.init");

					MCPi.player.scope.reset();

					MCPi.global.scope.addReference(MCPi.player.scope.setId);
					MCPi.global.scope.setReferenceTimer();

					MCPi.global.model.setContent(MCPi.global.vars.currentScreen);
				},

				/**
				 * Activate the semaphore of reference queue to not run in parallel many instances
				 */
				setEnabledQueue: function(id)
				{
					MCPi.global.vars.runningInQueue = true;
					if(id != null) MCPi.global.model.startUserAction(id);
				},

				/**
				 * Disable the semaphore of reference queue to allow running the queue
				 */
				setDisabledQueue: function()
				{
					MCPi.global.vars.runningInQueue = false;
					MCPi.global.model.stopUserAction();
				},

				/**
				 * Check is the reference queue is running.
				 *
				 * @returns boolean true if there is a method (or a linked one) from reference queue which is currently running
				 */
				isRunningQueue: function()
				{
					return MCPi.global.vars.runningInQueue;
				},

				/**
				 * Check is the reference queue is not running.
				 *
				 * @returns boolean true if any method (or a linked one) from reference queue are not running
				 */
				isNotRunningQueue: function()
				{
					return !MCPi.global.scope.isRunningQueue();
				},

				/**
				 * Set automatic queue execution (only one time - immediately after the application is initialized)
				 */
				setReferenceTimer: function()
				{
					console.log("global.scope.setReferenceTimer");

					if(MCPi.global.vars.timerProcessId == null)
					{
						MCPi.global.vars.timerProcessId = setInterval(MCPi.global.scope.runReference, MCPi.global.vars.timerInterval);
					}
				},

				/**
				 * Execute the first reference from queue in case of the input parameter is null or the next reference from queue
				 * when the input reference is specified.
				 *
				 * @param reference current reference (function that is executed)
				 */
				runReference: function(reference)
				{
					console.log("global.scope.runReference");

					if(reference == null && MCPi.global.vars.timerReferences.length > 0)
					{
						if(MCPi.global.scope.isNotRunningQueue())
						{
							console.log("  > queue(init)");
							var initFunction = MCPi.global.vars.timerReferences[0];
							initFunction({"origin":initFunction});
						}
						else
						{
							console.log("  > queue(skip)");
							MCPi.global.scope.setDisabledQueue();
						}
					}
					else if(reference != null && MCPi.global.vars.timerReferences.length > 0)
					{
						var nextFunction = null;
						var index = MCPi.global.vars.timerReferences.indexOf(reference);

						if (index >= 0 && MCPi.global.vars.timerReferences.length > index + 1)
						{
							console.log("  > queue(next)");
							nextFunction = MCPi.global.vars.timerReferences[index + 1];
							nextFunction({"origin": nextFunction});
						}
						else
						{
							console.log("  > queue(end)");
							MCPi.global.scope.setDisabledQueue();
						}
					}
				},

				/**
				 * Add new function reference in queue.
				 *
				 * @param reference function reference
				 * @param now decide if the reference is executed after queue registration. If is null or true will be executed
				 */
				addReference: function(reference, now)
				{
					console.log("global.scope.addReference");

					if(reference != null)
					{
						if(now == null || now == true) reference();

						var index = MCPi.global.vars.timerReferences.indexOf(reference);
						if(index < 0) MCPi.global.vars.timerReferences.push(reference);
					}
				},

				/**
				 * Delete the specified reference from queue.
				 *
				 * @param reference function reference
				 * @param now decide if the reference is executed after queue registration. If is null or true will be executed
				 */
				delReference: function(reference, now)
				{
					console.log("global.scope.delReference");

					if(reference != null)
					{
						var index = MCPi.global.vars.timerReferences.indexOf(reference);
						if(index < 0) MCPi.global.vars.timerReferences.splice(index, 1);

						if(now == null || now == true) reference();
					}
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
					event.preventDefault();

					var obj = $(this);
					var id = obj.attr('id');
					var name = id.slice(6).toLowerCase();

					console.log("global.model.onClick(#" + id + ")");

					MCPi.global.model.setContent("#" + name);
				},

				/**
				 * Display a specific content, showing the corresponding panel.
				 *
				 * @param name panel name to be shown
				 */
				setContent: function(name)
				{
					console.log("global.model.setContent(" + name + ")");

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

					if(jQuery.type(id) === "string") obj = $(id);
							else if(jQuery.type(id) === "object") obj = id;
								else obj = null;

					if(obj && obj.children('.wait-overlay').length == 0)
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
					else
					{
						if(jQuery.type(id) === "string") obj = $(id);
							else if(jQuery.type(id) === "object") obj = id;
								else obj = null;
					}

					if(obj && obj.children('.wait-overlay').length > 0)
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
				},

				/**
				 * Set 'ok' status (and a corresponding graphical sign in navigation bar) when
				 * the transaction has been performed without errors
				 *
				 * @param msg test message to be written as title of the graphical icon
				 */
				setOkStatus: function(msg)
				{
					console.log("global.model.setOkStatus");

					$('#brandStatus').html('<i class="fa fa-circle-o-notch fa-spin text-primary"' + (msg != null ? '" title="' + msg + '">' : '>') + '</i>');
				},

				/**
				 * Set 'error' status (and a corresponding graphical sign in navigation bar) when
				 * the transaction has been performed with errors
				 *
				 * @param msg test message to be written as title of the graphical icon
				 */
				setErrorStatus: function(msg)
				{
					console.log("global.model.setErrorStatus");
					MCPi.global.scope.setDisabledQueue();

					$('#brandStatus').html('<i class="fa fa-ban text-danger"' + (msg != null ? '" title="' + msg + '">' : '>') + '</i>');
				},

				/**
				 * This is a GUI function to send a signal to Window Manager that an user action started and the screen will be locked
				 * until the end of action's execution
				 *
				 * @param id this is the identifier of the screen (to apply locking indicator) or a screen area identifier.
				 */
				startUserAction: function(id)
				{
					console.log("global.model.startUserAction");

					if(id == null) MCPi.global.vars.userActionIdentifier = $('body');
						else MCPi.global.vars.userActionIdentifier = $(id);

					MCPi.global.model.setWaitOn(MCPi.global.vars.userActionIdentifier);
				},

				/**
				 * This is a GUI function to send a signal to Window Manager that an user action finished his action and
				 * the screen have to be unlocked. In case of <code>startUserAction</code> function has been executed this current
				 * function is be able to revoke GUI behavior (initiated by the opposite function)
				 */
				stopUserAction: function()
				{
					if(MCPi.global.vars.userActionIdentifier != null)
					{
						console.log("global.model.stopUserAction");

						MCPi.global.model.setWaitOff(MCPi.global.vars.userActionIdentifier);
						MCPi.global.vars.userActionIdentifier = null;
					}
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

		//expand audio screen panel
		$('#audio').on('show.bs.collapse', function(e)
		{
			MCPi.music.model.show();
		});

		//collapse audio screen panel
		$('#audio').on('hide.bs.collapse', function(e)
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

		//expand video screen panel
		$('#video').on('show.bs.collapse', function(e)
		{
			//
		});

		//collapse video screen panel
		$('#video').on('show.bs.collapse', function(e)
		{
			//
		});

		/** Initialize Clue MCPi WebInterface module */
		MCPi.global.scope.init();
	})

}(window, jQuery));