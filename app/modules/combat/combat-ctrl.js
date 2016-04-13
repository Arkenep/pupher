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

		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setAttackType(turnsSrv.currentAttackType);
	}]);
