angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {
/* SARO STUFF KOL KAS NEPANAUDOTAS
		$scope.endTurn = function() {
			turnsSrv.endTurn();
		};

		$scope.spendLuck = function(n) {
			if(turnsSrv.spendLuck(n)) {
				console.log(n + " luck has been spent");
			} else {
				console.log(n + " no luck pal");
			}
		};*/
		$scope.turns = turnsSrv;
		$scope.character = character;
		
		$scope.autofail = 6; //needs to be added through input.

		$scope.setMainHandWeapon = function(weapon) {
			character.mainHandWeapon = weapon;
			for (var i=0; i<Object.keys(character.combatSkills).length; i++) {
				skill = Object.keys(character.combatSkills)[i];
				if (character.mainHandWeapon.type.name == skill) {
					character.mainHandWeapon.type.value = character.combatSkills[skill];
				}
			}
			turnsSrv.weaponHands = character.mainHandWeapon.defaultHands;
			if (turnsSrv.weaponHands == 2) {
				turnsSrv.currentActionType = turnsSrv.actionType[0].name;
			}
			mainHandAV();
			initiativeCalc();
			setActionTypeOptions();
		};
		$scope.setMainHandWeapon(character.mainHandWeapon);

		function mainHandAV() {
			character.characterMHAV = character.mainHandWeapon.type.value + character.attributes.REF + character.mainHandWeapon.attackValueBonus;
		}
		mainHandAV();

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
			for (var i=0; i<Object.keys(character.combatSkills).length; i++) {
				skill = Object.keys(character.combatSkills)[i];
				if (character.offHandWeapon.type.name == skill) {
					character.offHandWeapon.type.value = character.combatSkills[skill];
				}
			}
			offHandAV();
			setActionTypeOptions();

		};
		$scope.setOffHandWeapon(character.offHandWeapon);

		function offHandAV() {
			character.characterOHAV = character.offHandWeapon.type.value + character.attributes.REF + character.offHandWeapon.attackValueBonus -3;
		}
		offHandAV();

		$scope.setMHActiveSkill = function(skill, value) {
			character.mainHandWeapon.type.name = skill;
			character.mainHandWeapon.type.value = value;
			mainHandAV();
			initiativeCalc();
		};
		$scope.setMHActiveSkill(character.mainHandWeapon.type.name, character.mainHandWeapon.type.value);

		$scope.setOHActiveSkill = function(skill, value) {
			character.offHandWeapon.type.name = skill;
			character.offHandWeapon.type.value = value;
			offHandAV();
		};
		$scope.setOHActiveSkill(character.offHandWeapon.type.name, character.offHandWeapon.type.value);

		turnsSrv.weaponHands = 0;
		$scope.hands = function () {
			if ( turnsSrv.weaponHands == 1) {
				turnsSrv.weaponHands = 2;
				turnsSrv.currentActionType = turnsSrv.actionType[0].name;
				setActionTypeOptions();
			} else {
				turnsSrv.weaponHands = 1;
				turnsSrv.currentActionType = 'Pick';
				
			}
		};

	

		// not yet setup.
		/*function mainHandDV() {
			character.characterMHDV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.defenceValueBonus;
		}*/
		
		

		function setActionTypeOptions(action) {
			if (action == 'Offhand') {
				offHandWeaponPick();
			} else {
				mainHandWeaponPick();
			}
		}
		setActionTypeOptions();

		function offHandWeaponPick() {
			turnsSrv.finalAVElement[4] = character.characterOHAV;
			turnsSrv.vigorEffectsCost[4] = character.offHandWeapon.weight;
			turnsSrv.attackWeapon = character.offHandWeapon;
			turnsSrv.attackType[0].value = turnsSrv.attackWeapon.thrust;
			turnsSrv.attackType[1].value = turnsSrv.attackWeapon.swing;
			if(turnsSrv.attackType[0].value){
				turnsSrv.currentAttackType = turnsSrv.attackType[0].name;
				selectAttackType(turnsSrv.attackType[0])
			} else {
				turnsSrv.currentAttackType = turnsSrv.attackType[1].name;
				selectAttackType(turnsSrv.attackType[1])
			}
			addToFinalAV();
			vigorCost();
		}

		function mainHandWeaponPick() {
			turnsSrv.finalAVElement[4] = character.characterMHAV;
			turnsSrv.vigorEffectsCost[4] = character.mainHandWeapon.weight;
			turnsSrv.attackWeapon = character.mainHandWeapon;
			turnsSrv.attackType[0].value = turnsSrv.attackWeapon.thrust;
			turnsSrv.attackType[1].value = turnsSrv.attackWeapon.swing;
			if(turnsSrv.attackType[0].value){
				turnsSrv.currentAttackType = turnsSrv.attackType[0].name;
				selectAttackType(turnsSrv.attackType[0])
			} else {
				turnsSrv.currentAttackType = turnsSrv.attackType[1].name;
				selectAttackType(turnsSrv.attackType[1])
			}
			addToFinalAV();
			vigorCost();
		}



		$scope.setActionType = function (action) {
			turnsSrv.currentActionType = action.name;
			setActionTypeOptions(action.name);
		};

		$scope.setAttackType = function(type) {
			turnsSrv.currentAttackType = type.name;
			selectAttackType(type);
		};

		function selectAttackType(type) {
			if (type.name == 'Thrust') {
				turnsSrv.thisTurn.damage = turnsSrv.attackWeapon.thrustDamage;
				turnsSrv.thisTurn.piercing = turnsSrv.attackWeapon.thrustDamagePiercing;
				turnsSrv.thisTurn.weaponEffects = turnsSrv.attackWeapon.thrustDamageEffects;
				disableUnavailableEffects();
			} else {
				turnsSrv.thisTurn.damage = turnsSrv.attackWeapon.swingDamage;
				turnsSrv.thisTurn.piercing = turnsSrv.attackWeapon.swingDamagePiercing;
				turnsSrv.thisTurn.weaponEffects = turnsSrv.attackWeapon.swingDamageEffects;
				disableUnavailableEffects();
			}
		}

		function disableUnavailableEffects() {
			turnsSrv.thisTurn.availableEffects = [0,0,0];
			for (i=0; i < turnsSrv.thisTurn.weaponEffects.length; i++ ) {
				if (turnsSrv.thisTurn.weaponEffects[i].name == 'Bleed') {
					turnsSrv.thisTurn.availableEffects[0] = 1;
				} else if (turnsSrv.thisTurn.weaponEffects[i].name == 'Trauma') {
					turnsSrv.thisTurn.availableEffects[1] = 1;
				} else if (turnsSrv.thisTurn.weaponEffects[i].name == 'Critical') {
					turnsSrv.thisTurn.availableEffects[2] = 1;
				}
			}

			//reik cia tvarkyt
			/*$scope.removeUnusedEffects = function () {
				for (i=0; i < turnsSrv.thisTurn.availableEffects.length; i++ ) {
					if (turnsSrv.thisTurn.availableEffects[i] == 0) {
						return false;
					}
					return true;
				}

			}
			 */
		}

		$scope.setLocation = function(location) {
			turnsSrv.currentLocation = location.name;
			turnsSrv.sublocation = location.sublocation;
			turnsSrv.finalAVElement[2] = location.bonusAV;
			addToFinalAV();
		};

		$scope.setActiveWeaponEffectRoll = function () {
			var roll = turnsSrv.activeWeaponEffectRoll;
			var value = turnsSrv.thisTurn.weaponEffects[roll-1].name;
			if (value == "Bleed") {
				turnsSrv.activeWeaponEffect = [1,0,0];
			} else if (value == "Trauma") {
				turnsSrv.activeWeaponEffect = [0,1,0];
			}else if (value == "Critical") {
				turnsSrv.activeWeaponEffect = [0,0,1];
			} else {
				turnsSrv.activeWeaponEffect = [0,0,0];
			}
			calcEffects();
		};



		$scope.setSublocation = function(location) {
			turnsSrv.sublocationPick = location.name;
			calcEffects();
		};
		//EFFEKTU GALIMA PIRKTI TIK 1+PER-10. TIK TOKIU KOKIUS WEAPONAS TURI.
		function calcEffects() {
			turnsSrv.thisTurn.effects[0].value = turnsSrv.buyDamageEffects[0].value + turnsSrv.activeWeaponEffect[0];
			turnsSrv.thisTurn.effects[1].value = turnsSrv.buyDamageEffects[1].value + turnsSrv.activeWeaponEffect[1];
			turnsSrv.thisTurn.effects[2].value = turnsSrv.buyDamageEffects[2].value + turnsSrv.activeWeaponEffect[2];
		}

		$scope.setSpecial = function(special) {
			turnsSrv.currentSpecial = special.name;
			turnsSrv.finalAVElement[3] = special.bonus;
			addToFinalAV();
			turnsSrv.vigorEffectsCost[3] = special.cost;
			vigorCost();
		};

		$scope.bonusUsed = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
			turnsSrv.finalAVElement[0] = turnsSrv.thisTurn.bonusUsed;
			$scope.maxbBonusValue = turnsSrv.thisTurn.bonus;
			addToFinalAV();
		};

		$scope.initBonus = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
		};

		$scope.setCombatRoll = function() {
			turnsSrv.finalAVElement[1] = turnsSrv.combatRoll;
			addToFinalAV();
		};

		function addToFinalAV() {
			turnsSrv.thisTurn.finalAV = turnsSrv.finalAVElement[0] + turnsSrv.finalAVElement[1] + turnsSrv.finalAVElement[2] + turnsSrv.finalAVElement[3] + turnsSrv.finalAVElement[4];
		}

		function vigorCost() {
			turnsSrv.thisTurn.vigor = turnsSrv.vigorEffectsCost[0] + turnsSrv.vigorEffectsCost[1] + turnsSrv.vigorEffectsCost[2] + turnsSrv.vigorEffectsCost[3] + turnsSrv.vigorEffectsCost[4];
			turnsSrv.thisTurn.finalEffects = turnsSrv.thisTurn.currentEffects[0] + turnsSrv.thisTurn.currentEffects[1] + turnsSrv.thisTurn.currentEffects[2];
		}

		$scope.vigorDamageEffectsCost = function (effect, index) {
			turnsSrv.vigorEffectsCost[index] = effect.value * effect.vigorCost;
			turnsSrv.thisTurn.currentEffects[index] = effect.value;

			vigorCost();
			calcEffects();
			$scope.disableEffects = function() {
				if (turnsSrv.thisTurn.finalEffects >= turnsSrv.thisTurn.maxEffects) {
					return true;
				}
			};
		};

		$scope.resetEffects = function () {
			turnsSrv.thisTurn.currentEffects = [0,0,0];
			turnsSrv.thisTurn.finalEffects = 0;
			turnsSrv.buyDamageEffects[0].value = 0;
			turnsSrv.buyDamageEffects[1].value = 0;
			turnsSrv.buyDamageEffects[2].value = 0;
		};

		turnsSrv.thisTurn.maxEffects = 1 + character.attributes.PER - 10;

		$scope.calcInit = function() {
			initiativeCalc();
		};

		function initiativeCalc() {
			turnsSrv.thisTurn.initiative = turnsSrv.thisTurn.initiativeRoll + Math.ceil(character.mainHandWeapon.type.value/2) + character.mainHandWeapon.reach + character.attributes.PER;
		}
		initiativeCalc();


		$scope.setAttackType(turnsSrv.currentAttackType);

	}]);
