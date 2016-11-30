/**
 * Created by sufu on 11/9/16.
 */

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    var options = {root: __dirname + '/../public/views/'};
    res.sendFile("index.html", options, function (err) {
        if (err) {
            //console.log(err);
            //console.log("error sending index.html");
        } else {
            console.log("Sent: index.html");
        }
    });
});



module.exports = router;