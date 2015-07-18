"use strict"

describe("Signmeup app", function() {

  beforeEach(function() {
    module('signmeup');
  });

  // We want to store a copy of the three services we'll use in our tests
  // so we can later reference these services in our tests.
  var $location, $route, $rootScope;

  beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
    $location = _$location_;
    $route = _$route_;
    $rootScope = _$rootScope_;
  }));

  it('should have a / route', function () {
    expect($route.routes['/']).to.exist;
  });


  it('should have a /submitted route', function () {
    inject(function ($route) {
      expect($route.routes['/']).to.exist;
    });
  });


  beforeEach(inject(function($templateCache){
    $templateCache.put('/templates/submitted.html', 'whatever');
    $templateCache.put('/templates/signup-form.html', 'main HTML');
  }));


  it('should automatically init with the / route and the form', function () {

    expect($location.path()).to.be.equal('');

    $rootScope.$digest();
    expect($location.path()).to.be.equal('/');
    expect($route.current.controller).to.be.equal('SignMeUpFormController');
  });

  it('should automatically redirect to the / route and the form when an unknown route was called', function () {
    expect($location.path()).to.be.equal('');
    $location.path('/i-am-unknown-bleeheeee');
    $rootScope.$digest();
    expect($location.path()).to.be.equal('/');
    expect($route.current.controller).to.be.equal('SignMeUpFormController');
  });

  it('should display the form template when with the / page.', function () {
    $location.path('/');
    $rootScope.$digest();
    expect($location.path()).to.be.equal('/');
    expect($route.current.templateUrl).to.be.equal('/templates/signup-form.html');
  });

  it('should display the submitted template when with the /submitted page.', function () {
    $location.path('/submitted');
    $rootScope.$digest();
    expect($location.path()).to.be.equal('/submitted');
    expect($route.current.templateUrl).to.be.equal('/templates/submitted.html');
  });
});
