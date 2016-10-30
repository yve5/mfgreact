'use strict';

var app = angular.module('app');

app.controller('help', ['$scope', 'common', 
	function (scope, common) {
        common.setSection('help');
	}
]);
