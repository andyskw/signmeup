var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var signup = require("../../../routes/signup");
chai.use(sinonChai);



  describe("routes: signup", function() {

    var log, config;
    var processPost, res;
    beforeEach(function () {
      log = {
        info: sinon.spy(),
        warn: sinon.spy(),
        trace: sinon.spy()
      }
      conf = {};
      var json = function() {
        return  {
          json: function(data) {
            responseData = data;
          }
        };
      };
      res = {status: sinon.spy(json)};
      processPost = signup.initRoute(conf, log);

    });

    it("should set the response status to 200, if the input was valid", function() {

        var req = {
          body: {name: "Almafa", "email": "abc@bde.hu"}
        };

        processPost(req,res);

        expect(res.status).to.have.been.calledWith(200);
    });

    it("should set the response status to 400, if the input was invalid", function() {

        var req = {
          body: {name: "", "email": "abc@bde.hu"}
        };

        processPost(req,res);

        expect(res.status).to.have.been.calledWith(400);
    });

    it("should set the response status to 400, if no input was provided", function() {

        var req = {
        };

        processPost(req,res);

        expect(res.status).to.have.been.calledWith(400);
    });

  });
