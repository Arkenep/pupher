angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);
		$scope.autofail = 6;
		$scope.luck = character.luck;

		$scope.currentMainHandSkill = character.currentMainHandSkill;
		$scope.currentOffHandSkill = character.currentOffHandSkill;

		$scope.characterMHAV = character.characterMHAV;
		$scope.characterMHDV = character.characterMHDV;
		$scope.characterOHAV = character.characterOHAV;
		$scope.characterOHDV = character.characterOHDV;



		$scope.activeSkills = character.combatSkills;
		$scope.weapons = character.weapons;
		$scope.mainHandWeapon = character.mainHandWeapon;
		$scope.offHandWeapon = character.offHandWeapon;

		$scope.setMainHandWeapon = function(weapon) {
			character.mainHandWeapon = weapon;
			$scope.mainHandWeapon = weapon;
		};

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
			$scope.offHandWeapon = weapon;
		};

		$scope.setMHActiveSkill = function(skill) {
			$scope.currentMainHandSkill = skill;
			character.currentMainHandSkill = skill;
			$scope.characterMHAV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.attackValueBonus;
			$scope.characterMHDV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.defenceValueBonus;
			character.characterMHAV = $scope.characterMHAV;
			character.characterMHDV = $scope.characterMHDV;
		};
		
		$scope.setOHActiveSkill = function(skill) {
			$scope.currentOffHandSkill = skill;
			character.currentOffHandSkill = skill;
			$scope.characterOHAV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.attackValueBonus;
			$scope.characterOHDV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.defenceValueBonus;
			character.characterOHAV = $scope.characterOHAV;
			character.characterOHDV = $scope.characterOHDV;
		};
	
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
		};

		$scope.endTurn = function() {
			turnsSrv.history.push($scope.thisTurn);
			$scope.resetTurn();
		};

		$scope.undoTurn = function() {
			turnsSrv.history.splice(turnsSrv.history.length - 1, 1);
		}

		$scope.initiative = 0;
		$scope.bonusCombatAV = 0;









	}]);
