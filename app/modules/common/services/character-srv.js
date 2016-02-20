'use strict';

angular.module('myApp.services', []).service('character', function() {
	var profile, attributes, combatSkills, weapons, shields;

	attributes = {
		STR: 10,
		STA: 10,
		DEX: 10,
		REF: 10,
		PER: 10,
		WIL: 10
	};

	combatSkills = {
		'Athletics': 0,
		'Evade': 0,
		'Close Quarters': 0,
		'Blade': 0,
		'Axe': 0,
		'Spear': 0,
		'Dagger': 0,
		'Flail': 0,
		'Bow': 0,
		'Throwing': 0,
		'Blunt': 0

	};

	weapons = [
		{
			name: 'Long Sword',
			type: 'Blade',
			thrustDamage: 4,
			thrustDamagePiercing: 1,
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
			name: 'Axe',
			Type: 'Unbalanced',
			thrustDamage: 0,
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

	profile =  {
		attributes : attributes,
		weapons : weapons,
		shields: shields,
		combatSkills : combatSkills

	};

	return profile;
});