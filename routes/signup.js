"use strict"

var requestValidator = require("../util/signup-request-validator");
var ResponseBuilder = require("../util/response-builder");

var config = null;
var log = null;
exports.initRoute = function(conf, l) {
  config = conf;
  log = l;
  return processPost;
}

function processPost(req,res) {
  log.trace("POST /signup Received request body:", req.body);
  var validateResult = new requestValidator().validateRequest(req.body);
  var response = new ResponseBuilder();
  if (validateResult.isValid) {
    response.setStatus(200);
  } else {
    response.setStatus(400).setError(validateResult.issues);
  }

  res.status(response.status).json(response.build());
}
