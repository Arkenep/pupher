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
	
	
	turns.attackType = [
		{name: 'Thrust', value: false},
		{name: 'Swing', value: false}
	];

	turns.weaponHands = 1;

	turns.sublocation = 'Pick';
	turns.sublocationPick = 'Pick';
	turns.location = [
		{
			name: 'Random',
			bonusAV : 0,
			sublocation: [
				{name: 'Head', value: 0},
				{name: 'Body', value: 0},
				{name: 'Right Arm', value: 0},
				{name: 'Left Arm', value: 0},
				{name: 'Right Leg', value: 0},
				{name: 'Left Leg', value: 0}
			]
		},
		{
			name: 'Head',
			bonusAV : -3, 
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		},
		{
			name: 'Body',
			bonusAV : -2,
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		},
		{
			name: 'Right Arm',
			bonusAV : -1,
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		},
		{
			name: 'Left Arm',
			bonusAV : -1,
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		},
		{
			name: 'Right Leg',
			bonusAV : -1,
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		},
		{
			name: 'Left leg',
			bonusAV : -1,
			sublocation: [
				{name: 'Vieta 1', value: 0},
				{name: 'Vieta 2', value: 0},
				{name: 'Vieta 3', value: 0},
				{name: 'Vieta 4', value: 0},
				{name: 'Vieta 5', value: 0},
				{name: 'Vieta 6', value: 0}
			]
		}
	];

	turns.specials = [
		{name: 'Normal', bonus: 0, cost: 0},
		{name: 'Hard Attack', bonus: 2, cost: 2},
		{name: 'Kneel', bonus: 3, cost: 0},
		{name: 'Fall', bonus: 5, cost: 0},
		{name: 'Stand', bonus: -5, cost: 0}
	];
	
	turns.buyDamageEffects = [
		{name: 'Bleed', icon: 'Bleed.png', value: 0, vigorCost: 1},
		{name: 'Trauma', icon: 'Trauma.png', value: 0, vigorCost: 2},
		{name: 'Critical', icon: 'Critical.png', value: 0, vigorCost: 3}
	];

	turns.combatRoll = 0;

	turns.thisTurn = {
		index : 0,
		initiative : 0,
		initiativeRoll : 0,
		bonus : 0,
		bonusUsed: 0,
		currentBonus: 0,
		finalAV: 0,
		vigor: 0,
		damage: 0,
		piercing: 0,
		weaponEffects: {},
		availableEffects: [0,0,0],
		maxEffects: 0,
		finalEffects: 1,
		currentEffects: [0,0,0],
		effects: [
			{name: 'Bleed', icon: 'Bleed.png', value: 0},
			{name: 'Trauma', icon: 'Trauma.png', value: 0},
			{name: 'Critical', icon: 'Critical.png', value: 0}
		]
	};
	
	turns.activeWeaponEffectRoll = 0;
	turns.activeWeaponEffect = [0,0,0];
	turns.attackWeapon = {};
	turns.currentActionType = 'Pick';
	turns.actionType = [
		{name: 'Main Hand', cost: 0, bonus: 0},
		{name: 'Offhand', cost: 0, bonus: 0}
	];
	
	return turns;
}]);