window.addEventListener('DOMContentLoaded', (event) => {

  const leaderBoard = document.querySelector('#leader-board');
  const playerName = document.querySelector('#player-name');
  const playerNameError = document.querySelector('.error-message');
  const addScoreForm = document.querySelector('#add-score-form');
  const addScoreButton = document.querySelector('#add-score-button');

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
      const textContent = document.createTextNode(`${item.name}: ${item.score}`); 
      p.appendChild(textContent);
      leaderBoard.appendChild(p);
    });
  }

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    validate().then(validationResolve => {
      return pushIt().then(pushResolve => {
        playerName.value = '';
        addScoreForm.style.display = 'none';
        startGame();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      playerNameError.classList.add('show');
      playerNameError.textContent = 'A valid name is required';
      return;
    });
  });

  function validate() {
    return new Promise((resolve, reject) => {
      const allowed = /^[a-zA-Z0-9 @ ]*$/gm;
      const validPlayerName = playerName.value.match(allowed) || false;
      console.log({validPlayerName});
      if (playerName.value && score.moves && validPlayerName) {
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