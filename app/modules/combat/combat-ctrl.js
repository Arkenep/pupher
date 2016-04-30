angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		$scope.turns = turnsSrv;
		$scope.character = character;
		
		$scope.autofail = 6;

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
				character.offHandWeapon = character.emptyWeapon;
			}
			refreshWeapon();
			
			mainHandAV();
			initiativeCalc();
			setActionTypeOptions(); //OLD remove when needed.
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
			refreshWeapon();
			offHandAV();
			setActionTypeOptions(); //OLD remove when needed.

		};
		$scope.setOffHandWeapon(character.offHandWeapon);

		function offHandAV() {
			character.characterOHAV = character.offHandWeapon.type.value + character.attributes.REF + character.offHandWeapon.attackValueBonus - 3;
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
				character.offHandWeapon = character.emptyWeapon;
				refreshWeapon();
			} else {
				turnsSrv.weaponHands = 1;
			}
		};
		
		$scope.calcInit = function() {
			initiativeCalc();
		};
		
		function initiativeCalc() {
			turnsSrv.thisTurn.initiative = turnsSrv.thisTurn.initiativeRoll + Math.ceil(character.mainHandWeapon.type.value/2) + character.mainHandWeapon.reach + character.attributes.PER;
		}
		initiativeCalc();
		
		//START of actions
		
		$scope.startCombat = function () {
			newTurn();
			newAction();
			console.log(['combat'],[turnsSrv.combat],['turn'],[turnsSrv.turn],['actions'],[turnsSrv.actions]);
		};

		$scope.endTurn = function () {
			newTurn();
		};

		$scope.addAction = function () {
			newAction();
		};

		$scope.removeAction = function (index) {
			turnsSrv.actions.splice(index, 1);
			turnsSrv.bonusArray.splice(index,1);
			checkNumberOfAttacks();
			calculateBonus();
		};

		$scope.setAction = function (obj, properties, parentIndex) {
			turnsSrv.actions[parentIndex].currentAction.name = properties.weapon.name;
			turnsSrv.actions[parentIndex].currentAction.type = properties.name;
			turnsSrv.actions[parentIndex].currentAction.weight = properties.weapon.attackWeight;
			turnsSrv.actions[parentIndex].currentAction.weapon = properties.weapon;
			checkThrustOrSwing(parentIndex);
			checkNumberOfAttacks();
		};

		$scope.setType = function (obj, index, parentIndex) {
			turnsSrv.actions[parentIndex].currentAction.attackType = obj.name;
		};
		
		$scope.initiativeBonus = function () {
			turnsSrv.totalBonus = turnsSrv.initiativeTotalBonus;
			calculateBonus();
		};

		$scope.actionBonusUsed = function (obj, index) {
			calculateBonus();
		};

		function calculateBonus() {
			for (var i=0; i < turnsSrv.actions.length; i++) {
				turnsSrv.bonusArray[i] = turnsSrv.actions[i].bonusUsed;
				turnsSrv.actions[i].bonusMax = turnsSrv.bonusLeft + turnsSrv.actions[i].bonusUsed - 1;
			}
			turnsSrv.currentUsedBonus = turnsSrv.bonusArray.reduce(add, 0);
			turnsSrv.bonusLeft = turnsSrv.totalBonus - turnsSrv.currentUsedBonus;

			function add(a, b) {
				return a + b;
			}
			
		}
		
		function newTurn() {
			var tempTurn = {};
			angular.copy(turnsSrv.turn, tempTurn);
			tempTurn.number = turnsSrv.combat.length+1;
			turnsSrv.combat.push(tempTurn);
		}
		
		function newAction() {
			var tempAction = {};
			turnsSrv.action.bonusMax = turnsSrv.totalBonus - turnsSrv.currentUsedBonus; //lets rethink?
			turnsSrv.action.type.mainHand.weapon = character.mainHandWeapon;
			turnsSrv.action.type.offHand.weapon = character.offHandWeapon;
			turnsSrv.action.currentAction.name = turnsSrv.action.type.mainHand.weapon.name;
			turnsSrv.action.currentAction.type = turnsSrv.action.type.mainHand.name;
			turnsSrv.action.currentAction.weight = turnsSrv.action.type.mainHand.weapon.attackWeight;
			turnsSrv.action.currentAction.weapon = turnsSrv.action.type.mainHand.weapon;
			for (var i=0; i < turnsSrv.action.currentAction.weapon.attackType.length; i++) {
				if (turnsSrv.action.currentAction.weapon.attackType[i].value) {
					turnsSrv.action.currentAction.attackType = turnsSrv.action.currentAction.weapon.attackType[i].name;
					break;
				}
			}
			angular.copy(turnsSrv.action, tempAction);
			turnsSrv.actions.push(tempAction);
			checkNumberOfAttacks();
		}

		function refreshWeapon() {
			for (var i=0; i < turnsSrv.actions.length; i++) {
				turnsSrv.actions[i].type.mainHand.weapon = character.mainHandWeapon;
				turnsSrv.actions[i].type.offHand.weapon = character.offHandWeapon;
				if (turnsSrv.actions[i].currentAction.type == turnsSrv.actions[i].type.mainHand.name) {
					turnsSrv.actions[i].currentAction.name = turnsSrv.actions[i].type.mainHand.weapon.name;
					turnsSrv.actions[i].currentAction.weight = turnsSrv.actions[i].type.mainHand.weapon.attackWeight;
					turnsSrv.actions[i].currentAction.weapon = turnsSrv.actions[i].type.mainHand.weapon;
					checkThrustOrSwing(i);
				} else {
					turnsSrv.actions[i].currentAction.name = turnsSrv.actions[i].type.offHand.weapon.name;
					turnsSrv.actions[i].currentAction.weight = turnsSrv.actions[i].type.offHand.weapon.attackWeight;
					turnsSrv.actions[i].currentAction.weapon = turnsSrv.actions[i].type.offHand.weapon;
					checkThrustOrSwing(i);
				}
			}
			checkNumberOfAttacks();
		}

		function checkThrustOrSwing(i) {
			for (var j=0; j < turnsSrv.actions[i].currentAction.weapon.attackType.length; j++) {
				if (turnsSrv.actions[i].currentAction.weapon.attackType[j].value) {
					turnsSrv.actions[i].currentAction.attackType = turnsSrv.actions[i].currentAction.weapon.attackType[j].name;
					break;
				}
			}
		}

		function checkNumberOfAttacks() {
			for (var i=0; i < turnsSrv.actions.length; i++) {
				if (turnsSrv.actions[i].currentAction.weight == 'Super Heavy' && turnsSrv.actions.length > 1) {
					turnsSrv.actionStatus = false;
					return;
				}
				if (turnsSrv.actions[i].currentAction.weight == 'Heavy' && turnsSrv.actions.length > 2) {
					turnsSrv.actionStatus = false;
					return;
				}
				if (turnsSrv.actions[i].currentAction.weight == 'Medium' && turnsSrv.actions.length > 3) {
					turnsSrv.actionStatus = false;
					return;
				}
				if (turnsSrv.actions[i].currentAction.weight == 'Light' && turnsSrv.actions.length > 4) {
					turnsSrv.actionStatus = false;
					return;
				}
				turnsSrv.actionStatus = true;
			}
		}
		
		//END of attacks
		
		//START OF OLD attacks
		
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
		$scope.setAttackType(turnsSrv.currentAttackType);

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
			turnsSrv.buyDamageEffects[0].available = false;
			turnsSrv.buyDamageEffects[1].available = false;
			turnsSrv.buyDamageEffects[2].available = false;
		//from old does not work if enabled
			
		/*	for (i=0; i < turnsSrv.thisTurn.weaponEffects.length; i++ ) {
				if (turnsSrv.thisTurn.weaponEffects[i].name == 'Bleed') {
					turnsSrv.buyDamageEffects[0].available = true;
				} else if (turnsSrv.thisTurn.weaponEffects[i].name == 'Trauma') {
					turnsSrv.buyDamageEffects[1].available = true;
				} else if (turnsSrv.thisTurn.weaponEffects[i].name == 'Critical') {
					turnsSrv.buyDamageEffects[2].available = true;
				}
			}*/
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
			var originalIndex = turnsSrv.buyDamageEffects.indexOf(effect);
			turnsSrv.vigorEffectsCost[originalIndex] = effect.value * effect.vigorCost;
			turnsSrv.thisTurn.currentEffects[originalIndex] = effect.value;
			vigorCost();
			calcEffects();
			turnsSrv.buyDamageEffects[0].max = turnsSrv.thisTurn.maxEffects - turnsSrv.buyDamageEffects[1].value - turnsSrv.buyDamageEffects[2].value;
			turnsSrv.buyDamageEffects[1].max = turnsSrv.thisTurn.maxEffects - turnsSrv.buyDamageEffects[0].value - turnsSrv.buyDamageEffects[2].value;
			turnsSrv.buyDamageEffects[2].max = turnsSrv.thisTurn.maxEffects - turnsSrv.buyDamageEffects[1].value - turnsSrv.buyDamageEffects[0].value;
		};

		turnsSrv.buyDamageEffects[0].max = 1 + character.attributes.PER - 10;
		turnsSrv.buyDamageEffects[1].max = 1 + character.attributes.PER - 10;
		turnsSrv.buyDamageEffects[2].max = 1 + character.attributes.PER - 10;
		turnsSrv.thisTurn.maxEffects = 1 + character.attributes.PER - 10;

		$scope.myObject = "asdasdasd asd asdasd asd asd"; //example of directive
		
	}]);