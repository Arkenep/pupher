'use strict';

angular.module('myApp.services').service('turnsSrv', ['character', function(character) {
	var turns = {};

	turns.combat = [];
	
	turns.turn = {};

	turns.actions = [];
	
	turns.action = {
		bonusUsed: 0,
		currentAction: {
			name:'Pick',
			type: '',
			weight: 0,
			attackType: '',
			weapon: {}
		},
		type: {
			mainHand: {
				name: 'Main Hand',
				weapon: {}
			},
			offHand: {
				name: 'Offhand',
				weapon: {}
			}
		}
	};
	
	turns.actionStatus = true; //ar cia tikrai palikt? gal deti reiks i turn objekta?
	
	




	
	
	//from here old stuff
	
	turns.currentActionType = 'Pick';
	turns.actionType = [
		{name: 'Main Hand', cost: 0, bonus: 0},
		{name: 'Offhand', cost: 0, bonus: 0}
	];
	
	
	
	
	
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
				{name: 'Forehead', value: 0},
				{name: 'Skull', value: 0},
				{name: 'Face', value: 0},
				{name: 'Neck', value: 0},
				{name: 'Temple', value: 0},
				{name: 'Eye', value: 0}
			]
		},
		{
			name: 'Body',
			bonusAV : -2,
			sublocation: [
				{name: 'Rib Cage', value: 0},
				{name: 'Lungs', value: 0},
				{name: 'Flesh', value: 0},
				{name: 'Liver', value: 0},
				{name: 'Kidney', value: 0},
				{name: 'Heart', value: 0}
			]
		},
		{
			name: 'Right Arm',
			bonusAV : -1,
			sublocation: [
				{name: 'Flesh', value: 0},
				{name: 'Flesh', value: 0},
				{name: 'Muscle', value: 0},
				{name: 'Vein', value: 0},
				{name: 'Palm', value: 0},
				{name: 'Elbow', value: 0}
			]
		},
		{
			name: 'Left Arm',
			bonusAV : -1,
			sublocation: [
				{name: 'Flesh', value: 0},
				{name: 'Flesh', value: 0},
				{name: 'Muscle', value: 0},
				{name: 'Vein', value: 0},
				{name: 'Palm', value: 0},
				{name: 'Elbow', value: 0}
			]
		},
		{
			name: 'Right Leg',
			bonusAV : -1,
			sublocation: [
				{name: 'Flesh', value: 0},
				{name: 'Flesh', value: 0},
				{name: 'Muscle', value: 0},
				{name: 'Vein', value: 0},
				{name: 'Foot', value: 0},
				{name: 'Knee', value: 0}
			]
		},
		{
			name: 'Left leg',
			bonusAV : -1,
			sublocation: [
				{name: 'Flesh', value: 0},
				{name: 'Flesh', value: 0},
				{name: 'Muscle', value: 0},
				{name: 'Vein', value: 0},
				{name: 'Foot', value: 0},
				{name: 'Knee', value: 0}
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
		{name: 'Bleed', icon: 'Bleed.png', value: 0, vigorCost: 1, available: false, max: 0},
		{name: 'Trauma', icon: 'Trauma.png', value: 0, vigorCost: 2, available: false, max: 0},
		{name: 'Critical', icon: 'Critical.png', value: 0, vigorCost: 3, available: false, max: 0}
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
	
	
	return turns;
}]);