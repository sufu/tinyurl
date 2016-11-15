/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var router = express.Router();
var urlService = require("../services/urlService");

router.get("*", function (req, res) {
    var shortUrl = req.originalUrl.slice(1);
    console.log("redirect");
    console.log(shortUrl);
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.sendFile("404.html", {root: __dirname + "../public/views/"})
        }
    });
});


module.exports = router;
