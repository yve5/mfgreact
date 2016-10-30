'use strict';

var app = angular.module('app', ['ngRoute', 'pascalprecht.translate']);

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'html/game.html',
      controller: 'game',
      controllerAs: 'game'
    })
    .when('/help', {
      templateUrl: 'html/help.html',
      controller: 'help',
      controllerAs: 'help'
    })
    .otherwise({
      redirectTo: '/help'
    });
  }]);




app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', enVal);
  $translateProvider.translations('de', deVal);
  $translateProvider.preferredLanguage('de');
}]);




var enVal = {
  'title': 'Welcome',
  'foo': 'This is a paragraph',
  'hello': 'Hello World'
};


var deVal = {
  'title': 'Hallo',
  'foo': 'Dies ist ein Absatz',
  'hello': 'Hello World'
};
