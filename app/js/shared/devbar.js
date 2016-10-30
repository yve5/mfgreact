'use strict';

var app = angular.module('app');

app.directive('devbar', [function () {
  return {
    template: '<div ng-click="closeDevbar()" ng-show="devbarIsShowed" style="border-radius: 0 0 0 10px; background: #76FF03; position: absolute; font-weight: bold; padding: 2px 10px; cursor: pointer; font-size: 1rem; color: #558B2F; right: 0; top: 0;">dev</div>',
    controller: 'devbar',
    restrict: 'E'
  };
}]);

app.controller('devbar', ['$scope', function (scope) {
    scope.devbarIsShowed = true;

    scope.closeDevbar = function () {
        scope.devbarIsShowed = false;
    } 
  }
]);
