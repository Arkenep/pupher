angular.module('myApp.combat', ['ngRoute'])
	.controller('combatCtrl', ['$scope', 'character', 'turnsSrv', function ($scope, character, turnsSrv) {

		$scope.endTurn = function() {
			turnsSrv.endTurn();
		};

		$scope.spendLuck = function(n) {
			if(turnsSrv.spendLuck(n)) {
				console.log(n + " luck has been spent");
			} else {
				console.log(n + " no luck pal");
			}
		};

		$scope.turns = turnsSrv;
		
		$scope.character = character;
		$scope.autofail = 6; //needs to be added through input.
		
		$scope.setMainHandWeapon = function(weapon) {
			character.mainHandWeapon = weapon;
		};

		$scope.setOffHandWeapon = function(weapon) {
			character.offHandWeapon = weapon;
		};

		$scope.setMHActiveSkill = function(skill) {
			character.currentMainHandSkill = skill;
			character.characterMHAV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.attackValueBonus;
			character.characterMHDV = character.combatSkills[skill] + character.attributes.REF + character.mainHandWeapon.defenceValueBonus;
		};

		$scope.setOHActiveSkill = function(skill) {
			character.currentOffHandSkill = skill;
			character.characterOHAV = character.combatSkills[skill] + character.attributes.REF + character.offHandWeapon.attackValueBonus;
			character.characterOHDV = character.combatSkills[skill] + character.attributes.REF + character.offHandWeapon.defenceValueBonus;
		};
		
		$scope.setActionType = function(action) {
			turnsSrv.currentActionType = action;
		};

		$scope.setAttackType = function(attack) {
			turnsSrv.currentAttackType = attack;
		};
		
		$scope.setDamageEffects = function(effect) {
			turnsSrv.currentDamageEffects = effect;
		};

		$scope.setLocation = function(location, value) {
			turnsSrv.currentLocation = location;
			$scope.finalAVElement[2] = value;
			addToFinalAV();
		};

		$scope.bonusUsed = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus - turnsSrv.thisTurn.bonusUsed;
			$scope.finalAVElement[0] = turnsSrv.thisTurn.bonusUsed;
			addToFinalAV();
		};

		$scope.setCombatRoll = function() {
			$scope.finalAVElement[1] = turnsSrv.combatRoll;
			addToFinalAV();
		};




		$scope.showThis = true;

		$scope.startCombat = function () {
			turnsSrv.thisTurn.currentBonus = turnsSrv.thisTurn.bonus;
			$scope.hideThis = true;
			$scope.showThis = false;
		};
		
		$scope.finalAVElement = [0,0,0,0];
		function addToFinalAV() {
			turnsSrv.thisTurn.finalAV = $scope.finalAVElement[0] + $scope.finalAVElement[1] + $scope.finalAVElement[2] + $scope.finalAVElement[3];
		};

		$scope.vigorEffectsCost = [0, 0, 0, 0];
		function vigorCost() {
			turnsSrv.thisTurn.vigor = $scope.vigorEffectsCost[0] + $scope.vigorEffectsCost[1] + $scope.vigorEffectsCost[2] + $scope.vigorEffectsCost[3];
		}

		$scope.vigorDamageEffectsCost = function (effect, index) {
			$scope.vigorEffectsCost[index] = effect.value * effect.vigorCost;
			vigorCost();
		};

		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setMHActiveSkill(character.currentMainHandSkill);
		$scope.setActionType(turnsSrv.currentActionType);
		$scope.setAttackType(turnsSrv.currentAttackType);
	}]);
