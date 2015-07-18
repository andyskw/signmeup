var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var ResponseBuilder = require("../../../util/response-builder");
chai.use(sinonChai);



describe("response-builder", function () {


  it("should generate a response if no setup is provided", function() {
      var response = new ResponseBuilder();

      var resp = response.build();

      expect(resp.status).to.be.equal(1);
  });

  it("should generate a response with data if data is provided", function() {
      var response = new ResponseBuilder();

      var resp = response.setData("hello").build();

      expect(resp.status).to.be.equal(1);
      expect(resp.data).to.be.equal("hello");
  });

  it("should generate a response with error if error is provided", function() {
      var response = new ResponseBuilder();

      var resp = response.setError("hello").build();

      expect(resp.status).to.be.equal(1);
      expect(resp.error).to.be.equal("hello");

  });

  it("should generate a response with error if error AND data is provided", function() {
      var response = new ResponseBuilder();

      var resp = response.setError("hello").setData("whatsup").build();

      expect(resp.status).to.be.equal(1);
      expect(resp.error).to.be.equal("hello");
      expect(resp.data).not.to.exist;

  });

  it("should generate a response with the given status code if it is provided", function() {
      var response = new ResponseBuilder();

      var resp = response.setStatus(2).build();

      expect(resp.status).to.be.equal(2);

  });

});
