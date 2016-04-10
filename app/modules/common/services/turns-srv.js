'use strict';

angular.module('myApp.services').service('turnsSrv', ['character', function(character) {
	var turns = {};

	turns.combat = [];

	turns.endTurn = function() {
		var tempTurn = {};

		angular.copy(turns.thisTurn, tempTurn);

		tempTurn.index = turns.combat.length;
		turns.combat.push(tempTurn);
	};

	turns.spendLuck = function(n) {
		if(character.luck >= n) {
			character.luck -= n;
			return character.luck;
		} else {
			return false;
		}
	}

	turns.thisTurn = {
		index : 0,
		initiative : 0,
		bonusAV : 0,
		equipment : {
			mainHandWeaponSkill : {
				name: '',
				level: 0
			},
			offHandWeaponSkill : {
				name: '',
				level: 0
			},
			mainHandWeaponAV : 0,
			mainHandWeaponDV : 0,
			offHandWeaponAV : 0,
			offHandWeaponDV : 0
		},
		action : [
			{
				type: '',
				attackType: '',
				bonusAVUsed: 0,
				location: {
					name: '',
					vigorCost: 0
				},
				specials: {
					name: '',
					vigorCost: 0
				},
				effects: {
					name: '',
					vigorCost: 0
				},
				roll: 0,
				finalAV: 0,
				vigor: 0,
				luck: 0,
				sublocation: '',
				damageDone: 0,
				successfulEffects: ''
			},
			{
				type: '',
				attackType: '',
				bonusAVUsed: 0,
				location: {
					name: '',
					vigorCost: 0
				},
				specials: {
					name: '',
					vigorCost: 0
				},
				effects: {
					name: '',
					vigorCost: 0
				},
				roll: 0,
				finalAV: 0,
				vigor: 0,
				luck: 0,
				sublocation: '',
				damageDone: 0,
				successfulEffects: ''
			},
			{
				type: '',
				attackType: '',
				bonusAVUsed: 0,
				location: {
					name: '',
					vigorCost: 0
				},
				specials: {
					name: '',
					vigorCost: 0
				},
				effects: {
					name: '',
					vigorCost: 0
				},
				roll: 0,
				finalAV: 0,
				vigor: 0,
				luck: 0,
				sublocation: '',
				damageDone: 0,
				successfulEffects: ''
			},
			{
				type: '',
				attackType: '',
				bonusAVUsed: 0,
				location: {
					name: '',
					vigorCost: 0
				},
				specials: {
					name: '',
					vigorCost: 0
				},
				effects: {
					name: '',
					vigorCost: 0
				},
				roll: 0,
				finalAV: 0,
				vigor: 0,
				luck: 0,
				sublocation: '',
				damageDone: 0,
				successfulEffects: ''
			}
		]
	};

	return turns;
}]);