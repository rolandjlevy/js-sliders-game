window.addEventListener('DOMContentLoaded', (event) => {

  const leaderBoard = document.querySelector('#leader-board');
  const addScoreForm = document.querySelector('#add-score-form');
  const addScoreButton = document.querySelector('#add-score-button');
  let playerName;

  const users = [];
  let counter = 0;
  let totalChildren;
  const leadScores = firebase.database().ref();

  leadScores.once('value').then(snap => {
    totalChildren = snap.numChildren();
  });

  leadScores.orderByChild('score').on('child_added', (snapShot) => {
    const prom = new Promise((resolve, reject) => {
      if (snapShot.val()) {
        resolve(`Snapshot found: ${snapShot.key}`);
      } else {
        reject('Error: name and score no found');
      }
    });
    prom.then(resolveMessage => {
      renderAllScores(snapShot.val());
      counter++;
    }).catch((error) => {
      console.log(error);
    })
  });

  const clean = (str) => str.replace(/</g, "&lt;").replace(/>/g, "gt;");

  function renderAllScores(score) {
    leaderBoard.innerText = '';
    users.push(score);
    users
    .sort((a, b) => b.score - a.score)
    .forEach(item => {
      const p = document.createElement('p');
      const name = item.name.replace(/</g, "&lt;").replace(/>/g, "gt;");
      const score = String(item.score).replace(/</g, "&lt;").replace(/>/g, "gt;");
      const textContent = document.createTextNode(`${name}: ${score}`);
      p.appendChild(textContent);
      leaderBoard.appendChild(p);
    });
  }

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    playerName = document.querySelector('#player-name');
    validate().then(validationResolve => {
      return pushIt().then(pushResolve => {
        addScoreForm.style.display = 'none';
        startGame();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      const playerNameError = document.querySelector('.error-message');
      playerNameError.classList.add('show');
      playerNameError.textContent = 'A valid name is required';
      return;
    });
  });

  function validate() {
    return new Promise((resolve, reject) => {
      const allowedLetters = /^[a-zA-Z0-9 @ ]*$/gm;
      const allowedNumbers = /^[0-9]*$/gm;
      const validPlayerName = playerName.value.match(allowedLetters) || false;
      const validScore = String(score.moves).match(allowedNumbers) || false;
      if (playerName.value && score.moves && validScore && validPlayerName && playerName.value.length <= 20) {
        resolve('Valid input');
      } else {
        reject('Error: please enter a valid name and score');
      }
    });
  }

  function pushIt() {
    return new Promise((resolve, reject) => {
      const result = leadScores.push({
        id:counter,
        name:playerName.value,
        score:score.moves,
      });
      if (result) {
        resolve('Score added successfully');
      } else {
        reject('Error: snapshot not added');
      }
    });
  }

});