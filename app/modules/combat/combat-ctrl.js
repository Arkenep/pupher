angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', function ($scope, character) {

		console.log(character);

		$scope.autofail = 6;
		$scope.luck = 10;

		$scope.mainhandAV = character.attributes.REF + character.combatSkills.Blade; // reikia paimti aktyvu ginkla.
		$scope.mainhandDV = character.attributes.REF + character.combatSkills.Blade;
		$scope.activeWeapon = character.weapons[0]; // galvok blem kaip pasirinkt aktyvu weapona...
		//kaip pasirinkti nauja ginkla is turimu combat gear? ar tai popupas ar lentele ar kas turi but kad veiktu ir ant plansetes...

	}]);
