'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('MoversCtrl', ['$scope', 'MoversService', function ($scope, MoversService) {

  $scope.movers = [];
  // var i;
  function getMovers() {
    MoversService.getMovers().success(function(data) {
      $scope.movers = data;
      // for (i=0; i < data.length; i++) {
      //   var moversData = {
      //   year:             data[i].year, 
      //   originCodeState:  data[i].origin_code_state, 
      //   originCodeCounty: data[i].origin_code_county,
      //   originState:      data[i].origin_state,
      //   originCounty:     data[i].origin_county,
      //   destCodeState:    data[i].dest_code_state,
      //   destCodeCounty:   data[i].dest_code_county,
      //   destState:        data[i].dest_state,
      //   destCounty:       data[i].dest_county, 
      //   numMovers:        data[i].num_movers
      //   };
      // $scope.movers.push(moversData[i]);
      // }
    })
    .error(function() {
      alert('GET: error');
    });
  }
  getMovers();
}]);
