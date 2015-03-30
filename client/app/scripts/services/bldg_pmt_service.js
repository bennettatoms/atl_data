'use strict';

angular.module('clientApp')
.service('BldgPmtService', ['$http', function($http) {

  this.getBuildingPermits = function() {
    return $http.get('api/bldg_permits');
  };
}]);