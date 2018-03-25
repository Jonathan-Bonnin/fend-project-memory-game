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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const cards = document.querySelectorAll('.card')
let checkedCardPair = [];
let moves = 0;
function checkMatch(symbol1, symbol2){
  if (symbol1.innerHTML === symbol2.innerHTML){
    symbol1.classList.add('match');
    symbol2.classList.add('match');
    } else {
    setTimeout(function() {symbol1.classList.remove('open','show')}, 700);
    setTimeout(function() {symbol2.classList.remove('open','show')}, 700);
  }
  checkedCardPair = [];
  moves++;
  document.querySelector('.moves').innerHTML = moves;
  if (moves > 1){
  document.querySelector('.plural').innerHTML = 's';
  }

}


for(var i = 0; i < cards.length; i++){
  cards[i].addEventListener('click', function(){
    if (this.classList.contains('open') === false){
    this.classList.add('open','show');
    checkedCardPair.push(this)
    if (checkedCardPair.length === 2) {
      checkMatch(checkedCardPair[0],checkedCardPair[1])
    }
  }
  })
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
