'use strict';

angular.module('clientApp')
.controller('mainCtrl', ['$scope', '$state', function ($scope, $state) {
 
  $scope.selectedGraph = 'permitBlurb';     
  
  $scope.goToChord = function() {
    $state.go('home.migrations');
  };

  $scope.goToPop = function() {
    $state.go('home.population');
  };
  
  $scope.hideChordButton = false;
  $scope.showIntro = true;
  $scope.hidePopButton = true;

  (function checkState(stateName) {
    if (stateName === 'home.migrations') {
      $scope.hideChordButton = true;
      $scope.showIntro = false;
      $scope.hidePopButton = false;
      $scope.update;
    } else if (stateName === 'home.population') {
      $scope.hideChordButton = false;
      $scope.showIntro = false;
      $scope.hidePopButton = true;
      $scope.update;
    }
    console.log($state.$current.name);
  })();

  // checkState($state.$current.name);
  

  $scope.showChord = function() {
    $state === 'home.migrations';
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

