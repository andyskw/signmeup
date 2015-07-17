"use strict"

var config = null;
var log = null;
exports.initRoute = function(conf, l) {
  config = conf;
  l = log;
    return process;
}

function process(req,res) {
  res.json({status: 1});
}
