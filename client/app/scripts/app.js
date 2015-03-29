'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/movers', {
        templateUrl: 'views/movers.html',
        controller: 'MoversCtrl'
      })
      .when('/chord', {
        templateUrl: 'views/chord.html',
        controller: 'ChordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
