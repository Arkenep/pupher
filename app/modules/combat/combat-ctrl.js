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
			for (var i=0; i<Object.keys(character.combatSkills).length; i++) {
				skill = Object.keys(character.combatSkills)[i];
				if (character.mainHandWeapon.type.name == skill) {
					character.mainHandWeapon.type.value = character.combatSkills[skill];
				}
			}
			mainHandAV();
		};
		$scope.setMainHandWeapon(character.mainHandWeapon);

		function mainHandAV() {
			character.characterMHAV = character.mainHandWeapon.type.value + character.attributes.REF + character.mainHandWeapon.attackValueBonus;
		}
		mainHandAV();

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
			for (var i=0; i<Object.keys(character.combatSkills).length; i++) {
				skill = Object.keys(character.combatSkills)[i];
				if (character.offHandWeapon.type.name == skill) {
					character.offHandWeapon.type.value = character.combatSkills[skill];
				}
			}
			offHandAV();
		};
		$scope.setMainHandWeapon(character.offHandWeapon);

		function offHandAV() {
			character.characterOHAV = character.offHandWeapon.type.value + character.attributes.REF + character.offHandWeapon.attackValueBonus;
		}
		offHandAV();
		
		$scope.setMHActiveSkill = function(skill, value) {
			character.mainHandWeapon.type.name = skill;
			character.mainHandWeapon.type.value = value;
			mainHandAV();
		};
		$scope.setMHActiveSkill(character.mainHandWeapon.type.name, character.mainHandWeapon.type.value);

		$scope.setOHActiveSkill = function(skill, value) {
			character.offHandWeapon.type.name = skill;
			character.offHandWeapon.type.value = value;
			offHandAV();
		};
		$scope.setOHActiveSkill(character.offHandWeapon.type.name, character.offHandWeapon.type.value);

		// not yet setup.
		function mainHandDV() {
			character.characterMHDV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.defenceValueBonus;
		}


		$scope.setActionType = function(action, options) {
			turnsSrv.currentActionType = action;
			turnsSrv.finalAVElement[4] = options.bonus;
			addToFinalAV();
			turnsSrv.vigorEffectsCost[4] = options.cost;
			vigorCost();
		};

		$scope.setAttackType = function(attack) {
			turnsSrv.currentAttackType = attack;
		};
		
		$scope.setDamageEffects = function(effect) {
			turnsSrv.currentDamageEffects = effect;
		};

		$scope.setLocation = function(location, value) {
			turnsSrv.currentLocation = location;
			turnsSrv.finalAVElement[2] = value;
			addToFinalAV();
		};
		$scope.setSpecial = function(special, options) {
			turnsSrv.currentSpecial = special;
			turnsSrv.finalAVElement[3] = options.bonus;
			addToFinalAV();
			turnsSrv.vigorEffectsCost[3] = options.cost;
			vigorCost();
		};

		$scope.bonusUsed = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
			turnsSrv.finalAVElement[0] = turnsSrv.thisTurn.bonusUsed;
			addToFinalAV();
		};

		$scope.setCombatRoll = function() {
			turnsSrv.finalAVElement[1] = turnsSrv.combatRoll;
			addToFinalAV();
		};

		$scope.showThis = true;

		$scope.startCombat = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus;
			$scope.hideThis = true;
			$scope.showThis = false;
		};

		function addToFinalAV() {
			turnsSrv.thisTurn.finalAV = turnsSrv.finalAVElement[0] + turnsSrv.finalAVElement[1] + turnsSrv.finalAVElement[2] + turnsSrv.finalAVElement[3] + turnsSrv.finalAVElement[4];
		}

		function vigorCost() {
			turnsSrv.thisTurn.vigor = turnsSrv.vigorEffectsCost[0] + turnsSrv.vigorEffectsCost[1] + turnsSrv.vigorEffectsCost[2] + turnsSrv.vigorEffectsCost[3] + turnsSrv.vigorEffectsCost[4];
		}

		$scope.vigorDamageEffectsCost = function (effect, index) {
			turnsSrv.vigorEffectsCost[index] = effect.value * effect.vigorCost;
			vigorCost();
		};

		//$scope.setMHActiveSkill(character.currentMainHandSkill);
		//$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setAttackType(turnsSrv.currentAttackType);
	}]);
