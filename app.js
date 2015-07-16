"use strict"
var http = require("http");
var express = require('express');


exports.startApplication = function(config, log) {
  var app = express();
  var router = require("express").Router();
  initApplication(config, app, router);

  http.createServer(app).listen(app.get('port'), function() {
       log.info("SignMeUP API test started on port " + app.get('port'));
  }).on('error', function(err) {
    log.error("Error while starting Express. Shutting down the application.", err);
  });

};

function initApplication(config, app, router) {
  app.set('port', config.express.port);
  app.use(express.static('public'));

};
