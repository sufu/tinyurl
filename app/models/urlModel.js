/**
 * Created by sufu on 11/12/16.
 */

var mongoose = require("mongoose");

var urlSchema = new mongoose.Schema({
    shortUrl: String,
    longUrl: String
});

var urlModel = mongoose.model("urlModel", urlSchema);
module.exports = urlModel;