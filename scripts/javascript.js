//jQuery snippet to activate Rainbow Text
$('.txt').html(function(i, html) {
  var chars = $.trim(html).split("");

  return '<span>' + chars.join('</span><span>') + '</span>';
});


//global variable declarations
var theGame = document.getElementsByClassName("game")[0];
var array = document.getElementsByClassName("tile");
var moves;
var colors = [];
var gameTiles = [];
var resetButton = document.getElementById("reset-button");
var audioToggle = document.getElementById("audio-toggle");
var timer;
var sec;
var min;
var manicMode = false;
var musicOn = false;
var timeOut = document.getElementsByTagName("audio")[1];
var winner = document.getElementsByTagName("audio")[2];
var gameOverText = document.getElementsByClassName("hidden")[0];
var gameReadyText = document.getElementsByClassName("hidden")[1];
var gameWinText1 = document.getElementsByClassName("hidden")[2];
var gameWinText2 = document.getElementsByClassName("hidden")[3];
var gameWinText2_1 = document.getElementsByClassName("hidden")[4];
var firstTile = null;
// var completed = false; //future enhancement for while loop mechanism
var matchedPairs = 0;
//load colors array with tile class names which modify color property
for (var i = 0; i < 19; i++) {
  colors.push("tile-" + i);
}

function Tile(element, color) {
  this.element = element;
  this.isOpen = false;
  this.isLocked = false;
  this.element.addEventListener("click", this, false);
  this.setColor(color);
}

function moveCounter() {
  document.getElementById("move-counter").innerHTML = "Moves: " + moves;
}

//methods of Tile object class
Tile.prototype.handleEvent = function(e) {
  switch (e.type) {
    case "click":
      audioClick();
      //start clock and turn off ambience on first click
      if(moves === 0) {
        clockTick();
      }
      // clockTick();
      moves++;
      if (this.isOpen || this.isLocked) {
        return;
      }
      this.isOpen = true;
      this.element.classList.add('flip');
      moveCounter();
      checkGame(this);
  }
}

Tile.prototype.reset = function() {
  this.isOpen = false;
  this.isLocked = false;
  this.element.classList.remove('flip');
}

Tile.prototype.lock = function() {
  this.isLocked = true;
  this.isOpen = true;
}

Tile.prototype.setColor = function(color) {
  this.element.children[0].children[1].classList.remove(this.color);
  this.color = color;
  this.element.children[0].children[1].classList.add(color);
}

function random(n) {
  return Math.floor(Math.random() * n);
}

function setupGame() {
  var randomColors = getSomeColors();
  for (var i = 0; i < array.length; i++) {
    var index = random(randomColors.length); //Get random index
    var color = randomColors.splice(index, 1)[0]; //Get color at that index
    gameTiles.push(new Tile(array[i], color));
  }
  moves = 0;
  randomizeColors();
  resetTimer();
}

function setupManicMode() {
  manicMode = true;
  matchedPairs = 0;
  moves = 0;
  moveCounter();
  switchPic();
  for(i = 0; i < gameTiles.length; i++) {
    gameTiles[i].reset();
  }
  randomizeColors();
  resetTimer();
  spin();
}

function audioClick() {
  document.getElementsByTagName("audio")[0].play();
}

function ambientOff() {
  document.getElementsByTagName("audio")[3].pause();
  musicOn = false;
}

function ambientOn() {
  document.getElementsByTagName("audio")[3].load();
  document.getElementsByTagName("audio")[3].play();
  musicOn = true;
}

function toggleAudio() {
  if (musicOn) {
    ambientOff();
  } else {
    ambientOn();
  }
}

// function showGameBoard() {
//   theGame.classList.remove('stealth');
// }
//
// function hideGameBoard() {
//   theGame.classList.add('stealth');
// }

function getSomeColors() {
  var colorscopy = colors.slice(); //.slice() without param = copy
  var randomColors = [];
  //condition ensures matching pairs of colors
  for (var i = 0; i < gameTiles.length / 2; i++) {
    var index = random(colorscopy.length);
    randomColors.push(colorscopy.splice(index, 1)[0]);
  }
  //effectively double the array to ensure matching color pairs
  return randomColors.concat(randomColors.slice());
}

//helper function to add leading zeros to timer
//Thanks to https://www.electrictoolbox.com/pad-number-two-digits-javascript/
function padZero(number) {
     return (number < 10 ? '0' : '') + number
}

