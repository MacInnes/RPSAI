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
    // run computer choice logic here and output a JSON ex: {computer choice: "rock"}
    hands.find({user: req.user.username}, {"_id": 0, "userChoice": 1}, function(err, data){
      var userArray = data[0]["userChoice"];
      userArray.pop();
      var recentChoices = userArray.slice(-3);
      var choices = [];
      for (var i = 0; i < userArray.length; i++){
        if (recentChoices[0] === userArray[i] && recentChoices[1] === userArray[i+1] && recentChoices[2] === userArray[i+2]){
          if (userArray[i+3] != undefined){
            choices.push(userArray[i+3])
          }
        }
      }
      console.log(choices);
      var choicesObj = choices.reduce(function(prev, curr){
        if (prev[curr]){
          prev[curr]++;
          return prev;
        } else {
          prev[curr] = 1;
          return prev;
        }
      }, {})
      console.log(choicesObj);
      var max = 0;
      var choice;
      for (prop in choicesObj){
        if (choicesObj[prop] > max){
          max = choicesObj[prop];
          choice = prop;
        }
      }
      var cpuChoice = {}; 
      if (choice === "Rock"){
        cpuChoice.choice = "Paper";
      } else if (choice === "Paper"){
        cpuChoice.choice = "Scissors";
      } else if (choice === "Scissors"){
        cpuChoice.choice = "Rock";
      }
      console.log(cpuChoice);
    });
  })
})




module.exports = router;