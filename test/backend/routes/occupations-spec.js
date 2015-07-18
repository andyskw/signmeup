var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var occupations = require("../../../routes/occupations");
chai.use(sinonChai);



describe("routes: occupation", function () {

  var processGet, req, res;
  var responseData;
  beforeEach(function () {
    req = {};
    var json = function() {
      return  {
        json: function(data) {
          responseData = data;
        }
      };
    };
    res = {status: sinon.spy(json)};
    processGet = occupations.initRoute(null, null);
  });

  it("should set the response status to 200", function() {
      processGet(req,res);
      
      expect(res.status).to.have.been.calledWith(200);
  });

  it("should send response data with the list of the occupations", function() {
      processGet(req,res);

      expect(res.status).to.have.been.calledWith(200);
      expect(responseData).not.to.be.undefined;
      expect(responseData.data).to.exist;
      expect(responseData.data).to.be.instanceOf(Array);
  });

});
