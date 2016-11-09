/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlService = require("../services/urlService");

router.post("/urls", jsonParser, function (req, res) {
    console.log(req.body.longUrl);
    var longUrl = req.body.longUrl;
    var shortUrl = urlService.getShortUrl();
    res.json({
        shortUrl: shortUrl,
        longUrl: longUrl
    });
});

module.exports = router;

