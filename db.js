var mongoose = require('mongoose');
// var monk = require('monk');
var Hands = require('./models/hands');


module.exports = {
	connect: function(){
	  mongoose.connect(process.env.MONGODB_URI || 'localhost/hands');
    return mongoose.connection;
	},
	persist: function(){
		return mongoose.connection;
	}
	// get: function(collection){
	//   return db.find(collection);
	// }
};
