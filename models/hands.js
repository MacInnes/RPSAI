var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hands = new Schema({
	user: String,
	userChoice: [String],
	compChoice: [String],
	result: [String]
});


module.exports = mongoose.model('Hands', hands);