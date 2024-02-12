const score = JSON.parse(localStorage.getItem('score'));

updateScoreElement();

let isAutoPlaying = false;
let intervalId; 
const buttonElement = document.querySelector('.js-auto-play');

document.querySelector('.js-auto-play')
  .addEventListener('click', () => {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }

    if(buttonElement.innerText === 'Auto Play') {
      buttonElement.innerHTML = 'Stop playing';
    } else {
      buttonElement.innerHTML = 'Auto Play';
    }
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }

    if(buttonElement.innerText === 'Auto Play') {
      buttonElement.innerHTML = 'Stop playing';
    } else {
      buttonElement.innerHTML = 'Auto Play';
    }
  }
});

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  
  let result = '';

  if(playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose!';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose!';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose!'
    } else if (computerMove === 'scissors') {
      result = 'You win!'
    }
  }

  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.querySelector('.js-result')
    .innerHTML = `${result}`;

  document.querySelector('.js-moves')
    .innerHTML = `You 
    <img src="${playerMove}-emoji.png" class="icon-img"> -
    <img src="${computerMove}-emoji.png" class="icon-img">
    Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      updateScoreElement();
    }
  });
}

function updateResult() {
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
}

function updateMoves() {
  document.querySelector('.js-moves')
    .innerHTML = `You ${playerMove} - Computer ${computerMove}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3 ) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1 ) {
    computerMove = 'scissors';
  }

  return computerMove;
}
