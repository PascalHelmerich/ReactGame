var game = document.getElementById("game");
var error = document.getElementById("error");
var gamestate = 0;
var countdown = 0;
var players = [];
var millis = 0;
var winner = "";
var timer;
game.innerHTML = "Drücke eine Taste & halte diese gedrückt um beizutreten. <br>";

document.addEventListener('keypress', (event) => {
  if(gamestate == 0){
    var key = event.key;
    var newPlayer = true;
    for(var i = 0; i < players.length; i++){
      if(players[i]==key) {
        newPlayer = false;
        break;
      }
    }
    if(newPlayer){
      players.push(key);
      printPlayers();
    }
  }
});

document.addEventListener('keyup', (event) => {
  var key = event.key;
  var remove = players.indexOf(key);
  players.splice(remove, 1);
  switch (gamestate) {
    case 0:
      printPlayers();
      break;
    case 1:
      if(countdown > 0){
        addLog("Der Spieler "+key+" hat zu früh losgelassen.", "red");
      }else{
        var time = Date.now();
        if(winner == "") winner = key;
        addLog("Der Spieler "+key+" hat "+(time-millis)+" Millisekunden gebraucht.", "green");
      }
    break;
  }
});

function startgame(){
  randomCountdown();
  gamestate = 1;
  timer = setInterval(function(){
    if(countdown > 0){
      countdown--;
      //game.innerHTML += countdown + "<br>";
    }else if(countdown == 0){
      millis = Date.now();
      addLog("Lasst jetzt los!", "blue");
      countdown--;
    }else if(countdown < 0){
      if(players.length == 0){
        game.innerHTML +="Das Spiel ist vorbei, gewonnen hat: "+winner;
        clearInterval(timer);
      }
    }
  }, 1000)
}

function randomCountdown(){
  countdown = Math.ceil(Math.random()*10);
}

function addLog(message, color){
  error.innerHTML += "<p style='color:"+color+"'>"+message+"</p>";
}

function printPlayers(){
  game.innerHTML = "Drücke eine Taste & halte diese gedrückt um beizutreten. <br>";
  for(var i = 0; i < players.length; i++){
    var key = players[i];
    game.innerHTML += "<p id="+key+">Spieler "+(i+1)+": "+key+"<br>";
  }
}
