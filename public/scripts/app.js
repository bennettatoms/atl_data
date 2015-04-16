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
    'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider', 
        function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'mainCtrl'
    })
      // the default route when someone hits dashboard    <!-- endbower -->

    .state('home.migrations', {
      url: 'migrations',
      templateUrl: 'views/chord.html',
      controller: 'ChordCtrl'
    })
    .state('home.population', {
      url: 'population',
      templateUrl: 'views/population.html',
      controller: 'populationCtrl'
    });
 // default fall back route
    $urlRouterProvider.otherwise('/');

}])
  .run(function ($state,$rootScope) {
    $rootScope.$state = $state;
});



