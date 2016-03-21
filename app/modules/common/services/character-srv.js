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
			type: 'Blade',
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
			type: 'Blade',
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
			type: 'Spear',
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
			name: 'Mace',
			type: 'Unbalanced',
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
			Type: 'Unbalanced',
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

	profile =  {
		attributes : attributes,
		weapons : weapons,
		shields: shields,
		combatSkills : combatSkills,
		luck : 12,
		armor : armor
	};

	return profile;
});