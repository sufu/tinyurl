/**
 * Created by sufu on 11/18/16.
 */
var geoip = require("geoip-lite");
var RequestModel = require("../models/requestModel");

var logRequest = function (shortUrl, req) {
    console.log("logRequest");
    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    reqInfo.referer = req.headers.referer || "Unknown";
    reqInfo.platform = req.useragent.platform || "Unknown";
    reqInfo.browser = req.useragent.browser || "Unknown";

    var ip = req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

    var geo = geoip.lookup(ip);
    if (geo) {
        reqInfo.country = geo.country;
    } else {
        reqInfo.country = "Unknown";
    }
    reqInfo.timestamp = new Date();
    var request = new RequestModel(reqInfo);

    console.log(reqInfo);

    request.save();
}

var getUrlInfo = function (shortUrl, info, callback) {
    if (info === "totalClicks") {
        RequestModel.count({ shortUrl: shortUrl }, function (err, data) {
            callback(data);
        });
        return;
    }

    var groupId = "";
    if (info === "hour") {
        groupId = {
            year: { $year: "$timestamp"},
            month: { $month: "$timestamp"},
            day: { $dayOfMonth: "$timestamp"},
            hour: { $hour: "$timestamp"},
            minutes: { $minute: "$timestamp"}
        }
    } else if (info === "day") {
        groupId = {
            year: { $year: "$timestamp"},
            month: { $month: "$timestamp"},
            day: { $dayOfMonth: "$timestamp"},
            hour: { $hour: "$timestamp"}
        }
    } else if (info === "month") {
        groupId = {
            year: { $year: "$timestamp"},
            month: { $month: "$timestamp"},
            day: { $dayOfMonth: "$timestamp"}
        }
    } else {
        groupId = "$" + info;
    }

    RequestModel.aggregate([
        {
            $match: {
                shortUrl: shortUrl
            }
        },
        {
            $sort: {
                timestamp: -1
            }
        },
        {
            $group: {
                _id: groupId,
                count: { $sum: 1 }
            }
        }
    ], function (err, data) {
        callback(data);
    });
};

module.exports = {
    logRequest: logRequest,
    getUrlInfo: getUrlInfo
}