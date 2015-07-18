var _ = require("lodash");
var proxyquire = require("proxyquire");
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var EventEmitter = require("events").EventEmitter;


describe("App starter", function () {
  it("#startApplication should throw an exception config object is missing", function() {
    var http = {createServer : sinon.stub()};
    var app = proxyquire("../../app", {'http': http});
    var threw = false;

    try {
      app.startApplication(null, null)
    } catch (ex) {
      threw = true;
    }
    expect(threw).to.be.true;

  });

  it("#startApplication should throw an exception logger object is missing", function() {
    var http = {createServer : sinon.stub()};
    var app = proxyquire("../../app", {'http': http});
    var threw = false;

    try {
      app.startApplication({}, null)
    } catch (ex) {
      threw = true;
    }
    expect(threw).to.be.true;

  });

  it("#startApplication should init the application with the configured port number", function() {

    var http = {
      createServer : function(app) {
        expect(app.get('port')).to.be.equal(1);
        var ret = Object.create(EventEmitter.prototype);
        return {
          listen : function (a,b) {
            return ret;
          }
        };
      }
    };
    var app = proxyquire("../../app", {'http': http});
    var threw = false;

    var config = {
      express : { port: 1}
    }
    app.startApplication(config, {})

  });

  it("#startApplication should rethrow the exception if Express cannot be started", function() {

    var ret = Object.create(EventEmitter.prototype);
    var http = {
      createServer : function(app) {
        expect(app.get('port')).to.be.equal(1);
        return {
          listen : function (a,b) {
            return ret;
          }
        };
      }
    };
    var app = proxyquire("../../app", {'http': http});
    var threw = false;

    var config = {
      express : { port: 1}
    }
    app.startApplication(config, {});

    try {
      ret.emit('error', {});
    } catch(ex) {
      threw = true;
    }

    expect(threw).to.be.true;
  });

  it("#startApplication should log if the app is started successfully", function() {
    var ret = Object.create(EventEmitter.prototype);
    var http = {
      createServer : function(app) {
        expect(app.get('port')).to.be.equal(1);
        return {
          listen : function (a,b) {
            b();
            return ret;
          }
        };
      }
    };
    var app = proxyquire("../../app", {'http': http});
    var threw = false;

    var config = {
      express : { port: 1}
    }
    var log = {info: sinon.spy()};
    app.startApplication(config, log);

    expect(log.info).to.be.called;
  });

});
