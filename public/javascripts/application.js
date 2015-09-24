var rockBtn = document.getElementById("Rock");
var paperBtn = document.getElementById("Paper");
var scissorsBtn = document.getElementById("Scissors");
var result = document.getElementById("result");
var playerScore = document.getElementById("playerScore");
var computerScore = document.getElementById("computerScore");
var playerTotalField = document.getElementById("playerTotal");
var computerTotalField = document.getElementById("computerTotal");
var playerTotal;
var computerTotal;
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

      winner(userChoice, cpuChoice);
    },
    error: function(err){
      console.log(err);
    }
  })
  
})

function winner(user, cpu){
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
  // result.style.fontSize = "30px";
  setTimeout(function(){
    result.style.fontSize = "";
  }, 500)
}

function cpuWin(){
  result.innerHTML = "CPU wins! " + cpuChoice + method + userChoice;
  result.style.color = "#FF0000";
  // result.style.fontSize = "30px";
  computerScore.innerHTML++;
  computerTotalField.innerHTML = computerTotal;

  computerScore.style.color = "#FF0000";
  // computerScore.style.fontSize = "30px";
  computerTotalField.style.color = "#FF0000";
  // computerTotalField.style.fontSize = "30px";
  
  setTimeout(function(){
    computerScore.style.color = "";
    computerScore.style.fontSize = "";
    computerTotalField.style.color = "";
    computerTotalField.style.fontSize = "";
    result.style.color = "";
    result.style.fontSize = "";

  }, 500)
}

function playerWin(){
  result.innerHTML = "You win! " + userChoice + method + cpuChoice;
  result.style.color = "#00FF00";
  // result.style.fontSize = "30px";
  playerScore.innerHTML++;
  playerTotalField.innerHTML = playerTotal;

  playerScore.style.color = "#00FF00";
  // playerScore.style.fontSize = "30px";
  playerTotalField.style.color = "#00FF00";
  // playerTotalField.style.fontSize = "30px";

  setTimeout(function(){
    playerScore.style.color = "";
    playerScore.style.fontSize = "";
    playerTotalField.style.color = "";
    playerTotalField.style.fontSize = "";
    result.style.color = "";
    result.style.fontSize = "";
  }, 500)
}



