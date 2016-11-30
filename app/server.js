/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var restRouter = require("./routers/rest");
var redirectRouter = require("./routers/redirect");
var indexRouter = require("./routers/index");
var useragent = require("express-useragent");

var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;
var redisClient = redis.createClient(port, host);

var mongoose = require("mongoose");
mongoose.connect("mongodb://user:user@ds019766.mlab.com:19766/tinyurl");

app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(useragent.express());
app.use("/api/v1", restRouter);
app.use("/", indexRouter);
app.use("/:shortUrl", redirectRouter);

http.listen(3000);
console.log("http is listening 3000");

io.on('connection', function (socket) {
    socket.on('registerShortUrl', function (shortUrl) {
        redisClient.subscribe(shortUrl, function () {
            socket.shortUrl = shortUrl;
            console.log("Subscribed to " + shortUrl + " channel via redis");
        });
        redisClient.on('message', function (channel, message) {
            if (message === socket.shortUrl) {
                socket.emit('shortUrlUpdated');
            }
        });
    });
    socket.on('disconnect', function () {
        if (socket.shortUrl == null) {
            return;
        }
        redisClient.unsubscribe(socket.shortUrl, function () {
            console.log("Unsubscribed channel " + socket.shortUrl + " from redis");
        });
    });
});
