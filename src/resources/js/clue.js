/**
 * JavaScript component for Kodi
 * Dedicated script to load all javascript
 */

(function (document)
{
	"use strict";

	var i,
		script,
		debug = true, /* Set to true to disable cached javascript */
		version = (debug ? Math.random() : '1.0'),
		scripts = [
			"resources/js/libs/jquery.min.js",
			"resources/js/libs/jquery.dnd.js",
			"resources/js/libs/bootstrap.min.js",
			"resources/js/libs/bootstrap.rating.js",
			"resources/js/libs/json2.js",
			"resources/js/streams/global.js",
			"resources/js/streams/player.js",
			"resources/js/streams/remote.js",
			"resources/js/streams/system.js",
			"resources/js/streams/home.js",
			"resources/js/streams/music.js",
			"resources/js/streams/movies.js"
		];

	for (i = 0; i < scripts.length; i += 1)
	{
		script = '<script type="text/javascript" src="';
		script += scripts[i] + '?' + version;
		script += '"><\/script>';
		document.write(script);
	}

	String.prototype.hashCode = function()
	{
		for(var ret = 0, i = 0, len = this.length; i < len; i++)
		{
			ret = (31 * ret + this.charCodeAt(i)) << 0;
		}

		return ret;
	};

	Date.prototype.getTimestamp = function()
	{
		return parseInt((this.getTime()-Date.UTC(1970,0,1))/1000);
	}

}(window.document));