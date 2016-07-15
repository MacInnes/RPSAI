var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hands = new Schema({
    username: String,
    password: String
});