"use strict"

var config = null;
var log = null;
exports.initRoute = function(conf, l) {
  config = conf;
  log = l;
    return processPost;
}

function processPost(req,res) {
  log.debug("POST /signup Received request body:", req.body);

  res.status(201).json(req.body);
}
