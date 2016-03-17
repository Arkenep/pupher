angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);

		$scope.autofail = 6;
		$scope.luck = character.luck;

		$scope.activeWeapon = character.weapons[0].name;

		$scope.history = turnsSrv.history;

		$scope.thisTurn = {
			action : [
				{
					type : 'thrust',
					item : 'Axe',
					vigor : 3
				},{
					type : 'swing',
					item : 'Axe',
					vigor : 4
				}
			]
		};

		$scope.resetTurn = function() {
			$scope.thisTurn = {
				action : [
					{
						type : '',
						item : '',
						vigor : 0
					},{
						type : '',
						item : '',
						vigor : 0
					}
				]
			};
		}

		$scope.endTurn = function() {
			turnsSrv.history.push($scope.thisTurn);
			$scope.resetTurn();
		}

		$scope.undoTurn = function() {
			turnsSrv.history.splice(turnsSrv.history.length - 1, 1);
		}

	}]);
