'use strict';

angular.module('clientApp')
.service('MoversService', ['$http', function($http) {

  this.getMovers = function() {
    return $http.get('api/movers');
  };
}]);