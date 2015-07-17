var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var SignupRequestValidator = require("../util/signup-request-validator");
chai.use(sinonChai);



describe("signup-request-validator", function () {
  var data;
  beforeEach(function () {
    data = {
      name: 'aaa',
      email: 'almafa@kortefa.com',
      birthdate: '1971-01-01',
      occupation: 'Raptor keeper'
    }
  });

  it("should return with a VALID result when every field is correct", function() {

    var validator = new SignupRequestValidator();

    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.true;

  });

  it("should return with an INVALID/MISSING result when name field is missing", function() {
    delete data.name;
    var validator = new SignupRequestValidator();

    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.false;
    expect(result.issues.length).to.be.equal(1);
    expect(result.issues).to.contain({field: "name", issue:validator.issues.MISSING});

  });

  it("should return with an INVALID/MISSING result when email field is missing", function() {
    delete data.email;
    var validator = new SignupRequestValidator();

    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.false;
    expect(result.issues.length).to.be.equal(1);
    expect(result.issues).to.contain({field: "email", issue:validator.issues.MISSING});

  });

  it("should return with an INVALID/INVALID result when email field is invalid", function() {
    data.email = "hello";

    var validator = new SignupRequestValidator();
    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.false;
    expect(result.issues.length).to.be.equal(1);

    expect(result.issues).to.contain({field: "email", issue:validator.issues.INVALID});

  });

  it("should return with an VALID result when occupation field is missing", function() {
    delete data.birthdate;

    var validator = new SignupRequestValidator();
    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.true;
  });

  it("should return with an VALID result when birthdate field is missing", function() {
    delete data.occupation;

    var validator = new SignupRequestValidator();
    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.true;
  });

  it("should return with an INVALID/INVALID result when age is < 18", function() {
    //should be working after 18 years as well...
    data.birthdate = new Date();

    var validator = new SignupRequestValidator();
    var result = validator.validateRequest(data);

    expect(result.isValid).to.be.false;
    expect(result.issues.length).to.be.equal(1);

    expect(result.issues).to.contain({field: "birthdate", issue:validator.issues.INVALID});

  });

});
