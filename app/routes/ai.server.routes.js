var ai = require("../controllers/ai.server.controller");
var express = require("express");
var router = express.Router();

module.exports = function (app) {
  app.post("/api/training", ai.train);
};
