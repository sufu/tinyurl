/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var app = express();
var restRouter = require("./routers/rest");
var redirectRouter = require("./routers/redirect");
var indexRouter = require("./routers/index");

app.use("/api/v1", restRouter);
app.use("/:shortUrl", redirectRouter);
app.use("/", indexRouter);

app.listen(3000);
