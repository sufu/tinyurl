/**
 * Created by sufu on 11/7/16.
 */
var base62 = require("base62");

var redis = require("redis");
var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;

var redisClient = redis.createClient(port, host);

var UrlModel = require("../models/urlModel");

var getShortUrl = function (longUrl, callback) {
    console.log("getShortUrl");

    if (longUrl.indexOf("http") == -1) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function (err, shortUrl) {
        if (shortUrl) {
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        } else {
            UrlModel.findOne({longUrl: longUrl}, function (err, data) {
                if (data) {
                    callback(data);
                    redisClient.set(data.shortUrl, data.longUrl);
                    redisClient.set(data.longUrl, data.shortUrl);
                } else {
                    generateShortUrl(function (shortUrl) {
                        var url = new UrlModel({
                            shortUrl: shortUrl,
                            longUrl: longUrl
                        });
                        url.save();
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(url);
                    });
                }
            });
        }
    });


}



var generateShortUrl = function (callback) {
    UrlModel.count({}, function (err, data) {
        callback(base62.encode(data));
    });
}

var getLongUrl = function (shortUrl, callback) {
    console.log("getLongUrl");
    console.log(shortUrl);

    redisClient.get(shortUrl, function (err, longUrl) {
        if (longUrl) {
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        } else {
            UrlModel.findOne({shortUrl: shortUrl}, function (err, data) {
                if (data) {
                    callback(data);
                    redisClient.set(data.shortUrl, data.longUrl);
                    redisClient.set(data.longUrl, data.shortUrl);
                }
            });
        }
    });


}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
