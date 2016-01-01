var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app);

app.use("/", express.static(__dirname+"/"));

server.listen(80);