"use strict"

var app = angular.module('signmeup', ['ngRoute', 'signmeupform']);


app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/signup-form.html',
        controller: 'SignMeUpFormController',
        controllerAs: 'formCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  }]);