function clockTick() {
  if (timer == null) {
    sec = 0;

    timer = setInterval(function () {
      sec--;
      if (sec < 0) {
        min--;
        if (min >= 0) {
          sec = 59;
        }
        else {
          sec = 0; min = 0;
          stopTimer();
          timeOver();
        }
      }
      document.getElementById("timer").innerHTML="Timer: " + padZero(min)
       + ":" +padZero(sec);
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
        timer = null;
}

function resetTimer() {
  sec = 0;
  //if(easyMode){min = 1; sec = 30;} if(manicMode){min = 0; sec = 30;}
  //Future difficulty logic
  min = 1;
  document.getElementById("timer").innerHTML="Timer: " + padZero(min) +
  ":" +padZero(sec);
}

function checkGame(currentTile) {
  if (firstTile === null) {
    firstTile = currentTile;
    return
  }

  if (firstTile.color === currentTile.color) {
    firstTile.lock();
    currentTile.lock();
    matchedPairs++;

    //check for game win
    if (matchedPairs === gameTiles.length / 2) {
      stopTimer();
      if (manicMode) {
        playerWin2();
      } else {
        playerWin1();
      }
    }

  } else {
      var a = firstTile;
      var b = currentTile;
      setTimeout(function() {
        a.reset();
        b.reset();
        firstTile = null;
      }, 400);
    }
    firstTile = null;
}

/* A function to assign new, randomized colors to tiles */
function randomizeColors() {
  var randomColors = getSomeColors();
  gameTiles.forEach(function(gameTile) {
    var color = randomColors.splice(random(randomColors.length), 1)[0];
    gameTile.setColor(color);
  });
}

function tilesOff() {
  for (i = 0; i < array.length; i++) {
    array[i].classList.add('tile-off'); //gameTiles[i].classList.add?
  }
}

function tilesOn() {
  for (i = 0; i < array.length; i++) {
    array[i].classList.remove('tile-off'); //gameTiles[i].classList.add?
  }
}

function rainbowFade() {
  tilesOff();
  theGame.classList.add('ending');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function switchPic() {
  for (i = 0; i < array.length; i++) {
    array[i].classList.add('face');
  }
}

function spin() {
  theGame.classList.add('spin');
}

function stopSpin() {
  theGame.classList.remove('spin');
  manicMode = false;
}

async function timeOver() {
  if (manicMode) {
    stopSpin();
  }
  rainbowFade();
  timeOut.play();
  await sleep(2500);
  gameOverText.classList.remove('hidden');
  await sleep(6000);
  gameOverText.classList.add('hidden');
}

async function playerWin1() {
  rainbowFade();
  winner.play();
  await sleep(2500);
  gameWinText1.classList.remove('hidden');
  await sleep(6000);
  gameWinText1.classList.add('hidden');
  setupManicMode();
  tilesOn();
}

async function getReady() {
  tilesOff();
  theGame.classList.remove('hidden');
  gameReadyText.classList.remove('hidden');
  await sleep(6000);
  gameReadyText.classList.add('hidden');
  clearState();
  clearDisplay();
  tilesOn();
}

async function playerWin2() {
  stopSpin();
  rainbowFade();
  winner.play();
  await sleep(2500);
  gameWinText2.classList.remove('hidden');
  await sleep(5000);
  gameWinText2.classList.add('hidden');
  gameWinText2_1.classList.remove('hidden');
  await sleep(6000);
  gameWinText2_1.classList.add('hidden');
}

function clearState() {
  manicMode = false;
  stopSpin();
  gameTiles.forEach(function(gameTile) {
    gameTile.reset();
  });
  setTimeout(function() {
    stopTimer();
    resetTimer();
    moves = 0;
    moveCounter();
    matchedPairs = 0;
    randomizeColors();
  }, 500);
}

function clearDisplay() {
  theGame.classList.remove('ending');
  gameOverText.classList.add('hidden');
  if (manicMode) {
    gameWinText2.classList.add('hidden');
    gameWinText2_1.classList.add('hidden');
  } else {
  gameWinText1.classList.add('hidden');
  }

  for (i = 0; i < array.length; i++) {
    array[i].classList.remove('tile-off', 'face');
  }
}

resetButton.addEventListener("click", clearDisplay, false);
resetButton.addEventListener("click", clearState, false);
resetButton.addEventListener("click", getReady, false);
resetButton.addEventListener("click", audioClick, false);

audioToggle.addEventListener("click", toggleAudio, false);
audioToggle.addEventListener("click", audioClick, false);

tilesOff();
setupGame();
