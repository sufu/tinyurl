/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlService = require("../services/urlService");

router.post("/urls", jsonParser, function (req, res) {
    console.log("rest post ", req.body.longUrl);
    var longUrl = req.body.longUrl;
    urlService.getShortUrl(longUrl, function (url) {
        console.log("rest post ", url);
        res.json(url);
    });
});


router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    console.log("router get shortUrl:", shortUrl);
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.json(url);
        } else {
            res.status(404).send("Not Exist!");
        }
    });
});

module.exports = router;

