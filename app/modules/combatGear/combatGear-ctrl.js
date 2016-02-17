angular.module('myApp.combatGear', ['ngRoute'])
	.controller('combatGearCtrl', ['$scope', function ($scope) {

		$scope.attributes = {
			STR: 10,
			STA: 10,
			DEX: 10,
			REF: 10,
			PER: 10,
			WIL: 10
		};

		$scope.combatSkills = {
			'Athletics': 0,
			'Evade': 0,
			'Close Quarters': 0,
			'Sword': 0,
			'Axe': 0,
			'Spear': 0,
			'Dagger': 0,
			'Flail': 0,
			'Bow': 0,
			'Throwing': 0,
			'Blunt': 0

		};

		$scope.totalCombatPointsCost = 0;

		var getMultiplierForAttribute = function(num, action) {

			var multiplier;

			if (num <=10) {
				multiplier = 1;
			} else {

				if (action == 'minus') {
					multiplier = Math.trunc((((num - 10) - 1) / 3)+1);
				} else {
					multiplier = Math.trunc(((num - 10) / 3)+1);
				}
			}
			return multiplier;
		};

		var getMultiplierForCombatSkills = function (num, action) {

			var multiplier;

			if (action == 'minus') {
				multiplier = Math.trunc(((num - 1) / 3) + 1);
			} else {
				multiplier = Math.trunc((num / 3) + 1);
			}
			return multiplier;
		};


		$scope.attributeChange = function (attr,action) {
			var attributeValue = $scope.attributes[attr];
			if (action == 'minus') {
				$scope.totalCombatPointsCost = $scope.totalCombatPointsCost + getMultiplierForAttribute(attributeValue, action) * 10;
				$scope.attributes[attr]--;
			} else {
				$scope.totalCombatPointsCost = $scope.totalCombatPointsCost - getMultiplierForAttribute(attributeValue, action) * 10;
				$scope.attributes[attr]++;
			}
		};

		$scope.combatSkillPointChange = function (attr,action) {
			var attributeValue = $scope.combatSkills[attr];
			if (action == 'minus') {
				$scope.totalCombatPointsCost = $scope.totalCombatPointsCost + getMultiplierForCombatSkills(attributeValue, action);
				$scope.combatSkills[attr]--;
			} else {
				$scope.totalCombatPointsCost = $scope.totalCombatPointsCost - getMultiplierForCombatSkills(attributeValue, action);
				$scope.combatSkills[attr]++;
			}
		};


	}]);
