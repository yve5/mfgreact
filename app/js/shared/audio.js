'use strict';

var app = angular.module('app');

app.directive('audioPlayer', [function () {
  return {
    template: '<audio loop=""><source src="doc/alone.ogg" type="audio/ogg"></audio>',
    restrict: 'ACE',
    scope: {
        pause: '='
    },
    link: function (scope, elm, attrs, ngModel) {
        var audioTag = elm[0].childNodes[0];

        scope.$watch('pause', function (newVal, oldVal) {
            if (newVal) {
                audioTag.pause();
            }
            else {
                audioTag.play();
            }
        });
    }
  };
}]);
