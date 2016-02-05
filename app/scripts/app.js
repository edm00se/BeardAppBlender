'use strict';

/**
 * @ngdoc overview
 * @name amazingDemoApp
 * @description
 * # amazingDemoApp
 *
 * Main module of the application.
 */
angular
  .module('amazingDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/beers', {
        templateUrl: 'views/beers.html',
        controller: 'BeersCtrl',
        controllerAs: 'beers'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
