var module = angular.module('signmeupform', ['autocomplete', 'angular-momentjs', 'signmeup.services.backend']);

module.controller("SignMeUpFormController", ["$http", "$moment", "$location", "BackendService", function($http, $moment, $location, BackendService) {
  var _that = this;
  this.userData = {
    name: null,
    email: null,
    occupation: null,
    birthdate: null
  };
  this.minAge = $moment().subtract(18, 'years').format('YYYY-MM-DD');

  var _self = this;
  this.occupations = [];
  this.occupationData = [];

  BackendService.getOccupationList().then(function (resp, status) {
    if (status = 200) {
      var data = resp.data;
      _self.occupationData = data.data;
    }
  });

  function onType(current) {
    if (current.length < 3) {
      _self.occupations = [];
    } else {
      _self.occupations = _self.occupationData;
    }
  }
  this.onType = onType;

  var submit = function(data) {
      var a = BackendService.sendSignupForm(_that.userData);
      console.log(a);
      a.then(function (data) {
        $location.path("/submitted");
      }, function (data) {
      });
  }
  this.submit = submit;

}]);
