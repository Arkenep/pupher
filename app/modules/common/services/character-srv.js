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
			thrust: true,
			swing: true,
			defaultHands: 2,
			thrustDamage: 4,
			thrustDamagePiercing: 1,
			isActive : false,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Critical.png', name: 'Critical'}
			],
			swingDamage: 5,
			swingDamagePiercing: 0,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Trauma.png', name: 'Trauma'}
			],
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
			thrust: true,
			swing: true,
			defaultHands: 1,
			thrustDamage: 2,
			thrustDamagePiercing: 1,
			isActive : false,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Critical.png', name: 'Critical'}
			],
			swingDamage: 2,
			swingDamagePiercing: -1,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Trauma.png', name: 'Trauma'}
			],
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
			thrust: true,
			swing: false,
			defaultHands: 1,
			thrustDamage: 3,
			thrustDamagePiercing: 1,
			isActive : false,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Critical.png', name: 'Critical'}
			],
			swingDamage: 0,
			swingDamagePiercing: 0,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''}
			],
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
			thrust: false,
			swing: true,
			defaultHands: 2,
			thrustDamage: 0,
			thrustDamagePiercing: 0,
			isActive : false,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''}
			],
			swingDamage: 7,
			swingDamagePiercing: 1,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Trauma.png', name: 'Trauma'}
			],
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
			thrust: false,
			swing: true,
			defaultHands: 1,
			thrustDamage: 0,
			thrustDamagePiercing: 0,
			isActive : false,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''}
			],
			swingDamage: 4,
			swingDamagePiercing: 0,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Trauma.png', name: 'Trauma'},
				{icon: 'Trauma.png', name: 'Trauma'},
				{icon: 'Trauma.png', name: 'Trauma'},
				{icon: 'Critical.png', name: 'Critical'}
			],
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
			thrust: false,
			swing: true,
			defaultHands: 1,
			thrustDamage: 0,
			isActive : false,
			thrustDamagePiercing: 0,
			thrustDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: '', name: ''}
			],
			swingDamage: 3,
			swingDamagePiercing: 1,
			swingDamageEffects: [
				{icon: '', name: ''},
				{icon: '', name: ''},
				{icon: 'Trauma.png', name: 'Trauma'},
				{icon: 'Trauma.png', name: 'Trauma'},
				{icon: 'Bleed.png', name: 'Bleed'},
				{icon: 'Bleed.png', name: 'Bleed'}
			],
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
		thrust: false,
		swing: false,
		defaultHands: 0,
		thrustDamage: 0,
		isActive : false,
		thrustDamagePiercing: 0,
		thrustDamageEffects: [
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''}
		],
		swingDamage: 0,
		swingDamagePiercing: 0,
		swingDamageEffects: [
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''},
			{icon: '', name: ''}
		],
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