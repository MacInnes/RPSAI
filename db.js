var mongoose = require('mongoose');
var monk = require('monk');
var db;

function connect(){
  db = monk(process.env.MONGODB_URI || 'localhost/hands');
  mongoose.connect(process.env.MONGODB_URI || 'localhost/hands');
}