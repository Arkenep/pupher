angular.module('myApp.combatGear', ['ngRoute'])
	.controller('combatGearCtrl', ['$scope', function ($scope) {

		$scope.attrStr = 10;
		$scope.attrSta = 10;
		$scope.attrDex = 10;
		$scope.attrRef = 10;
		$scope.attrPer = 10;
		$scope.attrWil = 10;
		$scope.combatPoints = 0;

		$scope.attrMultiplierPlus = function (attr) {
			if (attr = 9) {
				multiplier = 1;
				return(multiplier);
			} else {
				multiplier = Math.trunc(((attr - 10) / 3) + 1);
				return(multiplier);
			}
		};
		$scope.attrMultiplierMinus = function (attr) {
			if (attr <= 10) {
				multiplier = 1;
				return(multiplier);
			} else {
				multiplier = Math.trunc((((attr - 10)-1) / 3) + 1);
				return(multiplier);
			}
		};

		$scope.pointChangePlusStr = function () {
			attrCost = $scope.attrMultiplierPlus($scope.attrStr)*10;
			console.log($scope.attrMultiplierPlus($scope.attrStr));
			$scope.attrStr++;
			$scope.combatPoints = $scope.combatPoints - attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangeMinusStr = function () {
			attrCost = $scope.attrMultiplierMinus($scope.attrStr)*10;
			console.log($scope.attrMultiplierMinus($scope.attrStr));
			$scope.attrStr--;
			$scope.combatPoints = $scope.combatPoints + attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangePlusSta = function () {
			attrCost = $scope.attrMultiplierPlus($scope.attrSta)*10;
			console.log($scope.attrMultiplierPlus($scope.attrSta));
			$scope.attrSta++;
			$scope.combatPoints = $scope.combatPoints - attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangeMinusSta = function () {
			attrCost = $scope.attrMultiplierMinus($scope.attrSta)*10;
			console.log($scope.attrMultiplierMinus($scope.attrSta));
			$scope.attrSta--;
			$scope.combatPoints = $scope.combatPoints + attrCost;
			console.log($scope.combatPoints);

		};

	}]);
