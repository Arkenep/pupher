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

		$scope.totalAttributesCost = 0;

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

		$scope.pointChange = function (attr,action) {
			var attributeValue = $scope.attributes[attr];
			if (action == 'minus') {
				$scope.totalAttributesCost = $scope.totalAttributesCost + getMultiplierForAttribute(attributeValue, action) * 10;
				$scope.attributes[attr]--;
			} else {
				$scope.totalAttributesCost = $scope.totalAttributesCost - getMultiplierForAttribute(attributeValue, action) * 10;
				$scope.attributes[attr]++;
			}
		};

	}]);
