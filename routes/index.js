"use strict"
var config = null;
var log = null;

exports.initRoute = function(conf, l) {
  config = conf;
  log = l;
  return processGet;
}

function processGet(req,res) {
  res.render('index', { title: 'Express' });
}
