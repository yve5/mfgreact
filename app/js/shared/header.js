'use strict';

var app = angular.module('app');

app.directive('appHeader', function () {
    return {
      templateUrl: 'html/header.html',
      controller: 'appHeader',
      restrict: 'AEC'
    };
  });

app.controller('appHeader', ['$scope', 'common', function (scope, common) {
    scope.service = common;

    // music
    scope.isPaused = true;
    scope.firstPlay = false;

    scope.pause = function () {
      scope.isPaused = !scope.isPaused;
    }
    
    // music is automatically played after the first tile click event.
    scope.$watch('service.getClicks()', function (aze, qsd) {
      if (scope.firstPlay === false && aze !== qsd) {
        scope.firstPlay = true;
        scope.isPaused = false;
      }
    });
  }
]);
