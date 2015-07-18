angular.module('signmeup.services.backend', [])
  .factory('BackendService', ['$http', '$q', function($http, $q) {

    function getOccupationList() {
      return $http.get('/occupations');
    }

    function sendSignupForm(data) {
      var deferred = $q.defer();
      $http.post('/signup', data).success(function (data, status) {
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
