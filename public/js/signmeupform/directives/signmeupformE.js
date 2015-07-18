"use strict"

var mod = angular.module('signmeupform');
mod.directive('signmeupForm', function() {
  return {
    restrict: "E",
    templateUrl: "/templates/signup-form.html"
  }
});
