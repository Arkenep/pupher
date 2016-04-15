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
	};
	
	turns.currentAttackType = 'Pick';
	turns.currentLocation = 'Pick';
	turns.currentSpecial = 'Pick';
	
	turns.finalAVElement = [0, 0, 0, 0, 0];
	turns.vigorEffectsCost = [0, 0, 0, 0, 0];
	
	
	turns.attackType = {
		thrust: 0,
		swing: 0
	};
	
	turns.sublocation = 'Pick';
	turns.sublocationPick = 'Pick';
	turns.location = {
		rnd: {
			name: 'Random',
			bonusAV : 0,
			sublocation: {
				'Head': 0,
				'Body': 0,
				'Right Arm': 0,
				'Left Arm': 0,
				'Right Leg': 0,
				'Left Leg': 0
			}
		},
		head: {
			name: 'Head',
			bonusAV : -3, 
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		},
		body: {
			name: 'Body',
			bonusAV : -2,
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		},
		rArm: {
			name: 'Right Arm',
			bonusAV : -1,
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		},
		lArm: {
			name: 'Left Arm',
			bonusAV : -1,
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		},
		rLeg: {
			name: 'Right Leg',
			bonusAV : -1,
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		},
		lLeg: {
			name: 'Left Leg',
			bonusAV : -1,
			sublocation: {
				vieta1: 0,
				vieta2: 0,
				vieta3: 0,
				vieta4: 0,
				vieta5: 0,
				vieta6: 0
			}
		}
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
		initiativeRoll : 0,
		bonus : 0,
		bonusUsed: 0,
		currentBonus: 0,
		finalAV: 0,
		vigor: 0
	};

	turns.currentActionType = 'Pick';
	turns.actionType = {
		mainHand: {cost: 0, bonus: 0},
		offHand: {cost: 0, bonus: 0}
	};
	
	return turns;
}]);