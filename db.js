var mongoose = require('mongoose');
var monk = require('monk');
var db;

module.exports = {
	connect: function(){
	  mongoose.connect(process.env.MONGODB_URI || 'localhost/hands');
    db = monk('mongodb://' + process.env.MONGODB_URI);
	  
	},
	get: function(collection){
	  return db.get(collection);
	}
};
