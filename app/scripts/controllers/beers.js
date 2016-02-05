'use strict';

/**
 * @ngdoc function
 * @name amazingDemoApp.controller:BeersCtrl
 * @description
 * # BeersCtrl
 * Controller of the amazingDemoApp
 */
angular.module('amazingDemoApp')
  .controller('BeersCtrl', ['$http', function ($http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
	vm.debt = [];
	$http.get('xsp/beers')
		.then(function(response){
			// success
			vm.debt = response.data.data;
		}, function(data,status,headers,config,statusText){
			// error
			console.log('error '+status+': '+statusText);
		});
	vm.amazing = true;
}]);
