(function (window)
{
	'use strict';
	var Clue = window.Clue;

	Clue.movies =
	{
		vars:
		{
			visible: false
		},

		scope:
		{
			/**
			 * Initialize control business status
			 */
			init: function()
			{
				//init screen
			},

			/**
			 * Release control status and related details
			 */
			destroy: function()
			{
				//init screen
			},

			/**
			 * Delete automatic refresh (should be called when the screen is made hidden)
			 */
			delRefresh: function()
			{
				//nothing to do
			},

			/**
			 * Set automatic refresh (only one time - immediately after the screen is make it visible)
			 */
			setRefresh: function()
			{
				//nothing to do
			}
		},

		model:
		{
			/**
			 * Prepare controls and GUI details when the screen is open or shown
			 */
			show: function()
			{
				//init screen
			},

			/**
			 * Release controls and GUI details when the screen is become hidden
			 */
			hide: function()
			{
				//init screen
			},

			/**
			 * Run automatic refresh routine. Run action to refresh and rebuild screen content
			 */
			refresh: function()
			{
				//nothing to do
			},

			/**
			 * Check if screen panel is visible
			 *
			 * @returns true if the screen panel is visible
			 */
			isVisible: function()
			{
				return Clue.movies.vars.visible;
			}
		}
	}
}(window));