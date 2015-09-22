var rockBtn = document.getElementById("Rock");
var paperBtn = document.getElementById("Paper");
var scissorsBtn = document.getElementById("Scissors");
var result = document.getElementById("result");
var playerScore = document.getElementById("playerScore");
var computerScore = document.getElementById("computerScore");
var userChoice;
var cpuChoice;
var method;



rockBtn.addEventListener("click", function(){
  userChoice = "Rock";
  winner(userChoice, cpuChoice); // may need to move winner function to server side as well
  
  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice, //may need to exclude the cpuChoice here, since it'll be built server side
      cpuChoice: cpuChoice},
    success: function(data){
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  })
})

paperBtn.addEventListener("click", function(){
  userChoice = "Paper";
  winner(userChoice, cpuChoice);

  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice, //may need to exclude the cpuChoice here, since it'll be built server side
      cpuChoice: cpuChoice},
    success: function(data){
      console.log(data)
    },
    error: function(err){
      console.log(err);
    }
  })
})

scissorsBtn.addEventListener("click", function(){
  userChoice = "Scissors";
  winner(userChoice, cpuChoice);

  $.ajax({
    url: '/game',
    method: 'post',
    data: {userChoice: userChoice, //may need to exclude the cpuChoice here, since it'll be built server side
      cpuChoice: cpuChoice},
    success: function(data){
      console.log(data)
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
}

function cpuWin(){
  result.innerHTML = "CPU wins! " + cpuChoice + method + userChoice;
  computerScore.innerHTML++
}

function playerWin(){
  result.innerHTML = "Player wins! " + userChoice + method + cpuChoice;
  playerScore.innerHTML++
}



