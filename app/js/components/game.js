'use strict';

var app = angular.module('app');

app.controller('game', ['$scope', '$http', '$timeout', '$rootScope', '$window', 'common', 
	function (scope, http, timeout, rootScope, window, common) {
		common.setSection('home');

		// game
		scope.init = function (localTotal) {
			// Google material glyphicons
			scope.icons = ['face', 'extension', 'favorite', 'hourglass_empty', 'motorcycle', 'polymer', 'settings_input_hdmi', 'shopping_cart', 'thumb_up', 'work', 'album', 'chat', 'phone', 'vpn_key', 'drafts', 'games', 'radio', 'remove_circle', 'sd_card', 'attach_file', 'cloud', 'keyboard', 'mouse', 'watch', 'wb_sunny', 'tune', 'directions_car', 'directions_run', 'directions_subway', 'map', 'restaurant', 'golf_course', 'cake', 'public', 'star', 'whatshot', 'local_bar', 'notifications', 'school', 'all_inclusive', 'build', 'account_balance', 'https', 'room', 'payment', 'pets', 'watch_later', 'beach_access'];

			// plain variable
			scope.canPick 		= true;
			scope.selection 	= null;
			scope.first 		= null;
			scope.second 		= null;
			scope.time  		= 1000;
			rootScope.gameOver 	= false;


			// number of tiles
			scope.total = localTotal;
			if (_.isUndefined(scope.total)) {
				scope.total = scope.largeTotal;
			}


	  		// choose 24 random tile images
	  		scope.tiles = [];
	  		var iii = 0;

	  		while (iii < scope.total) {
	  			var iconName = scope.icons[_.random(0, scope.icons.length - 1)];

	          	if (_.isUndefined(_.find(scope.tiles, { 'name': iconName }))) {
					scope.tiles.push({'id' : iii++, 'name' : iconName, 'isSelected' : false, 'isRemoved' : false});
					scope.tiles.push({'id' : iii++, 'name' : iconName, 'isSelected' : false, 'isRemoved' : false});
				}
			}

	        // shuffle the chosen tiles
	        scope.tiles = _.shuffle(scope.tiles);
	    }

	    scope.chooseTile = function (index) {
	    	if (scope.canPick) {
	    		if (scope.tiles[index].isSelected === false && scope.tiles[index].isRemoved === false) {
	    			scope.tiles[index].isSelected = true;
	    			common.setClicks(common.getClicks() + 1);

	    			if (_.isNull(scope.first)) {
	    				scope.first = index;
	    			}
	    			else {
	    				if (_.isNull(scope.second)) {
	    					scope.second = index;
	    					scope.canPick = false;

	    					if (scope.tiles[scope.first].name === scope.tiles[scope.second].name) {
	    						// The tiles are matched
	    						timeout(scope.removeTiles, scope.time);
	    					}
	    					else {
	    						// The tiles are not matched
	    						timeout(scope.resetTiles, scope.time);
	    					}
	    				}
	    			}
	    		}
	    	}
	    }

	    scope.resetTiles = function () {
	    	// the tiles can be clicked
	    	scope.canPick = true;

	    	// the tiles are deselected
	    	scope.tiles[scope.first].isSelected		= false;
	    	scope.tiles[scope.second].isSelected 	= false;

	    	// the selection is clear
	    	scope.first		= null;
	    	scope.second	= null;
	    }

	    scope.removeTiles = function () {
	    	// the tiles can be clicked
	    	scope.canPick = true;

	    	// the tiles are deselected
	    	scope.tiles[scope.first].isSelected 	= false;
	    	scope.tiles[scope.second].isSelected 	= false;

	    	// the tiles are removed
	    	scope.tiles[scope.first].isRemoved 	= true;
	    	scope.tiles[scope.second].isRemoved = true;

	    	// the selection is clear
	    	scope.first 	= null;
	    	scope.second 	= null;

	    	// if all tiles haved been matched, we reset the game
	    	if (_.isUndefined(_.find(scope.tiles, { 'isRemoved' : false }))) {
	    		timeout(scope.gameIsOver, scope.time);
	    	}
	    }

	    scope.gameIsOver = function () {
	    	rootScope.gameOver = true;
	    	timeout(scope.tryAgain, scope.time);
	    }

	    scope.tryAgain = function () {
	    	if (_.isUndefined(scope.win) || scope.win.width > 800) {
	    		scope.init(scope.largeTotal);
	    	}
	    	else {
	    		scope.init(scope.smallTotal);
	    	}
	    }
		
		// scope.init(); // former first init
		scope.smallTotal = 24;
		scope.largeTotal = 48;

		// on resize
		scope.$watch('win.width', function (newVal, oldVal) {
			// first init
			if (newVal === oldVal) {
				if (newVal <= 800) {
					scope.init(scope.smallTotal);
				}
				else {
					scope.init(scope.largeTotal);
				}
			}

			// init play area when screen is different...
			if (newVal <= 800 && oldVal > 800) {
				// ... small screen ...
				scope.init(scope.smallTotal);
			}

			if (newVal > 800 && oldVal <= 800) {
				// ... or large screen
				scope.init(scope.largeTotal);
			}
		});

	}
]);
