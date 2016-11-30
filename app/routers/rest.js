/**
 * Created by sufu on 11/7/16.
 */

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlService = require("../services/urlService");
var statsService = require("../services/statsService");

router.post("/urls", jsonParser, function (req, res) {
    //console.log("rest post ", req.body.longUrl);
    var longUrl = req.body.longUrl;
    urlService.getShortUrl(longUrl, function (url) {
        //console.log("rest post ", url);
        res.json(url);
    });
});


router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    //console.log("router get shortUrl:", shortUrl);
    urlService.getLongUrl(shortUrl, function (url) {
        if (url) {
            res.json(url);
        } else {
            res.status(404).send("Not Exist!");
        }
    });
});

router.get("/urls/:shortUrl/:info", function (req, res) {
    statsService.getUrlInfo(req.params.shortUrl, req.params.info, function (data) {
        if (data) {
            //console.log("get info ", data);
            res.json(data);
        } else {
            //console.log(req.params.info, "get info error data: ", data);
            res.json({no: "input"});
        }
    });
});

module.exports = router;

