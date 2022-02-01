import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$("#play").on("click", function(){
  $(".game-page").show();
  $(".home-page").hide();
});

$("#home").submit(function(){});

const cards = document.querySelectorAll('.memory-card');

let cardFlipped = false;
let lockTransition = false;
let firstCard, secondCard;

function flipCard() {
  if (lockTransition) {
    return false;
  }
  if (this === firstCard) {
    return false;
  }
  this.classList.add('flip');

  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;

    return false;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  $(firstCard).off('click', flipCard);
  $(secondCard).off('click', flipCard);
  reset();
}

function unflipCards() {
  lockTransition = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 1500);
}

function reset() {
  [cardFlipped, lockTransition] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function random() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => $(card).on('click', flipCard));