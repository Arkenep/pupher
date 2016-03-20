angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		//console.log(character);
		$scope.autofail = 6;
		$scope.luck = character.luck;

		

		$scope.weapons = character.weapons;
		$scope.mainHandWeapon = {
			name: 'Not Selected',
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
		$scope.offHandWeapon = {
			name: 'Not Selected',
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
		}

		$scope.setOffHandWeapon = function(weapon) {
			$scope.offHandWeapon = weapon;
		}


		
/*
		function weaponSkill(obj) {
			for (var i=0; i < Object.keys(obj).length; i++) {
				if (Object.keys(obj)[i] == $scope.mainHand.type) {



					console.log(Object.keys(obj)[i]);


					return obj; //brudas...
				}
			}
		}

		$scope.mainHandAV = $scope.mainHand.attackValueBonus + character.attributes.REF + weaponSkill(character.combatSkills);
		*/


		//buves active weapon
	/*	function filterActiveWeapon(obj) {

			return obj.isActive;
		}
		$scope.activeWeapons = character.weapons.filter(filterActiveWeapon);

	*/



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
		}

		$scope.endTurn = function() {
			turnsSrv.history.push($scope.thisTurn);
			$scope.resetTurn();
		}

		$scope.undoTurn = function() {
			turnsSrv.history.splice(turnsSrv.history.length - 1, 1);
		}

	}]);
