'use strict';

angular.module('clientApp')
.controller('BldgPmtCtrl', ['$scope','BldgPmtService', function ($scope, BldgPmtService) {

  function getBuildingPermits() {
    BldgPmtService.getBuildingPermits().success(function(data) {
      $scope.buildingPermits = data;
    })
    .error(function() {
      alert('GET: error');
    });
  }
  getBuildingPermits();
}]);