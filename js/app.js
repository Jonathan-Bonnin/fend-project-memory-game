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
  movesNumber.innerHTML = 0;
  plural.innerHTML = '';

}

const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const movesNumber = document.querySelector('.moves');
const plural = document.querySelector('.plural');
const refreshBtn = document.querySelector('.fa-repeat')
let arrayCards = [...cards];
shuffle(arrayCards);
let openCards = [];
let moves = 0;

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
  movesNumber.innerHTML = moves;
  if (moves > 1){
  plural.innerHTML = 's';
  }
}
function lockCards(card1, card2){
  card1.classList.add('match');
  card2.classList.add('match');
}

for(var i = 0; i < cards.length; i++){
  cards[i].addEventListener('click', function(){
    if (this.classList.contains('open') === false){
      displayCard(this);
    }
  })
}

refreshBtn.addEventListener ('click', function(){
  shuffle(arrayCards)
})



/*
 *[x] set up the event listener for a card. If a card is clicked:
 *[x]  - display the card's symbol (put this functionality in another function that you call from this one)
 *[x]  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *[x]  - if the list already has another card, check to see if the two cards match
 *[x]    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *[x]    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *[x]    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *[]    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
