/**
 * Created by sufu on 11/7/16.
 */
var base62 = require("base62");

var UrlModel = require("../models/urlModel");

var getShortUrl = function (longUrl, callback) {
    console.log("getShortUrl");

    if (longUrl.indexOf("http") == -1) {
        longUrl = "http://" + longUrl;
    }

    UrlModel.findOne({longUrl: longUrl}, function (err, data) {
        if (data) {
            callback(data);
        } else {
            generateShortUrl(function (shortUrl) {
                var url = new UrlModel({
                    shortUrl: shortUrl,
                    longUrl: longUrl
                });
                url.save();
                callback(url);
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

    UrlModel.findOne({shortUrl: shortUrl}, function (err, data) {
        callback(data);
    });

}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
