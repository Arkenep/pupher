angular.module('myApp.combatGear', ['ngRoute'])
	.controller('combatGearCtrl', ['$scope', function ($scope) {

		$scope.attrStr = 10;
		$scope.attrSta = 10;
		$scope.attrDex = 10;
		$scope.attrRef = 10;
		$scope.attrPer = 10;
		$scope.attrWil = 10;
		$scope.combatPoints = 0;

		$scope.pointChangePlusStr = function (attrStr) {

			attrMultiplier = Math.trunc((($scope.attrStr-10)/3)+1);
			attrCost = attrMultiplier*10;
			console.log(attrMultiplier);
			$scope.attrStr++;
			$scope.combatPoints = $scope.combatPoints - attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangeMinusStr = function (attrStr) {

			attrMultiplier = Math.trunc(((($scope.attrStr-10)-1)/3)+1);
			attrCost = attrMultiplier*10;
			console.log(attrMultiplier);
			$scope.attrStr--;
			$scope.combatPoints = $scope.combatPoints + attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangePlusSta = function (attrSta) {

			attrMultiplier = Math.trunc((($scope.attrSta-10)/3)+1);
			attrCost = attrMultiplier*10;
			console.log(attrMultiplier);
			$scope.attrSta++;
			$scope.combatPoints = $scope.combatPoints - attrCost;
			console.log($scope.combatPoints);

		};

		$scope.pointChangeMinusSta = function (attrSta) {

			attrMultiplier = Math.trunc(((($scope.attrSta-10)-1)/3)+1);
			attrCost = attrMultiplier*10;
			console.log(attrMultiplier);
			$scope.attrSta--;
			$scope.combatPoints = $scope.combatPoints + attrCost;
			console.log($scope.combatPoints);

		};

	}]);
