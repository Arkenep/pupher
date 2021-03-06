'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.combatGear',
	'myApp.combat',
	'myApp.version',
	'myApp.services',
	'myApp.directives', //for directive example
	'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/combatGear'});

	$routeProvider.when('/combatGear', {
		templateUrl: 'modules/combatGear/combatGear.html',
		controller: 'combatGearCtrl'
	});

	$routeProvider.when('/combat', {
		templateUrl: 'modules/combat/combat.html',
		controller: 'combatCtrl'
	});
}]);
