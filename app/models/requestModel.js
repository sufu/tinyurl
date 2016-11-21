/**
 * Created by sufu on 11/12/16.
 */

var mongoose = require("mongoose");

var requestSchema = new mongoose.Schema({
    shortUrl: String,
    referer: String,
    platform: String,
    browser: String,
    country: String,
    timestamp: Date
});

var requestModel = mongoose.model("requestModel", requestSchema);
module.exports = requestModel;