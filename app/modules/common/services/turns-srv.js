'use strict';

angular.module('myApp.services').service('turnsSrv', ['character', function(character) {
	var turns = {};

	turns.combat = [];

	turns.endTurn = function () {
		var tempTurn = {};

		angular.copy(turns.thisTurn, tempTurn);

		tempTurn.index = turns.combat.length;
		turns.combat.push(tempTurn);
	};

	turns.spendLuck = function (n) {
		if (character.luck >= n) {
			character.luck -= n;
			return character.luck;
		} else {
			return false;
		}
	}


	
	turns.currentAttackType = 'Pick';
	turns.currentLocation = 'Pick';
	turns.currentSpecial = 'Pick';
	
	turns.finalAVElement = [0, 0, 0, 0, 0];
	turns.vigorEffectsCost = [0, 0, 0, 0, 0];
	
	
	turns.attackType = {
		thrust: 0,
		swing: 0
	};
	
	turns.location = {
		Rnd: 0,
		head: -3,
		body: -2,
		rArm: -1,
		lArm: -1,
		rLeg: -1,
		lLeg: -1
	};

	turns.specials = {
		normal: {bonus: 0, cost: 0},
		hardAttack: {bonus: 2, cost: 2},
		kneel: {bonus: 3, cost: 0},
		fall: {bonus: 5, cost: 0},
		stand: {bonus: -5, cost: 0}
	};
	
	turns.buyDamageEffects = {
		Bleed: {icon: 'Bleed.png', value: 0, vigorCost: 1},
		Trauma: {icon: 'Trauma.png', value: 0, vigorCost: 2},
		Critical: {icon: 'Critical.png', value: 0, vigorCost: 3}
	};

	turns.combatRoll = 0;

	turns.thisTurn = {
		index : 0,
		initiative : 0,
		bonus : 0,
		bonusUsed: 0,
		currentBonus: 0,
		finalAV: 0,
		vigor: 0
	};

	turns.currentActionType = 'Pick';
	turns.actionType = {
		mainHand: {cost: character.mainHandWeapon.weight, bonus: character.mainHandWeapon.type.value},
		offHand: {cost: 0, bonus: 0},
		light: {cost: 1, bonus: 0},
		medium: {cost: 2, bonus: 0},
		heavy: {cost: 3, bonus: 0},
		superHeavy: {cost: 4, bonus: 0}
	};
	
	return turns;
}]);