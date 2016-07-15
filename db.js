var mongoose = require('mongoose');
// var monk = require('monk');
var db;

function connect(){
  mongoose.connect(process.env.MONGODB_URI || 'localhost/hands');
  db = mongoose.connection;
};

function get(collection){
  return db.findOne(collection);
};
