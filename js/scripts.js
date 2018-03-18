var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');
var pickLizard = document.getElementById('js-playerPick_lizard');
var pickSpock = document.getElementById('js-playerPick_spock');


var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');
   
var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

var gameState = 'notStarted'; 
var player = {
        name: '',
        score: 0
    };
var computer = {
        score: 0
    };

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock');});
pickPaper.addEventListener('click', function() { playerPick('paper');});
pickScissors.addEventListener('click', function() { playerPick('scissors');});
pickLizard.addEventListener('click', function() { playerPick('lizard'); });
pickSpock.addEventListener('click', function() { playerPick('Spock'); });
  


function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

function resetScores() {
   player.score = computer.score = 0;
}

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    resetScores();
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
  }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
} 

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; 
    } else if (
        (computerPick === 'rock' &&  (playerPick === 'scissors' || playerPick === 'lizard')) ||
		(computerPick === 'scissors' &&  (playerPick === 'paper' || playerPick === 'lizard')) ||
		(computerPick === 'paper' &&  (playerPick === 'rock' || playerPick === 'Spock')) ||
		(computerPick === 'lizard' &&  (playerPick === 'Spock' || playerPick === 'paper')) ||
		(computerPick === 'Spock' &&  (playerPick === 'scissors' || playerPick === 'rock')))  {
            
            roundWinner(computerResultElem, computer);
    } else {
        roundWinner(playerResultElem, player);
    }
    
    setGamePoints();
    whoWins();
}

function roundWinner(winnerResultElem, winner) {
    winnerResultElem.innerHTML = "Win!";
    winner.score++;
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function whoWins () {
    
    if (player.score === 10 || computer.score === 10) {
         gameState = 'ended';
         setGameElements();
         if (player.score === 10) {          
             alert('Wygrał gracz');
         }
         else {
             alert('Wygrał Komputer');
         }
         resetScores();
         setGamePoints();
     }  
 }
