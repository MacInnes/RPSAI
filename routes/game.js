var express = require('express');
var Hands = require('../models/hands');
var router = express.Router();
var db = require('../db');
// var connection = db.persist();
// var hands = connection.collection('hands');



router.get('/', function(req, res, next) {
  console.log('HANDS FROM GAME', hands);
  console.log("USER:", req.user.username);
  hands.find({user: req.user.username}, function(err, data){
    console.log('GAME ROUTE ERROR:', err);
    console.log('Game Route DATA:', data);
    if (data[0]){
      var totals = data[0]["result"];
      var initialPlayerTotal = 0;
      var initialComputerTotal = 0;
      var totalChoices = data[0]["userChoice"];
      var rock = 0;
      var paper = 0;
      var scissors = 0;
      if (totalChoices != undefined){
        for (var i = 0; i < totalChoices.length; i++){
          if(totalChoices[i] === "Rock"){
            rock++;
          } else if (totalChoices[i] === "Paper"){
            paper++;
          } else {
            scissors++;
          }
        }
        var rockPercent = (100 * (rock/totalChoices.length)).toFixed(2) + "%";
        var paperPercent = (100 * (paper/totalChoices.length)).toFixed(2) + "%";
        var scissorsPercent = (100 * (scissors/totalChoices.length)).toFixed(2) + "%";

        for (var i = 0; i < totals.length; i++){
          if (totals[i] === "win"){
            initialPlayerTotal++;
          } else if (totals[i] === "loss"){
            initialComputerTotal++;
          }
        }

        var winPercent = (100 * initialPlayerTotal/totals.length).toFixed(2) + "%";
        var lossPercent = (100 * initialComputerTotal/totals.length).toFixed(2) + "%";
        var tiePercent = (100 * (totals.length - (initialPlayerTotal + initialComputerTotal))/totals.length).toFixed(2) + "%";

        var tempTotal = initialComputerTotal;
        initialComputerTotal = initialComputerTotal + " (" + (100*(initialComputerTotal/(initialComputerTotal+initialPlayerTotal))).toFixed(0) + "%)";
        initialPlayerTotal = initialPlayerTotal + " (" + (100*(initialPlayerTotal/(initialPlayerTotal+tempTotal))).toFixed(0) + "%)"
      }
      res.render('game', { title: "RPS", 
          user: req.user, 
          playerTotal: initialPlayerTotal, 
          computerTotal: initialComputerTotal,
          rockPercent: rockPercent,
          paperPercent: paperPercent,
          scissorsPercent: scissorsPercent,
          winPercent: winPercent,
          lossPercent: lossPercent,
          tiePercent: tiePercent
      });
    } else {
      res.render('game', { title: "RPS", 
        user: req.user, 
        playerTotal: 0, 
        computerTotal: 0,
        rockPercent: 0,
        paperPercent: 0,
        scissorsPercent: 0,
        winPercent: 0,
        lossPercent: 0,
        tiePercent: 0
      });
    }

  });
});

