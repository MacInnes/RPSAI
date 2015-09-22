// var express = require('express');
// var router = express.Router();
// var db = require('monk')('localhost/rps');
// var users = db.get('users');
// var hands = db.get('hands');

var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var db = require('monk')('localhost/hands');
var hands = db.get('hands')


router.get('/', function(req, res, next) {
  res.render('game', { title: 'Rock Paper Scissors', user: req.user });
});

router.post('/', function(req, res){
  hands.update({user: req.user.username}, {
    $push: {userChoice: req.body.userChoice, cpuChoice: req.body.cpuChoice}
  }, function(){
    // run computer choice logic here as a JSON ex: {computer choice: "rock"}
    var myCursor = hands.find({user: req.user.username}, {"_id": 0, "userChoice": 1}, function(err, data){
      console.log(myCursor.toArray());
    });
  })
})




module.exports = router;