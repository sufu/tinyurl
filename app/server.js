/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var app = express();
var restRouter = require("./routers/rest");
var redirectRouter = require("./routers/redirect");
var indexRouter = require("./routers/index");

var mongoose = require("mongoose");

mongoose.connect("mongodb://user:user@ds019766.mlab.com:19766/tinyurl");

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/v1", restRouter);

app.use("/", indexRouter);

app.use("/:shortUrl", redirectRouter);

app.listen(3000);
