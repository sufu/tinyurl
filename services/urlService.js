/**
 * Created by sufu on 11/7/16.
 */
var base62 = require("base62");

var shortToLong = {};
var longToShort = {};

var getShortUrl = function (longUrl) {
    console.log("getShortUrl");

    if (longUrl.indexOf("http") == -1) {
        longUrl = "http://" + longUrl;
    }

    if (longToShort[longUrl] == null) {
        var shortUrl = generateShortUrl();
        shortToLong[shortUrl] = longUrl;
        longToShort[longUrl] = shortUrl;
        return shortUrl;
    } else {
        return longToShort[longUrl];
    }
}

var generateShortUrl = function () {
    return base62.encode(Object.keys(longToShort).length);
}

var getLongUrl = function (shortUrl) {
    console.log("getLongUrl");
    console.log(shortUrl);
    if (shortToLong[shortUrl] == null) {
        console.log("cannot find long Url");
    } else {
        return shortToLong[shortUrl];
    }
}

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
