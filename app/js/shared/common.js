'use strict';

var app = angular.module('app');

app.factory('common', function () {
    var section = 'home';
    var clicks = 0;

    return {
      setSection: function (foo) {
        section = foo;
      },
      getSection: function () {
        return section;
      },
      setClicks: function (foo) {
        clicks = foo;
      },
      getClicks: function () {
        return clicks;
      }
    };
  });
