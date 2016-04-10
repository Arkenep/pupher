angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		$scope.endTurn = function() {
			turnsSrv.endTurn();
		};

		$scope.spendLuck = function(n) {
			if(turnsSrv.spendLuck(n)) {
				console.log(n + " luck has been spent");
			} else {
				console.log(n + " no luck pal");
			}
		};

		$scope.character = character;
		
		$scope.autofail = 6;
		
		$scope.setMainHandWeapon = function(weapon) {
			character.mainHandWeapon = weapon;
		};

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
		};

		$scope.setMHActiveSkill = function(skill) {
			character.currentMainHandSkill = skill;
			character.characterMHAV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.attackValueBonus;
			character.characterMHDV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.defenceValueBonus;
		};

		$scope.setOHActiveSkill = function(skill) {
			character.currentOffHandSkill = skill;
			character.characterOHAV = character.combatSkills[skill] + character.attributes.REF + character.offHandWeapon.attackValueBonus;
			character.characterOHDV = character.combatSkills[skill] + character.attributes.REF + character.offHandWeapon.defenceValueBonus;
		};

		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setOHActiveSkill(character.currentOffHandSkill);
	}]);
