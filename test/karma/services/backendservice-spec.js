"use strict"

describe("BackendService", function() {

  beforeEach(function() {
    module('signmeup.services.backend');
  });

  var $httpBackend, bs;
  beforeEach(function() {
    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      bs = $injector.get('BackendService');
    });
  });


  it('should provide a #getOccupationList function', function () {
    expect(bs.getOccupationList).to.exist;
  });

  it('should provide a #sendSignupForm function', function () {
    expect(bs.sendSignupForm).to.exist;
  });

  it('#getOccupationList should return with the occupation list array', function () {
    $httpBackend.expectGET('/occupations').respond(200, '{"data": ["almafa"]}');
    bs.getOccupationList().then(function(list) {
      expect(list).to.contain("almafa");
    });
    $httpBackend.flush();
  });


  it('#getOccupationList should pass the error forward if error happens in /occupations ', function (done) {
    $httpBackend.expectGET('/occupations').respond(500, 'Raptors everywhere!');
    bs.getOccupationList().then(function() {
      expect(false).to.be.true;
    },function(reason) {
      expect(reason).to.be.equal("Raptors everywhere!");
      done();
    });
    $httpBackend.flush();
  });

  it('#sendSignupForm should send the form to /signup', function () {
    $httpBackend.expectPOST('/signup').respond(200, '{"status":200}');
    bs.sendSignupForm().then(function(data) {
      expect(data).to.be.undefined;
    });
    $httpBackend.flush();
  });

  it('#sendSignupForm should pass the error forward if error happens in /signup', function (done) {
    $httpBackend.expectPOST('/signup').respond(500, 'Raptors everywhere!');
    bs.sendSignupForm().then(function(data) {
        expect(false).to.be.true;
    }, function(reason) {
      expect(reason).to.be.equal("Raptors everywhere!");
      done();
    });
    $httpBackend.flush();
  });

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

});
