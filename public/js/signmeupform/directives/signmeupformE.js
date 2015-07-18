var module = angular.module('signmeupform');
module.directive('signmeupForm', function() {
  return {
    restrict: "E",
    templateUrl: "/templates/signup-form.html"
  }
});
