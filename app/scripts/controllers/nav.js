'use strict';

/**
 * @ngdoc function
 * @name amazingDemoApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the amazingDemoApp
 */
angular.module('amazingDemoApp')
  .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    this.isActive = function(route) {
		  return route === $location.path();
    };
  }]);
