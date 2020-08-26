window.addEventListener('DOMContentLoaded', (event) => {

  const leaderBoard = document.querySelector('#leader-board');
  leaderBoard.innerHTML = '';
  const playerName = document.querySelector('#player-name');
  const addScoreForm = document.querySelector('#add-score-form');
  const addScoreButton = document.querySelector('#add-score-button');

  playerName.focus();

  const leadScores = firebase.database().ref();

  // load all scores from leadScores
  leadScores.orderByChild('score').on('child_added', (snapShot) => {
    const prom = new Promise((resolve, reject) => {
      if (snapShot.val()) {
        resolve(`Snapshot found: ${snapShot.key}`);
      } else {
        reject('Error: name and score no found');
      }
    });
    prom.then((resolveMessage) => {
      console.log({resolveMessage});
      renderScore(snapShot.val().name, snapShot.val().score);
      leaderBoard.scrollTo(0, 0);
    }).catch((error) => {
      console.log(error);
    })
  });

  let counter = 1;

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
    validate().then(validationMessage => {
      return pushIt().then(pushMessage => {
        playerName.value = '';
        addScoreForm.style.display = 'none';
        selectGameSize();
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      // render validation message here?
      return;
    });
  });

});