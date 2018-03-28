/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const movesNumber = document.querySelector('.moves');
const plural = document.querySelector('.plural');
const refreshBtn = document.querySelector('.fa-repeat')
const timer = document.querySelector('.timer')
const stars = [...document.querySelectorAll('.fa-star')]
const starsBoard = document.querySelector('.stars')
const modalStars = document.querySelector('.modal-stars')
const modalMoves = document.querySelector('.modal-moves')
const modalTimer = document.querySelector('.modal-time')
let arrayCards = [...cards];
let openCards = [];
let moves = 0;
let pairsFound = 0;
let timeStart = 0;
let timeEnd = 0;
let timeTaken = 0;
let elapsedTime = 0;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    deck.append(temporaryValue);
  }
  refresh();
}

function refresh(){
  for(let i = 0; i < cards.length; i++){
   cards[i].classList.remove('open','show','match');
  }
  movesNumber.innerHTML = "0 Move";
  pairsFound = 0;
  moves = 0;
  timeStart = 0;
  elapsedTime = 0;
  starsBoard.innerHTML= '';
  for (var i = 0; i < 3; i++) {
    starsBoard.appendChild(stars[i]);
  }
}

function displayCard(card) {
  card.classList.add('open','show');
  openCards.push(card)
  if (openCards.length === 2) {
    checkMatch(openCards[0],openCards[1])
  }
}

function checkMatch(symbol1, symbol2){
  if (symbol1.innerHTML === symbol2.innerHTML){
    lockCards(symbol1, symbol2);
    pairsFound++
    if(pairsFound === 8){
      endGame();
    }
    } else {
    hideCards(symbol1, symbol2);
    }
    openCards = [];
    moveCounter();
}

function hideCards(card1, card2){
  setTimeout(function(){
  card1.classList.remove('open','show');
  card2.classList.remove('open','show');
}, 700)};

function moveCounter() {
  moves++;
  if (moves === 1){
    movesNumber.innerHTML = "1 move";
  } else {
  movesNumber.innerHTML = moves + " moves";
  }
  if (moves === 14 || moves === 21){
    starsBoard.removeChild(starsBoard.children[0]);
  }
}

function lockCards(card1, card2){
  card1.classList.add('match');
  card2.classList.add('match');
}

for(var i = 0; i < cards.length; i++){
  cards[i].addEventListener('click', function(){
    if (timeStart === 0) {
      timeStart = new Date().getTime();
    }
    if (this.classList.contains('open') === false){
      displayCard(this);
    }
  })
}

refreshBtn.addEventListener ('click', function(){
  shuffle(arrayCards)
})
//inspired by https://stackoverflow.com/questions/19429890
function checkTime(){
  elapsedTime = ((Date.now() - timeStart)/1000).toFixed(2);;
  if (timeStart === 0) {
    timer.innerHTML = "Timer: " + 0;
  } else if (pairsFound !== 8) {
  timer.innerHTML = "Timer: " + Math.round(elapsedTime);
}
}

function endGame() {
 timeEnd = new Date().getTime();
 timeTaken = ((timeEnd - timeStart)/1000).toFixed(2);
 timer.innerHTML = "Timer: " + timeTaken;
 modalStars.innerHTML = starsBoard.innerHTML;
 modalMoves.innerHTML = "Moves: " + (moves+1);
 modalTimer.innerHTML = "Time: " + timeTaken;
}

shuffle(arrayCards);

window.setInterval(checkTime, 100);

/*
 *[x] set up the event listener for a card. If a card is clicked:
 *[x]  - display the card's symbol (put this functionality in another function that you call from this one)
 *[x]  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *[x]  - if the list already has another card, check to see if the two cards match
 *[x]    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *[x]    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *[x]    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *[]    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    >Timer
    ># Stars
    ># Moves
 *[/] add timer to board + congrats pop up
 *[x] remove stars: 1 at 14 moves, 1 more at 21

 */