router.post('/', function(req, res){
  hands.update({user: req.user.username}, {
    $push: {userChoice: req.body.userChoice }
  }, function(){
    // run computer choice logic here and output a JSON ex: {computer choice: "rock"}
    hands.find({user: req.user.username}, {"_id": 0, "userChoice": 1, "result": 1}, function(err, data){
      if (data[0]){
        var userArray = data[0]["userChoice"];
        var lastChoice = userArray.pop();
        var recentChoices = userArray.slice(-3);
        var choices = [];
        var prevResults = [];
        console.log("recent choices: " + recentChoices)
        if (userArray.length > 0){
          for (var i = 0; i < userArray.length; i++){
            if (recentChoices[0] === userArray[i] && recentChoices[1] === userArray[i+1] && recentChoices[2] === userArray[i+2] && userArray[i+3] != undefined){
              choices.push(userArray[i+3]);
              prevResults.push(data[0]["result"][i+3])
            } else if (recentChoices[1] === userArray[i] && recentChoices[2] === userArray[i+1] && userArray[i+2] != undefined){
              choices.push(userArray[i+2]);
              prevResults.push(data[0]["result"][i+2])
            }
          }
        };
        console.log("results: " + prevResults)
        if (choices.length === 0){
          console.log("RANDOM CHOICE")
          var random = Math.random();
          if (random < 0.333){
            choices.push("Rock");
          } else if (random < 0.666){
            choices.push("Paper");
          } else {
            choices.push("Scissors");
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
        var bestChoice = "choice";
        var playerTotal = "playerTotal";
        var computerTotal = "computerTotal";
        if (choice === "Rock"){
          cpuChoice[bestChoice] = "Paper";
        } else if (choice === "Paper"){
          cpuChoice[bestChoice] = "Scissors";
        } else if (choice === "Scissors"){
          cpuChoice[bestChoice] = "Rock";
        }
        var result;
        function winner(user, cpu){
          if (user === cpu){
            result = "tie";
          } else if (user === "Rock"){
            if (cpu === "Paper"){
              result = "loss";
            } else {
              result = "win";
            }
          } else if (user === "Paper"){
            if (cpu === "Scissors"){
              result = "loss";
            } else {
              result= "win";
            }
          } else if (user === "Scissors"){
            if (cpu === "Rock"){
              result = "loss";
            } else {
              result = "win";
            }
          }
        }
        winner(lastChoice, cpuChoice[bestChoice]);
        hands.update({user: req.user.username}, {
          $push: {compChoice: cpuChoice[bestChoice], result: result }}, function(){
            hands.find({user: req.user.username}, {"_id": 0, "result": 1}, function(err, data){
              var totals = data[0]["result"];
              cpuChoice[playerTotal] = 0;
              cpuChoice[computerTotal] = 0;
              for (var i = 0; i < totals.length; i++){
                if (totals[i] === "win"){
                  cpuChoice[playerTotal]++;
                } else if (totals[i] === "loss"){
                  cpuChoice[computerTotal]++;
                }
              }
              var winPercentage = "winPercentage";
              var lossPercentage = "lossPercentage";
              var tiePercentage = "tiePercentage";

              cpuChoice[winPercentage] = (100 * cpuChoice[playerTotal]/totals.length).toFixed(2) + "%";
              cpuChoice[lossPercentage] = (100 * cpuChoice[computerTotal]/totals.length).toFixed(2) + "%";
              cpuChoice[tiePercentage] = (100 * (totals.length - (cpuChoice[playerTotal] + cpuChoice[computerTotal]))/totals.length).toFixed(2) + "%";  


              var totalChoices = data[0]["userChoice"];
              console.log('TOTAL CHOICES:', totalChoices);
              var rock = 0;
              var paper = 0;
              var scissors = 0;
              for (var i = 0; i < totalChoices.length; i++){
                if(totalChoices[i] === "Rock"){
                  rock++;
                } else if (totalChoices[i] === "Paper"){
                  paper++;
                } else {
                  scissors++;
                }
              }
              var rockPercent = (100 * (rock/totalChoices.length)).toFixed(2) + "%";
              var paperPercent = (100 * (paper/totalChoices.length)).toFixed(2) + "%";
              var scissorsPercent = (100 * (scissors/totalChoices.length)).toFixed(2) + "%";
              var rockPercentage = "rockPercentage";
              var paperPercentage = "paperPercentage";
              var scissorsPercentage = "scissorsPercentage";
              cpuChoice[rockPercentage] = rockPercent;
              cpuChoice[paperPercentage] = paperPercent;
              cpuChoice[scissorsPercentage] = scissorsPercent;
              res.json(cpuChoice);
            })
            
        

        });
      } else {
        console.log('POST ROUTE ELSE STATEMENT');
        var choices = [];
        var random = Math.random();
        if (random < 0.333){
          choices.push("Rock");
        } else if (random < 0.666){
          choices.push("Paper");
        } else {
          choices.push("Scissors");
        }
        var cpuChoice = {};
        var bestChoice = "choice";
        var playerTotal = "playerTotal";
        var computerTotal = "computerTotal";
        if (choice === "Rock"){
          cpuChoice[bestChoice] = "Paper";
        } else if (choice === "Paper"){
          cpuChoice[bestChoice] = "Scissors";
        } else if (choice === "Scissors"){
          cpuChoice[bestChoice] = "Rock";
        }
        var result;
        function winner(user, cpu){
          if (user === cpu){
            result = "tie";
          } else if (user === "Rock"){
            if (cpu === "Paper"){
              result = "loss";
            } else {
              result = "win";
            }
          } else if (user === "Paper"){
            if (cpu === "Scissors"){
              result = "loss";
            } else {
              result= "win";
            }
          } else if (user === "Scissors"){
            if (cpu === "Rock"){
              result = "loss";
            } else {
              result = "win";
            }
          }
        }
        winner(lastChoice, cpuChoice[bestChoice]);
        hands.update({user: req.user.username}, {
          $push: {compChoice: cpuChoice[bestChoice], result: result }}, function(){
            Hands.find({user: req.user.username}, {"_id": 0, "result": 1}, function(err, data){
              var totals = data[0]["result"];
              cpuChoice[playerTotal] = 0;
              cpuChoice[computerTotal] = 0;
              for (var i = 0; i < totals.length; i++){
                if (totals[i] === "win"){
                  cpuChoice[playerTotal]++;
                } else if (totals[i] === "loss"){
                  cpuChoice[computerTotal]++;
                }
              }
              var winPercentage = "winPercentage";
              var lossPercentage = "lossPercentage";
              var tiePercentage = "tiePercentage";

              cpuChoice[winPercentage] = (100 * cpuChoice[playerTotal]/totals.length).toFixed(2) + "%";
              cpuChoice[lossPercentage] = (100 * cpuChoice[computerTotal]/totals.length).toFixed(2) + "%";
              cpuChoice[tiePercentage] = (100 * (totals.length - (cpuChoice[playerTotal] + cpuChoice[computerTotal]))/totals.length).toFixed(2) + "%";  


              var totalChoices = data[0]["userChoice"];
              console.log('TOTAL CHOICES:', totalChoices);
              var rock = 0;
              var paper = 0;
              var scissors = 0;
              for (var i = 0; i < totalChoices.length; i++){
                if(totalChoices[i] === "Rock"){
                  rock++;
                } else if (totalChoices[i] === "Paper"){
                  paper++;
                } else {
                  scissors++;
                }
              }
              var rockPercent = (100 * (rock/totalChoices.length)).toFixed(2) + "%";
              var paperPercent = (100 * (paper/totalChoices.length)).toFixed(2) + "%";
              var scissorsPercent = (100 * (scissors/totalChoices.length)).toFixed(2) + "%";
              var rockPercentage = "rockPercentage";
              var paperPercentage = "paperPercentage";
              var scissorsPercentage = "scissorsPercentage";
              cpuChoice[rockPercentage] = rockPercent;
              cpuChoice[paperPercentage] = paperPercent;
              cpuChoice[scissorsPercentage] = scissorsPercent;
              res.json(cpuChoice);
            })

        res.render('game', { title: "RPS", 
          user: req.user, 
          playerTotal: 0, 
          computerTotal: 0,
          rockPercent: 0,
          paperPercent: 0,
          scissorsPercent: 0,
          winPercent: 0,
          lossPercent: 0,
          tiePercent: 0
        });
      });
    }  
  })
})
});




module.exports = router;