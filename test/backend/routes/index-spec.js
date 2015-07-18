var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var index = require("../../../routes/index");
chai.use(sinonChai);



  describe("routes: index", function () {


  it("should generate a template", function() {
      var processGet = index.initRoute(null, null);
      var req = {};
      var res = {render: sinon.spy()};
      processGet(req,res);
      expect(res.render).to.have.been.called;
  });

});
