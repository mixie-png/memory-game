const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    startTimer();
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;
  //do cards match?
  checkForMatch();
}

function checkForMatch() {
  let isMatch =
    firstCard.dataset.affirmation === secondCard.dataset.affirmation;
  isMatch ? disableCards() : unflipCards();

  //   if (firstCard.dataset.affirmation === secondCard.dataset.affirmation) {
  //     //match
  //     disableCards();
  //   } else {
  //     //no match
  //     unflipCards();
  //   }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  // firstCard.style.animation = "rubberBand 1s forward";
  // secondCard.style.animation = "rubberBand 1s forward";
  setTimeout(() => {
    firstCard.style.opacity = "0";
    secondCard.style.opacity = "0";
    firstCard.style.cursor = "default";
    secondCard.style.cursor = "default";
    resetBoard();
  }, 1500);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

  //game timer
  let second = 0, minute = 0;
  let timer = document.querySelector(".timer");
  let interval;
  function startTimer() {
    interval = setInterval(function() {
      timer.innerHTML = `${minute} mins ${second} secs`;
      second++;
      if (second == 60) {
        minute++;
        second = 0;
      }
      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);
  };

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
      timer.innerHTML = "0 mins 0 secs";
    });
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
  })();

cards.forEach(card => card.addEventListener("click", flipCard));
