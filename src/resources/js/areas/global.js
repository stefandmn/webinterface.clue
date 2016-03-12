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
			const:
			{
				header:
				{
					contentType: 'application/json',
					dataType: 'json',
					type: 'POST'
				},

				props:
				{
					audio: ['title', 'artist', 'album', 'year', 'genre', 'thumbnail', 'fanart', 'rating', 'file'],
					movie: ['title', 'set', 'genre', 'year', 'rating', 'fanart', 'thumbnail', 'file'],
					episode: ['title', 'showtitle', 'season', 'episode', 'rating', 'fanart', 'thumbnail', 'file']
				}
			},

			/**
			 * Execute a JSON call. All calls are synchronous and accept callback and call references to define processes.
			 *
			 * @param method JSON method
			 * @param params JSON parameters
			 * @param reference method or parameter to transfer it through to the callback method
			 * @returns the status of JSON call
			 */
			call: function (method, params, reference)
			{
				var request, data =
				{
					'id': 1,
					'jsonrpc': '2.0',
					'method': method,
					'params': params
				};

				if(reference != null && reference.callback != null)
				{
					request = jQuery.extend({}, MCPi.json.const.header,
					{
						url:'jsonrpc' + (MCPi.json.const.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data),
						async:false,
						success: function (output)
						{
							var method, callback, subreference, subchain;
							MCPi.GUI.showOkStatus();

							callback = reference.callback;
							callback(reference.input, output, reference);

							subreference = reference.chain;
							subchain = subreference != null ? subreference.chain : null;

							if(subreference != null && subreference.onsuccess != null)
							{
								method = subreference.onsuccess;
								method(output.result, null, subchain);
							}
							else if(subreference != null && subreference.nextcall != null)
							{
								method = subreference.nextcall;
								method(output.result, null, subchain);
							}
							else if(subreference != null)
							{
								method = subreference;
								method(output.result, null, null);
							}
						},
						error: function(output)
						{
							var method, subreference, subchain, errmessage = MCPi.json.getErrorMessage(output);
							MCPi.GUI.showErrorStatus(errmessage);

							subreference = reference.chain;
							subchain = subreference != null ? subreference.chain : null;

							if(subreference != null && subreference.onerror != null)
							{
								method = subreference.onerror;
								method(output.result, null, subchain);
							}
							else if(subreference != null && subreference.nextcall != null)
							{
								method = subreference.nextcall;
								method(output.result, null, subchain);
							}
							else if(subreference != null)
							{
								method = subreference;
								method(output.result, null, null);
							}
						}
					});
				}
				else if(reference != null && reference.callback == null)
				{
					request = jQuery.extend({}, MCPi.json.const.header,
					{
						url:'jsonrpc' + (MCPi.json.const.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data),
						async:false,
						success: function (output)
						{
							var method, subreference, subchain;
							MCPi.GUI.showOkStatus();

							subreference = reference.chain;
							subchain = subreference != null ? subreference.chain : null;

							if(subreference != null && subreference.onsuccess != null)
							{
								method = subreference.onsuccess;
								method(output.result, null, subchain);
							}
							else if(subreference != null && subreference.nextcall != null)
							{
								method = subreference.nextcall;
								method(output.result, null, subchain);
							}
							else if(subreference != null)
							{
								method = subreference;
								method(output.result, null, null);
							}
						},
						error: function(output)
						{
							var method, subreference, subchain, errmessage = MCPi.json.getErrorMessage(output);
							MCPi.GUI.showErrorStatus(errmessage);

							subreference = reference.chain;
							subchain = subreference != null ? subreference.chain : null;

							if(subreference != null && subreference.onerror != null)
							{
								method = subreference.onerror;
								method(output.result, null, subchain);
							}
							else if(subreference != null && subreference.nextcall != null)
							{
								method = subreference.nextcall;
								method(output.result, null, subchain);
							}
							else if(subreference != null)
							{
								method = subreference;
								method(output.result, null, null);
							}
						}
					});
				}
				else
				{
					request = jQuery.extend({}, MCPi.json.const.header,
					{
						url:'jsonrpc' + (MCPi.json.const.header.type.toLowerCase() == "get" ? '?request=' + JSON.stringify(data) : ''),
						data:JSON.stringify(data),
						async:false
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
			getErrorMessage: function(output)
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
			},

			/**
			 * Get JSON message of the current function player status.
			 *
			 * @returns a hashcode value based on pair property name-value specified as input parameters
			 */
			getHashcode: function (name, value)
			{
				return JSON.stringify({name:value}).hashCode();
			}
		},

		GUI:
		{
			vars:
			{
				/* Time interval (in ms) to run reference queue */
				timerInterval: 5000,
				/* Timer process id - if this is not null means that the reference queue has been scheduled */
				timerProcessId: null,
				/* Current screen name */
				currentScreen: "#home"
			},

			/**
			 * Display a specific content, showing the corresponding panel.
			 *
			 * @param name panel name to be shown
			 */
			open: function(name)
			{
				console.log("GUI.open(" + name + ")");

				if(MCPi.GUI.vars.currentScreen != name)
				{
					$(MCPi.GUI.vars.currentScreen).collapse('hide');
				}

				MCPi.GUI.vars.currentScreen = name;
				$(MCPi.GUI.vars.currentScreen).collapse('show');
			},

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

				console.log("GUI.onClick(#" + id + ")");
				MCPi.GUI.open("#" + name);
			},

			/**
			 * Write wait spinner control to a specific container and make it unusable until
			 * <code>setWaitOff</code> is called
			 *
			 * @param id div container where new code is appended
			 */
			runWaitOn: function(id)
			{
				var obj, text = '<div class="text-center wait-overlay"><i class="fa fa-spinner fa-spin fa-5x"></i></div>';

                if(id == null) obj = $('body');
                else
                {
                    if(jQuery.type(id) === "string") obj = $(id);
                            else if(jQuery.type(id) === "object") obj = id;
                                else obj = null;
                }

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
			runWaitOff: function(id)
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
			showOkStatus: function(msg)
			{
				$('#brandStatus').html('<i class="fa fa-circle-o-notch fa-spin text-primary"' + (msg != null ? '" title="' + msg + '">' : '>') + '</i>');
			},

			/**
			 * Set 'error' status (and a corresponding graphical sign in navigation bar) when
			 * the transaction has been performed with errors
			 *
			 * @param msg test message to be written as title of the graphical icon
			 */
			showErrorStatus: function(msg)
			{
				$('#brandStatus').html('<i class="fa fa-ban text-danger"' + (msg != null ? '" title="' + msg + '">' : '>') + '</i>');
			},

			/**
			 * This is the MCPi method that is able to refresh/renew the graphical content for all visible GUI objects.
			 * Typically this method is launched by <code>MCPi.init</conde> method into a clock interval sequence.
             *
             * @param workflow define a specific chain workflow and its parametrization in case of you want to run a custom workflow
			 */
			refresh: function(workflow)
			{
				console.log("MCPi.GUI.refresh");
				var remoteControlVisible=false, nowPlayingVisible=false, audioVisible=false, videoVisible=false;

				remoteControlVisible = $('#remoteControlModal').is(":visible");
				nowPlayingVisible = $('#nowPlayingContainer').is(":visible");
				audioVisible = $('#audio').is(":visible");
				videoVisible = $('#video').is(":visible");

				if(remoteControlVisible || nowPlayingVisible || audioVisible || videoVisible)
                {
                    if(workflow == null || workflow.skip == null || workflow.skip == false)
                    {
                        if(workflow != null && workflow.chain != null) MCPi.Player.getId(null,null, {"nextcall":MCPi.Player.getProperties, "chain":workflow.chain});
                           else if(workflow != null && workflow.call != null) workflow.call();
                                else MCPi.Player.getId(null,null, {"nextcall":MCPi.Player.getProperties, "chain":{"nextcall":MCPi.Player.getPlayingItemDetails}});
                    }

                    if(remoteControlVisible) MCPi.RemoteControl.GUI.display();
                    if(nowPlayingVisible) MCPi.Player.GUI.display();
                    //if(audioVisible) MCPi.Player.GUI.display();
                    //if(videoVisible) MCPi.Player.GUI.display();
                }
			}
		},

		/**
		 * Initialize Clue MCPi web interface add-on.
		 */
		init: function()
		{
			console.log("MCPi.init");

			MCPi.GUI.open(this.GUI.vars.currentScreen);
			MCPi.Player.getId(null,null, {"onsuccess":MCPi.Player.getProperties, "chain":{"onsuccess":MCPi.Player.getVolume, "chain":{"onsuccess":MCPi.Player.getPlayingItemDetails}}});

			//schedule GUI refresh method execution.
			if(MCPi.GUI.vars.timerInterval > 0 && MCPi.GUI.vars.timerProcessId == null)
			{
				MCPi.GUI.vars.timerProcessId = setInterval(MCPi.GUI.refresh, MCPi.GUI.vars.timerInterval);
			}
		}
	};

	window.MCPi = MCPi;

	$(function ()
	{
	/* GLOBAL - Register event handlers for Main and System options */
		$(document).on('click', '[data-clickthrough=main]', MCPi.GUI.onClick);
		$(document).on('click', '[data-clickthrough=system]', MCPi.System.GUI.onClick);

	/* REMOTECONTROL - Register event handlers for RemoteControl modal dialog  */
		$('#remoteControlModal').on('show.bs.modal', MCPi.RemoteControl.GUI.open);
		$('#remoteControlModal').on('keydown', jQuery.proxy(MCPi.RemoteControl.GUI.onKeyPress, this));
		$('#remoteControlModal').on('click', '[data-clickthrough=remote]', MCPi.RemoteControl.GUI.onClick);

	/* HOME - Register event handlers for Home screen (panel) */
		$('#home').on('shown.bs.collapse', MCPi.Home.GUI.show);
		$('#home').on('click', '[data-clickthrough=home]', MCPi.Home.GUI.onClick);
		$('#home').on('shown.bs.collapse', '[data-collapse=home]', MCPi.Home.GUI.show);


	/** NOWPLAYING - Register event handlers for NowPlaying panel*/
		$('#nowPlayingContainer').on('show.bs.collapse', MCPi.Player.GUI.show);
		$('#nowPlayingContainer').on('hide.bs.collapse', MCPi.Player.GUI.hide);
        $('#nowPlayingContainer').on('click', '[data-clickthrough=player]', MCPi.Player.GUI.onClick);

		//expand event of recentsongs list from home screen panel
		//$('#recentsongs').on('show.bs.collapse',function (e)
		//{
			//MCPi.home.scope.setLatestSongs();
		//});

		//expand event of recentmovies list from home screen panel
		//$('#recentmovies').on('show.bs.collapse',function (e)
		//{
			//MCPi.home.scope.setLatestMovies();
		//});

		//expand event of recentepisodes list from home screen panel
		$('#recentepisodes').on('show.bs.collapse',function (e)
		{
			//MCPi.home.scope.setLatestEpisodes()
		});

		//expand audio screen panel
		$('#audio').on('show.bs.collapse', function(e)
		{
			//MCPi.music.model.show();
		});

		//collapse audio screen panel
		$('#audio').on('hide.bs.collapse', function(e)
		{
			//MCPi.music.model.hide();
		});

		//sort items from nowplaying queue in music screen
		$('#musicListItems').sortable({items:'div.item', handle:'.media-object'});
		$('#musicListItems').on('sortable:update', function(e)
		{
			if(MCPi.music.vars.fillInNowPlayingQueue == false)
			{
				//MCPi.music.model.onSortNowPlayingQueue();
			}
		});

		//register and then handle the click events for all buttons and links from music screen panel
		//$(document).on('click', '[data-clickthrough=music]', MCPi.music.model.onClick);

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

		//Dedicated code for mobile to collapse navigation bar when click event has been performed
		$(document).on('click','.navbar-collapse.in', function(e)
		{
			if( $(e.target).is('a') && ( $(e.target).attr('class') != 'dropdown-toggle' ) )
			{
				$(this).collapse('hide');
			}
		});

		/** Initialize Clue MCPi WebInterface module */
		MCPi.init();
	})

}(window, jQuery));