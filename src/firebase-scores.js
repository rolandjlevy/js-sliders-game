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

  function renderAllScores(score) {
    leaderBoard.innerText = '';
    users.push(score);
    users
    .sort((a, b) => b.score - a.score)
    .forEach(item => {
      const p = document.createElement('p');
      const nameStr = item.name.replace(/</g, "&lt;").replace(/>/g, "gt;");
      const scoreStr = String(item.score).replace(/</g, "&lt;").replace(/>/g, "gt;");
      const validPattern = /^[a-zA-Z0-9 @ ]*$/gm;
      const validInput = (nameStr.match(validPattern) || false) && (scoreStr.match(validPattern) || false);
      if (validInput && item.score < 900) {
        const textContent = document.createTextNode(`${unescape(nameStr)}: ${unescape(scoreStr)}`);
        p.appendChild(textContent);
        leaderBoard.appendChild(p);
      }
    });
  }

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    const playerNameError = document.querySelector('.error-message');
    playerName = document.querySelector('#player-name');
    validate().then((validationResolve, validationReject) => {
      return pushIt().then(pushResolve => {
        addScoreForm.style.display = 'none';
        startGame();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      const errorMessage = error === 'empty' ? 'Your name is required' : 'Your name is not valid';
      playerName.classList.add('invalid');
      playerNameError.classList.add('show');
      playerNameError.textContent = errorMessage;
      return;
    });
  });

  function validate() {
    return new Promise((resolve, reject) => {
      const allowedLetters = /^[a-zA-Z0-9 @ ]*$/gm;
      const allowedNumbers = /^[0-9]*$/gm;
      const validPlayerName = playerName.value.match(allowedLetters) || false;
      const validScore = String(score.currentMoves).match(allowedNumbers) || false;
      if (!playerName.value || !score.currentMoves) {
        reject('empty');
      } else if (!validScore || !validPlayerName || playerName.value.length > 20) {
        reject('invalid');
      } else {
        resolve('success');
      }
    });
  }

  function pushIt() {
    return new Promise((resolve, reject) => {
      const result = leadScores.push({
        id:counter,
        name:escape(playerName.value),
        score:escape(score.currentMoves),
      });
      if (result) {
        resolve('Score added successfully');
      } else {
        reject('Error: snapshot not added');
      }
    });
  }

});