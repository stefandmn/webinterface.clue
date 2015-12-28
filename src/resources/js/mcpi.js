/**
 * JavaScript component for MCPi
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
			"resources/js/jquery.min.js",
			"resources/js/jquery.dnd.js",
			"resources/js/bootstrap.min.js",
			"resources/js/bootstrap.rating.js",
			"resources/js/json2.js",
			"resources/js/areas/global.js",
			"resources/js/areas/player.js",
			"resources/js/areas/remote.js",
			"resources/js/areas/system.js",
			"resources/js/areas/home.js",
			"resources/js/areas/music.js",
			"resources/js/areas/movies.js"
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