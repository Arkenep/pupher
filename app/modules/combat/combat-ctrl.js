angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);
		$scope.autofail = 6;
		$scope.luck = character.luck;

		$scope.currentMainHandSkill = character.currentMainHandSkill;
		$scope.currentOffHandSkill = character.currentOffHandSkill;

		$scope.characterMHAV = character.characterMHAV;
		$scope.characterMHDV = character.characterMHDV;
		$scope.characterOHAV = character.characterOHAV;
		$scope.characterOHDV = character.characterOHDV;



		$scope.activeSkills = character.combatSkills;
		$scope.weapons = character.weapons;
		$scope.mainHandWeapon = character.mainHandWeapon;
		$scope.offHandWeapon = character.offHandWeapon;

		$scope.setMainHandWeapon = function(weapon) {
			character.mainHandWeapon = weapon;
			$scope.mainHandWeapon = weapon;
		};

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
			$scope.offHandWeapon = weapon;
		};

		$scope.setMHActiveSkill = function(skill) {
			$scope.currentMainHandSkill = skill;
			character.currentMainHandSkill = skill;
			$scope.characterMHAV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.attackValueBonus;
			$scope.characterMHDV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.defenceValueBonus;
			character.characterMHAV = $scope.characterMHAV;
			character.characterMHDV = $scope.characterMHDV;
		};
		
		$scope.setOHActiveSkill = function(skill) {
			$scope.currentOffHandSkill = skill;
			character.currentOffHandSkill = skill;
			$scope.characterOHAV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.attackValueBonus;
			$scope.characterOHDV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.defenceValueBonus;
			character.characterOHAV = $scope.characterOHAV;
			character.characterOHDV = $scope.characterOHDV;
		};
	
		$scope.history = turnsSrv.history;
		
		$scope.thisTurn = {
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

		$scope.resetTurn = function() {
			$scope.thisTurn = {
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
		};

		$scope.endTurn = function() {
			turnsSrv.history.push($scope.thisTurn);
			$scope.resetTurn();
		};

		$scope.undoTurn = function() {
			turnsSrv.history.splice(turnsSrv.history.length - 1, 1);
		}

	}]);
