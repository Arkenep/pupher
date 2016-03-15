angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);

		$scope.autofail = 6;
		$scope.luck = character.luck;

		$scope.activeWeapon = character.weapons[0].name; // galvok blem kaip pasirinkt aktyvu weapona...

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

/*

		var weaponType =  character.weapons[0].type;

		console.log(weaponType);
		console.log(Object.keys(character.combatSkills));


			for ( key in character.combatSkills) {
				var value = character.combatSkills[key];
				var objektoVardas = Object.keys(character.combatSkills);


				console.log(objektoVardas[key]);
				console.log(value);
				if (weaponType == character.combatSkills.)
			}



		$scope.mainhandAV = character.attributes.REF + value; // reikia paimti aktyvu ginkla.
		$scope.mainhandDV = character.attributes.REF + character.combatSkills.Blade;

*/



		//kaip pasirinkti nauja ginkla is turimu combat gear? ar tai popupas ar lentele ar kas turi but kad veiktu ir ant plansetes...

	}]);
