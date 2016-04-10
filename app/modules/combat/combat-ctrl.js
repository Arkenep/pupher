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

		$scope.turns = turnsSrv;
		
		$scope.character = character;
		$scope.autofail = 6; //needs to be added through input.
		
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
		
		$scope.setActionType = function(action) {
			turnsSrv.currentActionType = action;
		};

		$scope.setAttackType = function(attack) {
			turnsSrv.currentAttackType = attack;
		};
		
		$scope.setLocation = function(location) {
			turnsSrv.currentLocation = location;
		};

		$scope.bonusUsed = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
		};

		$scope.showThis = true;

		$scope.startCombat = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus;
			$scope.hideThis = true;
			$scope.showThis = false;

		};


		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setActionType(turnsSrv.currentActionType);
		$scope.setAttackType(turnsSrv.currentAttackType);
	}]);
