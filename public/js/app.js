"use strict"

var app = angular.module('signmeup', ['ngRoute', 'signmeupform']);


app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/templates/signup-form.html',
        controller: 'SignMeUpFormController',
        controllerAs: 'formCtrl'
      })
      .when('/submitted', {
        templateUrl: '/templates/submitted.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
