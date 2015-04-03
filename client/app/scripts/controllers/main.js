'use strict';

angular.module('clientApp')
.controller('mainCtrl', ['$scope', '$state', function ($scope, $state) {
 
  $scope.selectedGraph = 'graph1';     
  
  $scope.goToChord = function() {
    $state.go('home.migrations');
  };

  $scope.goToPop = function() {
    $state.go('home.population');
  };

  // $rootScope.fate = "Your fate is based on statistics from resources listed below:";
  $scope.goToDev = function() {
    $state.go('home.development');
  };
  // $rootScope.transport = "UNODC and State Trafficking 2014 Report ";
  $scope.goToBar = function() {
    $state.go('home.bar');
  };

  $scope.selectGraph = function(selectedGraph) {
    $scope.selectedGraph = selectedGraph;
  };
}]);

