'use strict';

angular.module('myApp.services').service('character', function() {
	var profile, attributes, combatSkills, weapons, shields, armor;

	attributes = {
		STR: 10,
		STA: 10,
		DEX: 10,
		REF: 10,
		PER: 10,
		WIL: 10
	};

	combatSkills = {
		Athletics: 0,
		Evade: 0,
		CloseQuarters: 0,
		Blade: 0,
		Unbalanced: 0,
		Spear: 0,
		Dagger: 0,
		Flail: 0,
		Bow: 0,
		Throwing: 0
	};
	
	weapons = [
		{
			name: 'Long Sword',
			type: {name: 'Blade', value: 0},
			attackWeight: 'Heavy',
			attackType: [
				{
					name: 'Thrust', 
					value: true,
					damage: 4,
					piercing: 1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Critical.png', name: 'Critical'}
					]
				},
				{
					name: 'Swing', 
					value: true,
					damage: 5,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Trauma.png', name: 'Trauma'}
					]
				}
			],
			defaultHands: 2,
			STRRequired: 12,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 3,
			reach: 2
		},
		{
			name: 'Short Sword',
			type: {name: 'Blade', value: 0},
			attackWeight: 'Light',
			attackType: [
				{
					name: 'Thrust',
					value: true,
					damage: 2,
					piercing: 1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Critical.png', name: 'Critical'}
					]
				},
				{
					name: 'Swing',
					value: true,
					damage: 2,
					piercing: -1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Trauma.png', name: 'Trauma'}
					]
				}
			],
			defaultHands: 1,
			STRRequired: 9,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 1,
			reach: 1
		},
		{
			name: 'Spear',
			type: {name: 'Spear', value: 0},
			attackWeight: 'Medium',
			attackType: [
				{
					name: 'Thrust',
					value: true,
					damage: 3,
					piercing: 1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Critical.png', name: 'Critical'}
					]
				},
				{
					name: 'Swing',
					value: false,
					damage: 0,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''}
					]
				}
			],
			defaultHands: 1,
			STRRequired: 10,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 2,
			reach: 2
		},
		{
			name: 'Great Axe',
			type: {name: 'Unbalanced', value: 0},
			attackWeight: 'Super Heavy',
			attackType: [
				{
					name: 'Thrust',
					value: false,
					damage: 0,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''}
					]
				},
				{
					name: 'Swing',
					value: true,
					damage: 7,
					piercing: 1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Trauma.png', name: 'Trauma'}
					]
				}
			],
			defaultHands: 2,
			STRRequired: 13,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 4,
			reach: 2
		},
		{
			name: 'Mace',
			type: {name: 'Unbalanced', value: 0},
			attackWeight: 'Medium',
			attackType: [
				{
					name: 'Thrust',
					value: false,
					damage: 0,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''}
					]
				},
				{
					name: 'Swing',
					value: true,
					damage: 4,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Trauma.png', name: 'Trauma'},
						{icon: 'Trauma.png', name: 'Trauma'},
						{icon: 'Trauma.png', name: 'Trauma'},
						{icon: 'Critical.png', name: 'Critical'}
					]
				}
			],
			defaultHands: 1,
			STRRequired: 11,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 2,
			reach: 1
		},
		{
			name: 'Axe',
			type: {name: 'Unbalanced', value: 0},
			attackWeight: 'Medium',
			attackType: [
				{
					name: 'Thrust',
					value: false,
					damage: 0,
					piercing: 0,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: '', name: ''}
					]
				},
				{
					name: 'Swing',
					value: true,
					damage: 3,
					piercing: 1,
					effects: [
						{icon: '', name: ''},
						{icon: '', name: ''},
						{icon: 'Trauma.png', name: 'Trauma'},
						{icon: 'Trauma.png', name: 'Trauma'},
						{icon: 'Bleed.png', name: 'Bleed'},
						{icon: 'Bleed.png', name: 'Bleed'}
					]
				}
			],
			defaultHands: 1,
			STRRequired: 11,
			attackValueBonus: 0,
			defenceValueBonus: 0,
			weight: 2,
			reach: 1
		}
	];

	shields = [
		{
			name: 'Large Shield',
			type: 'largeShield',
			damage: 5,
			damagePiercing: 0,
			defense: 3,
			hp: 10,
			breakValue: 3,
			attackValueBonus: 0,
			defenceValueBonus: 0
		},
		{
			name: 'Buckler',
			type: 'smallShield',
			damage: 2,
			damagePiercing: 0,
			defense: 1,
			hp: 8,
			breakValue: 3,
			attackValueBonus: 0,
			defenceValueBonus: 0
		}
	];

	armor = {
		head : {
			armor  : 0,
			weight : 0
		},
		body : {
			armor  : 0,
			weight : 0
		},
		larm : {
			armor  : 0,
			weight : 0
		},
		rarm : {
			armor  : 0,
			weight : 0
		},
		lleg : {
			armor  : 0,
			weight : 0
		},
		rleg : {
			armor  : 0,
			weight : 0
		}
	};

	var currentMainHandSkill = 'Not Selected';
	var currentOffHandSkill = 'Not Selected';
	var mainHandWeapon = {
		name: 'None',
		type: {name: 'None', value: 0},
		attackWeight: '',
		attackType: [
			{
				name: 'Thrust',
				value: false,
				damage: 0,
				piercing: 0,
				effects: [
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''}
				]
			},
			{
				name: 'Swing',
				value: false,
				damage: 0,
				piercing: 0,
				effects: [
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''},
					{icon: '', name: ''}
				]
			}
		],
		defaultHands: 0,
		STRRequired: 0,
		attackValueBonus: 0,
		defenceValueBonus: 0,
		weight: 0,
		reach: 0
	};
	var emptyWeapon = mainHandWeapon;
	var offHandWeapon = mainHandWeapon;
		
	var resetWeapon = mainHandWeapon;
	var characterMHAV = 0;
	var characterMHDV = 0;
	var characterOHAV = 0;
	var characterOHDV = 0;
	
	profile =  {
		attributes : attributes,
		weapons : weapons,
		shields: shields,
		combatSkills : combatSkills,
		luck : 12,
		armor : armor,
		currentMainHandSkill : currentMainHandSkill,
		currentOffHandSkill : currentOffHandSkill,
		mainHandWeapon: mainHandWeapon,
		offHandWeapon: offHandWeapon,
		resetWeapon: resetWeapon,
		emptyWeapon: emptyWeapon,
		characterMHAV: characterMHAV,
		characterMHDV: characterMHDV,
		characterOHAV: characterOHAV,
		characterOHDV: characterOHDV
	};

	return profile;
});