const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy", "enemy-anim");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  void randomSquare.offsetWidth;
  randomSquare.classList.add("enemy", "enemy-anim");
  state.values.hitPosition = randomSquare.id;
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        square.classList.add("enemy-hit");
        setTimeout(() => {
          square.classList.remove("enemy-hit");
        }, 200);
      }
    });
  });
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    playSound("gameover");
    setTimeout(() => {
      alert("Game Over! Seu resultado foi: " + state.values.result);
      const playAgain = confirm("Deseja jogar novamente?");
      if (playAgain) {
        restartGame();
      }
    }, 500);
  }
}

function restartGame() {
  state.values.result = 0;
  state.view.score.textContent = 0;
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = 60;

  state.view.squares.forEach((square) => {
    square.classList.remove("enemy", "enemy-anim", "enemy-hit");
  });

  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function initialize() {
  addListenerHitbox();
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

initialize();
