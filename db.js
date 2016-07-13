var mongoose = require('mongoose');
var monk = require('monk');
var db;

module.exports = {
	connect: function(){
	  db = monk(process.env.MONGODB_URI || 'localhost/hands');
	  mongoose.connect('mongodb://' + process.env.MONGODB_URI || 'localhost/hands');
	},
	get: function(collection){
	  return db.get(collection);
	}
};
