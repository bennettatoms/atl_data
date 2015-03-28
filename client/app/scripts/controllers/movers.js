'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MoversCtrl', ['$scope', 'MoversService', function($scope, MoversService) {

  function getMovers() {
    MoversService.getMovers().success(function(data) {
      $scope.movers = data;
    })
    .error(function() {
      alert('GET: error');
    });
  }
  getMovers();
}]);
