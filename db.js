var mongoose = require('mongoose');
// var monk = require('monk');
var Hands = require('./models/hands');
var db;

module.exports = {
	connect: function(){
	  mongoose.connect(process.env.MONGODB_URI || 'localhost/hands');
    db = mongoose.connection;
	}
	// get: function(collection){
	//   return db.find(collection);
	// }
};
