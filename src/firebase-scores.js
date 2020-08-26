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
      leaderBoard.scrollTo(0, 0);
    }).catch((error) => {
      console.log(error);
    })
  });

  function renderAllScores(score) {
    let str = '';
    users.push(score);
    users
    .sort((a, b) => b.score - a.score)
    .forEach(item => str += `<p>${item.name}: ${item.score}</p>`);
    leaderBoard.innerHTML = str; 
    counter++;
  }

  // renderScore(snapShot.val().name, snapShot.val().score);
  function renderScore(name, score) {
    leaderBoard.innerHTML += `<p>${name}: ${score}</p>`;
    counter++;
  }

  function validate() {
    return new Promise((resolve, reject) => {
      if (playerName.value && score.moves) {
        resolve('Valid input');
      } else {
        reject('Error: please enter name and score');
      }
    });
  }

  function pushIt() {
    return new Promise((resolve, reject) => {
      const result = leadScores.push({
        id: counter,
        name: playerName.value,
        score: score.moves,
      });
      if (result) {
        resolve('Score added successfully');
      } else {
        reject('Error: snapshot not added');
      }
    });
  }

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    validate().then(validationResolve => {
      return pushIt().then(pushResolve => {
        playerName.value = '';
        addScoreForm.style.display = 'none';
        selectGameSize();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      playerNameError.classList.add('show');
      return;
    });
  });

});