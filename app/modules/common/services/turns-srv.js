'use strict';

angular.module('myApp.services').service('turnsSrv', function() {
	var turns = {};

	/**
	 * This is history for all turns
	 * @type {Array}
	 */
	turns.history = [];

	return turns;
});