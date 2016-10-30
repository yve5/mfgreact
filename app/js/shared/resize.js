'use strict';

var app = angular.module('app');

app.directive('onResize', ['$window', 
    function (window) {
        return {
            restrict: 'ACE',
            link: function (scope, elt, attrs) {
                scope.initResize = function () {
                    scope.win = {};
                    scope.updateResize();
                }

                scope.updateResize = function () {
                    scope.win.width = window.innerWidth;
                    scope.win.height = window.innerHeight;
                };

                angular.element(window).on('resize', function () {
                    scope.updateResize();
                    scope.$apply();
                });
                
                scope.initResize();
            }
        };
    }
]);
