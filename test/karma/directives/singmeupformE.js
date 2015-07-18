"use strict"

describe("Signmeupform directive", function() {

  var $compile,
       $rootScope,
       $httpBackend;

  beforeEach(function() {
    module('signmeupform');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
   $httpBackend = _$httpBackend_;
   $compile = _$compile_;
   $rootScope = _$rootScope_;
 }));

  it("should try to access it's template", function () {
    // Compile a piece of HTML containing the directive
     $httpBackend.expectGET('/templates/signup-form.html').respond(200, '');
     var element = $compile("<signmeup-form></signmeup-form>")($rootScope);
     $rootScope.$digest();
  });

});
