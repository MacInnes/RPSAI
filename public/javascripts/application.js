var rockBtn = document.getElementById("Rock");
var paperBtn = document.getElementById("Paper");
var scissorsBtn = document.getElementById("Scissors");
var result = document.getElementById("result");
var playerScore = document.getElementById("playerScore");
var computerScore = document.getElementById("computerScore");
var playerTotalField = document.getElementById("playerTotal");
var computerTotalField = document.getElementById("computerTotal");
var rockPercentField = document.getElementById("rockPercent");
var paperPercentField = document.getElementById("paperPercent");
var scissorsPercentField = document.getElementById("scissorsPercent");
var winPercentField = document.getElementById("winPercent");
var tiePercentField = document.getElementById("tiePercent");
var lossPercentField = document.getElementById("lossPercent");
var winPercent;
var tiePercent;
var lossPercent;
var rockPercent;
var paperPercent;
var scissorsPercent;
var playerTotal;
var computerTotal;
var playerTotalPercent;
var computerTotalPercent;
var userChoice;
var cpuChoice;
var method;



rockBtn.addEventListener("click", function(){
  userChoice = "Rock";
  
  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice}, //may need to exclude the cpuChoice here, since it'll be built server side
    success: function(data){
      console.log(data)
      cpuChoice = data.choice;
      playerTotal = data.playerTotal;
      computerTotal = data.computerTotal;
      rockPercent = data.rockPercentage;
      paperPercent = data.paperPercentage;
      scissorsPercent = data.scissorsPercentage;
      winPercent = data.winPercentage;
      tiePercent = data.tiePercentage;
      lossPercent = data.lossPercentage;
      winner(userChoice, cpuChoice);
    },
    error: function(err){
      console.log(err);
    }
  })
  
})

paperBtn.addEventListener("click", function(){
  userChoice = "Paper";

  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice, //may need to exclude the cpuChoice here, since it'll be built server side
      cpuChoice: cpuChoice},
    success: function(data){
      console.log(data)
      cpuChoice = data.choice;
      playerTotal = data.playerTotal;
      computerTotal = data.computerTotal;
      rockPercent = data.rockPercentage;
      paperPercent = data.paperPercentage;
      scissorsPercent = data.scissorsPercentage;
      winPercent = data.winPercentage;
      tiePercent = data.tiePercentage;
      lossPercent = data.lossPercentage;
      winner(userChoice, cpuChoice);
    },
    error: function(err){
      console.log(err);
    }
  })
  
})

scissorsBtn.addEventListener("click", function(){
  userChoice = "Scissors";

  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice}, //may need to exclude the cpuChoice here, since it'll be built server side
    success: function(data){
      console.log(data)
      cpuChoice = data.choice;
      playerResult = data.result;
      playerTotal = data.playerTotal;
      computerTotal = data.computerTotal;
      rockPercent = data.rockPercentage;
      paperPercent = data.paperPercentage;
      scissorsPercent = data.scissorsPercentage;
      winPercent = data.winPercentage;
      tiePercent = data.tiePercentage;
      lossPercent = data.lossPercentage;
      winner(userChoice, cpuChoice);
    },
    error: function(err){
      console.log(err);
    }
  })
  
})

function winner(user, cpu){
  rockPercentField.innerHTML = rockPercent;
  paperPercentField.innerHTML = paperPercent;
  scissorsPercentField.innerHTML = scissorsPercent;
  winPercentField.innerHTML = winPercent;
  tiePercentField.innerHTML = tiePercent;
  lossPercentField.innerHTML = lossPercent;
  
  if (user === cpu){
    return tie();
  } else if (user === "Rock"){
    if (cpu === "Paper"){
      method = " covers ";
      return cpuWin();
    } else {
      method = " crushes ";
      return playerWin();
    }
  } else if (user === "Paper"){
    if (cpu === "Scissors"){
      method = " cut ";
      return cpuWin();
    } else {
      method = " covers ";
      return playerWin();
    }
  } else if (user === "Scissors"){
    if (cpu === "Rock"){
      method = " crushes "
      return cpuWin();
    } else {
      method = " cut ";
      return playerWin();
    }
  }
}

function tie(){
  result.innerHTML = "Tie.  You both chose " + userChoice;

}

function cpuWin(){
  result.innerHTML = "CPU wins! " + cpuChoice + method + userChoice;
  result.style.color = "#FF0000";
  computerScore.innerHTML++;

  computerTotalPercent = (100*(computerTotal/(computerTotal + playerTotal))).toFixed(0) + "%";
  computerTotalField.innerHTML = computerTotal + " (" + computerTotalPercent + ")";

  computerScore.style.color = "#FF0000";
  computerTotalField.style.color = "#FF0000";
  lossPercentField.style.color = "#FF0000";


  setTimeout(function(){
    computerScore.style.color = "";
    computerScore.style.fontSize = "";
    computerTotalField.style.color = "";
    computerTotalField.style.fontSize = "";
    result.style.color = "";
    result.style.fontSize = "";
    lossPercentField.style.color = "";

  }, 500)
}

function playerWin(){
  result.innerHTML = "You win! " + userChoice + method + cpuChoice;
  result.style.color = "#00FF00";

  playerScore.innerHTML++;
  
  playerTotalPercent = (100*(playerTotal/(computerTotal + playerTotal))).toFixed(0) + "%";
  playerTotalField.innerHTML = playerTotal + " (" + playerTotalPercent + ")";

  playerScore.style.color = "#00FF00";

  playerTotalField.style.color = "#00FF00";

  winPercentField.style.color = "#00FF00";

  setTimeout(function(){
    playerScore.style.color = "";
    playerScore.style.fontSize = "";
    playerTotalField.style.color = "";
    playerTotalField.style.fontSize = "";
    result.style.color = "";
    result.style.fontSize = "";
    winPercentField.style.color = "";
  }, 500)
}

// $(".stats") figure out how to show/hide the stats



