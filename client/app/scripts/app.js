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
    'highcharts-ng',
    'angularCharts'
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
      .when('/bldg_permits', {
        templateUrl: 'views/bldg_pmt.html',
        controller: 'BldgPmtCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
