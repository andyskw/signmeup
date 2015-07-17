"use strict"

var app = angular.module('signmeupform', ['autocomplete']);

app.directive('signmeupForm', function() {
  return {
    restrict: "E",
    templateUrl: "signup-form.html"
  }
});

app.controller("SignMeUpFormController", ["$http", function($http) {
  this.userData = {
    name: null,
    email: null,
    occupation: null,
    birthdate: null
  };
  var _self = this;
  this.occupations = [];
  this.occupationData = [];
  $http.get('/occupations').then(function (resp) {
    if (resp.status = 200) {
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
    console.log(data);
  }
  this.submit = submit;

}]);
