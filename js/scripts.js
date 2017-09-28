//Business Logic
var turnScore = 0;
var turnIndex = 0;

function Player(playername, playerscore) {
  this.playername = playername;
  this.playerscore = playerscore;
}

Player.prototype.roll = function() {
  var currentRoll = Math.floor(Math.random() * 6) + 1; //rolling the dice

  if (currentRoll === 1) {
    turnScore = 0;
    updateDisplay(currentRoll);
    nextTurn();       //next turn and no score
  }
  else {
    turnScore += currentRoll;
    updateDisplay(currentRoll);
  }
}

Player.prototype.hold = function() {
  this.playerscore += turnScore;
}

var nextTurn = function() {
  alert("Next Turn");
  turnScore = 0;
  if (turnIndex === 0) {    // define something named turnIndex to determine the players turn based on the simple 0 or 1 index assigned as there are just 2 players
    turnIndex = 1;        //rightnow, if the turnIndex is player1, once the nextturn is called, its set to 1 saying that its the turn of player2
  } else {
    turnIndex = 0;
  }

  $(".playerone-box").toggleClass("active-user");  //switch bwtween users
  $(".playertwo-box").toggleClass("active-user");
};

var player1 = new Player(prompt("Player 1, enter your name."), 0); //prompt user names before the page loads, which will later be passed as player names once the page loads
var player2 = new Player(prompt("Player 2, enter your name."), 0);
var players = [player1, player2];

var updateDisplay = function(currentRoll) {
  $("#player-current-roll" + turnIndex).text(currentRoll);
  $("#player-turnscore-total" + turnIndex).text(turnScore);
}

//userInterface Logic
$(function() {
  $("#player0").text(player1.playername);
  $("#player1").text(player2.playername);

  $("#player-roll-button" + turnIndex).click(function() {
    players[turnIndex].roll();
  });
  $("#player-hold-button" + turnIndex).click(function() {
    players[turnIndex].hold();

  $("#playertotal" + turnIndex).text(players[turnIndex].playerscore);

    if (players[turnIndex].playerscore >= 100) {
      alert("Game Over!!!" + players[turnIndex].playername + " wins!");
      location.reload();
    }
    else {
      $("#player-turnscore-total" + turnIndex).text("0");
      $("#player-current-roll" + turnIndex).text("0");
      nextTurn();
    }
  });
});
