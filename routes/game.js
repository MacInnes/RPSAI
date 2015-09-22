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
  hands.insert({user: req.user.username, playerChoice: req.body.playerChoice});
  console.log(res);
})




module.exports = router;