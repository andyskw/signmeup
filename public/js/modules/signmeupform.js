"use strict"

var app = angular.module('signmeupform', []);

app.directive('signmeupForm', function() {
  return {
    restrict: "E",
    templateUrl: "signup-form.html"
  }
});

app.controller("SignMeUpFormController", function() {
  this.userData = {
    name: null,
    email: null,
    occupation: null,
    birthdate: null
  }
});
