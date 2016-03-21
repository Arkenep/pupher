angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);
		$scope.autofail = 6;
		$scope.luck = character.luck;

		$scope.currentMainHandSkill = 'Not Selected';
		$scope.currentOffHandSkill = 'Not Selected';
		
		$scope.activeSkills = character.combatSkills;
		$scope.weapons = character.weapons;
		$scope.mainHandWeapon = character.weapons[0];
		$scope.offHandWeapon = {
			name: 'Empty',
			type: '',
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

		$scope.setMainHandWeapon = function(weapon) {
			$scope.mainHandWeapon = weapon;
		};

		$scope.setOffHandWeapon = function(weapon) {
			$scope.offHandWeapon = weapon;
		};

		$scope.setMHActiveSkill = function(skill) {
			$scope.currentMainHandSkill = skill;
			$scope.characterMHAV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.attackValueBonus;
			$scope.characterMHDV = character.combatSkills[skill] + character.attributes.REF + $scope.mainHandWeapon.defenceValueBonus;
		};

		$scope.setOHActiveSkill = function(skill) {
			$scope.currentOffHandSkill = skill;
			$scope.characterOHAV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.attackValueBonus;
			$scope.characterOHDV = character.combatSkills[skill] + character.attributes.REF + $scope.offHandWeapon.defenceValueBonus;
		};
	
		$scope.history = turnsSrv.history;

		$scope.thisTurn = {
			action : [
				{
					type : 'thrust',
					item : 'Axe',
					vigor : 3
				},{
					type : 'swing',
					item : 'Axe',
					vigor : 4
				}
			]
		};

		$scope.resetTurn = function() {
			$scope.thisTurn = {
				action : [
					{
						type : '',
						item : '',
						vigor : 0
					},{
						type : '',
						item : '',
						vigor : 0
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
