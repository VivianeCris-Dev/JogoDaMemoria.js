const cards = [
  "./figures/cubo.svg",
  "./figures/cubo.svg",
  "./figures/triangulo.svg",
  "./figures/triangulo.svg",
  "./figures/raio.svg",
  "./figures/raio.svg",
  "./figures/a.svg",
  "./figures/a.svg",
  "./figures/ampulheta.svg",
  "./figures/ampulheta.svg",
  "./figures/cadeado.svg",
  "./figures/cadeado.svg",
  "./figures/ciclo.svg",
  "./figures/ciclo.svg",
  "./figures/dado.svg",
  "./figures/dado.svg",
  "./figures/digital.svg",
  "./figures/digital.svg",
  "./figures/estrela.svg",
  "./figures/estrela.svg",
  "./figures/flocodeneve.svg",
  "./figures/flocodeneve.svg",
  "./figures/gota.svg",
  "./figures/gota.svg",
  "./figures/lua.svg",
  "./figures/lua.svg",
  "./figures/nuvem.svg",
  "./figures/nuvem.svg",
  "./figures/sol.svg",
  "./figures/sol.svg",
];

const containerMenu = document.querySelector(".container-menu");
const menu = document.querySelector(".menu-difficulty");
const cardContainer = document.querySelector(".card-container");
const restart = document.querySelector(".restart");
const imgCongratulations = document.querySelector(".congratulations");
const gameOver = document.querySelector(".game-over");
const dificultSelect = document.querySelector(".difficulty-select");
const modal = document.querySelector(".modal");
const header = document.querySelector(".header-content");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const nightmare = document.querySelector(".nightmare");

let flipCard = null;
let cardsTurned = 0;
let pairsFormed = 0;
let timeOnScreen = 0;
let stopwatch;

function showOnScreen() {
  cardContainer.classList.remove("none");
  restart.classList.remove("none");
  menu.classList.add("none");

  const ShuffledCards = cards.sort(() => Math.random() - 0.5);

  ShuffledCards.forEach((card) => {
    const cardCoast = document.createElement("img");
    cardCoast.src = "./images/cardcoast.jpg";
    cardCoast.alt = "carta virada de costas";
    cardCoast.classList.add("card-coast");

    const cardTurn = document.createElement("img");
    cardTurn.src = card;
    cardTurn.classList.add("card-turn", "none");

    cardContainer.appendChild(cardCoast);
    cardContainer.appendChild(cardTurn);

    cardCoast.addEventListener("click", () => {
      turnCard(cardCoast, cardTurn);
    });
    cardTurn.addEventListener("click", () => {
      turnCard(cardCoast, cardTurn);
    });
  });
}

function screenTime() {
  const time = document.createElement("h4");

  let stopwatch = setInterval(() => {
    timeOnScreen--;
    time.textContent = "Tempo: " + timeOnScreen;
    loser(stopwatch);
    congratulationsImg(stopwatch);
  }, 1000);

  time.classList.add("header-content");
  header.appendChild(time);
}

function openModal() {
  dificultSelect.addEventListener("click", () => {
    modal.classList.remove("none");
  });
}

function chooseDifficulty(difficulty, timeScreen) {
  timeOnScreen = timeScreen;
  cards.splice(0, difficulty);
  screenTime();
  showOnScreen();
}

function addDifficultyEventListeners() {
  openModal();
  easy.addEventListener("click", () => {
    modal.classList.add("none");
    dificultSelect.classList.add("none");
    chooseDifficulty(20, 120);
  });

  medium.addEventListener("click", () => {
    modal.classList.add("none");
    dificultSelect.classList.add("none");
    chooseDifficulty(10, 20);
  });

  hard.addEventListener("click", () => {
    modal.classList.add("none");
    dificultSelect.classList.add("none");
    chooseDifficulty(0, 120);
  });

  nightmare.addEventListener("click", () => {
    modal.classList.add("none");
    dificultSelect.classList.add("none");
    chooseDifficulty(0, 5);
  });
}

function turnCard(cardCoast, cardTurn) {
  if (
    ifTheLetterHasAlreadyBeenClicked(cardCoast) ||
    ifTwoCardsHasAlreadyBeenClicked()
  )
    return;

  cardTurn.classList.remove("none");
  cardCoast.classList.add("none");

  if (!cardTurn.classList.contains("none")) {
    cardsTurned++;
  }

  setTimeout(() => {
    if (flipCard === null) {
      flipCard = cardTurn;
    } else {
      if (cardTurn.src === flipCard.src) {
        flipCard = null;
        cardsTurned = 0;
        pairsFormed++;

        congratulationsImg();
      } else {
        cardTurn.classList.add("none");
        cardCoast.classList.remove("none");
        flipCard.classList.add("none");

        flipCard.previousElementSibling.classList.remove("none");
        flipCard = null;
        cardsTurned = 0;
      }
    }
  }, 1000);
}

function ifTheLetterHasAlreadyBeenClicked(cardCoast) {
  return cardCoast.classList.contains("none");
}

function ifTwoCardsHasAlreadyBeenClicked() {
  return cardsTurned == 2;
}

function congratulationsImg(stopwatch) {
  if (pairsFormed === cards.length / 2) {
    clearInterval(stopwatch);
    const allCards = document.querySelectorAll(".card-turn");
    allCards.forEach((card) => {
      card.classList.add("none");
    });
    imgCongratulations.classList.remove("none");
  }
}

function loser(stopwatch) {
  if (timeOnScreen == 0) {
    clearInterval(stopwatch);
    gameOver.classList.remove("none");

    cardContainer.innerHTML = "";
    cardContainer.appendChild(gameOver);
  }
}
function restartGame() {
  restart.addEventListener("click", () => {
    location.reload();
  });
}

addDifficultyEventListeners();

restartGame();
turnCard();
