angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', function ($scope, character) {

		console.log(character);
		$scope.gear = [];

	}]);
