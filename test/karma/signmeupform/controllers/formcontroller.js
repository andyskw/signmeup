"use strict"

describe("SignMeUpFormController", function() {

  beforeEach(function() {
    module('signmeupform');
  });

  var $controller, $moment, $q, controller, $rootScope, $location;
  var BackendServiceMock;
  var serviceDeferred;


  beforeEach(inject(function(_$controller_, _$moment_, _$q_, _$rootScope_, _$location_){
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $moment = _$moment_;
    $q = _$q_;
    serviceDeferred = $q.defer();
    $location = _$location_;
    BackendServiceMock = {
      getOccupationList: sinon.spy(function() {
          return serviceDeferred.promise;
      }),
      sendSignupForm: sinon.spy(function() {
          return serviceDeferred.promise;
      })
    };
    controller = $controller('SignMeUpFormController', {BackendService: BackendServiceMock});
  }));

  it('should have userData', function () {
    var controller = $controller('SignMeUpFormController');
    expect(controller.userData).to.be.exist;
  });

  it('should have a maxBirthDate set to 18 years before now', function () {
    var controller = $controller('SignMeUpFormController');

    expect(controller.maxBirthDate).to.be.exist;
    expect(moment().diff(controller.maxBirthDate, 'years')).to.be.equal(18);
  });

  it('should try to retreive the occupation list', function () {

    expect(BackendServiceMock.getOccupationList).to.have.been.called;
  });

  it('should save the occupation list locally', function () {
    expect(BackendServiceMock.getOccupationList).to.have.been.called;
    serviceDeferred.resolve(["hello", "bello"]);
    $rootScope.$apply();
    expect(controller.occupationData).to.contain('hello');
    expect(controller.occupations).not.to.contain('hello');
  });

  it('#onType should set the occupations list to [], when called with null', function () {
    controller.occupations = ['a'];
    controller.onType();
    expect(controller.occupations).to.be.empty;
  });

  it('#onType should set the occupations list to [], when the entered text is shorter than 3 chars', function () {
    controller.occupations = ['a'];
    controller.onType("1");
    expect(controller.occupations).to.be.empty;
    controller.occupations = ['a'];
    controller.onType("11");
    expect(controller.occupations).to.be.empty;
    controller.occupations = ['a'];
    controller.onType("");
    expect(controller.occupations).to.be.empty;
  });

  it('#onType should fill the occupations list, when the entered text is >= 3 chars', function () {
    serviceDeferred.resolve(["hello", "bello"]);
    $rootScope.$apply();
    controller.onType("111");
    expect(controller.occupations).not.to.be.empty;
    expect(controller.occupations).to.contain('hello');
  });

  it('#submit should call BackendService', function () {
    $rootScope.$apply();
    controller.submit();
    expect(BackendServiceMock.sendSignupForm).to.have.been.called;

  });

  it('#submit should set the location properly, if it gets a positive answer.', function () {
    controller.submit();
    serviceDeferred.resolve(["hello", "bello"]);
    $rootScope.$apply();
    expect($location.path()).to.be.equal("/submitted");
  });



});
