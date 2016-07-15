var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hands = new Schema({
	user: String,
	userChoice: [String],
	compChoice: [String],
	result: [String]
});

hands.insert = function(obj, cb){
	obj.save(function(err){
		if (err){
			return err
		} else {
			return cb();
		}
	})
}


module.exports = mongoose.model('Hands', hands);
