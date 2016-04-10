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

		$scope.character = character; //cia susitrumpina ir reikia pareiti per visus sh kuriuos levai apsirasiau.

		//console.log(character);
		$scope.autofail = 6;
		//$scope.luck = character.luck;

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

		};

		$scope.setOHActiveSkill = function(skill) {
			$scope.currentOffHandSkill = skill;
			character.currentOffHandSkill = skill;
			$scope.characterOHAV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.attackValueBonus;
			$scope.characterOHDV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.defenceValueBonus;

		};

		$scope.setMHActiveSkill(character.currentMainHandSkill);

	}]);
