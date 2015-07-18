"use strict"

angular.module('signmeup.services.backend', [])
  .factory('BackendService', ['$http', '$q', function($http, $q) {

    function getOccupationList() {
      var deferred = $q.defer();


      $http({method: 'GET', url: '/occupations', timeout: 1000}).success(function(data,status) {
        if (status === 200) {
          deferred.resolve(data.data);
        }
      }).error(function(err,status) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function sendSignupForm(data) {
      var deferred = $q.defer();
      $http({method: 'POST', url: '/signup', data: data, timeout: 1000}).success(function (data, status) {
        if (status === 200) {
          deferred.resolve(data.data);
        }
      }).error(function(data, status) {
        deferred.reject(data.data);
      });
      return deferred.promise;
    }

    return {
      getOccupationList : getOccupationList,
      sendSignupForm: sendSignupForm
    };


}]);
