angular.module('myApp.combatGear', ['ngRoute'])
	.controller('combatGearCtrl', ['$scope', function ($scope) {

		$scope.attrStr = 10;
		$scope.attrSta = 10;
		$scope.attrDex = 10;
		$scope.attrRef = 10;
		$scope.attrPer = 10;
		$scope.attrWil = 10;
		$scope.combatPoints = 0;

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

		//cia reiks sukist kai padarysiu PLIUSA
		$scope.attrMultiplierPlus = function (attr) {
			if (attr <= 10) {
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
		//iki cia


		$scope.pointChangePlus = function (attr) {
			attrMultiplierPlus = function (attr) {
				if (attr <= 10) {
					multiplier = 1;
					return(multiplier);
				} else {
					multiplier = Math.trunc(((attr - 10) / 3) + 1);
					return(multiplier);
				}
			};
			console.log("multiplieris",attrMultiplierPlus(attr));
			attrCost = attrMultiplierPlus(attr)*10;
			attr++;
			$scope.combatPoints = $scope.combatPoints - attrCost;
			console.log("atributas dabar",attr);
			console.log("taskai",$scope.combatPoints);
			return($scope.attr=attr); //ka cia blem turi grazint, NESUPRANTU KAIP PASIIMTI attrSTR pvz gal kazka tokio $scope. + attr????

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
