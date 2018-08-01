"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var PORT = process.env.PORT || 5000;
express().use(express.static(path.join(__dirname, 'dist')))
    .listen(PORT, function () { return console.log("Listening on " + PORT); });
