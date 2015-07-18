var mod = angular.module('signmeupform', ['autocomplete', 'angular-momentjs', 'signmeup.services.backend']);

mod.controller("SignMeUpFormController", ["$http", "$moment", "$location", "BackendService", function($http, $moment, $location, BackendService) {
  var _that = this;
  this.userData = {
    name: null,
    email: null,
    occupation: null,
    birthdate: null
  };
  this.maxBirthDate = $moment().subtract(18, 'years').format('YYYY-MM-DD');

  var _self = this;
  this.occupations = [];
  this.occupationData = [];

  BackendService.getOccupationList().then(function (occupations) {
      _self.occupationData = occupations;
  });

  function onType(current) {
    if (!current || current.length < 3) {
      _self.occupations = [];
    } else {
      _self.occupations = _self.occupationData;
    }
  }
  this.onType = onType;

  var submit = function(data) {
      var a = BackendService.sendSignupForm(_that.userData);
      a.then(function (data) {
        $location.path("/submitted");
      }, function (data) {
      });
  }
  this.submit = submit;

}]);
