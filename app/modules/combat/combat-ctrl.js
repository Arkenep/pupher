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
			initiativeCalc();
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
		$scope.setOffHandWeapon(character.offHandWeapon);

		function offHandAV() {
			character.characterOHAV = character.offHandWeapon.type.value + character.attributes.REF + character.offHandWeapon.attackValueBonus -3;
		}
		offHandAV();

		$scope.setMHActiveSkill = function(skill, value) {
			character.mainHandWeapon.type.name = skill;
			character.mainHandWeapon.type.value = value;
			mainHandAV();
			initiativeCalc();
		};
		$scope.setMHActiveSkill(character.mainHandWeapon.type.name, character.mainHandWeapon.type.value);

		$scope.setOHActiveSkill = function(skill, value) {
			character.offHandWeapon.type.name = skill;
			character.offHandWeapon.type.value = value;
			offHandAV();
		};
		$scope.setOHActiveSkill(character.offHandWeapon.type.name, character.offHandWeapon.type.value);

		// not yet setup.
		/*function mainHandDV() {
			character.characterMHDV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.defenceValueBonus;
		}*/

		function setActionTypeOptions(action) {
			if (action == 'offHand') {
				turnsSrv.finalAVElement[4] = character.characterOHAV;
				turnsSrv.vigorEffectsCost[4] = character.offHandWeapon.weight;
				addToFinalAV();
				vigorCost();
			} else {
				turnsSrv.finalAVElement[4] = character.characterMHAV;
				turnsSrv.vigorEffectsCost[4] = character.mainHandWeapon.weight;
				addToFinalAV();
				vigorCost();
			}
		}
		setActionTypeOptions();

		$scope.setActionType = function (action, options) {
			turnsSrv.currentActionType = action;
			setActionTypeOptions(action);
		};

		$scope.setAttackType = function(attack) {
			turnsSrv.currentAttackType = attack;
		};


		$scope.setDamageEffects = function(effect) {
			turnsSrv.currentDamageEffects = effect;
		};

		$scope.setLocation = function(location, value) {
			turnsSrv.currentLocation = value.name;
			turnsSrv.sublocation = value.sublocation;
			turnsSrv.finalAVElement[2] = value.bonusAV;
			addToFinalAV();
		};

		$scope.setSublocation = function(location, value) {
			turnsSrv.sublocationPick = location;
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
			$scope.maxbBonusValue = turnsSrv.thisTurn.bonus;
			addToFinalAV();
		};

		$scope.initBonus = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
		};

		$scope.setCombatRoll = function() {
			turnsSrv.finalAVElement[1] = turnsSrv.combatRoll;
			addToFinalAV();
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

		$scope.calcInit = function() {
			initiativeCalc();
		};

		function initiativeCalc() {
			turnsSrv.thisTurn.initiative = turnsSrv.thisTurn.initiativeRoll + Math.ceil(character.mainHandWeapon.type.value/2) + character.mainHandWeapon.reach + character.attributes.PER;
		}
		initiativeCalc();


		$scope.setAttackType(turnsSrv.currentAttackType);
	}]);
