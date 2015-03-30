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
			"resources/js/json2.js",
			"resources/js/mcpi.js",
			"resources/js/pages/player.js",
			"resources/js/pages/remote.js",
			"resources/js/pages/system.js",
			"resources/js/pages/home.js",
			"resources/js/pages/music.js",
			"resources/js/pages/movies.js",
			"resources/js/pages/photos.js"
		];

	for (i = 0; i < scripts.length; i += 1)
	{
		script = '<script type="text/javascript" src="';
		script += scripts[i] + '?' + version;
		script += '"><\/script>';
		document.write(script);
	}

	Array.prototype.unique = function()
	{
		var n = {},r=[];

		for(var i = 0; i < this.length; i++)
		{
			if (!n[this[i]])
			{
				n[this[i]] = true;
				r.push(this[i]);
			}
		}
		return r;
	};
}(window.document))