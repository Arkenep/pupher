'use strict';

angular.module('myApp.directives', []).directive('myDirective', function() {
	return {
		template: '<div><input type="text" value="{{stuff}}" /></div>',
		//templateUrl: 'app/modules/common/directives/directive-example/ajsdaklsd.html'
		scope: {
			myparam: '='
		},
		controller: function ($scope, $http, turnsSrv) {
			$scope.stuff = turnsSrv.currentLocation;
		}
	}
});
