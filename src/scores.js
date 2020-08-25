window.addEventListener('DOMContentLoaded', (event) => {

  const leaderBoard = document.querySelector('#leader-board');
  leaderBoard.innerHTML = '';
  const playerName = document.querySelector('#player-name');
  const addScoreForm = document.querySelector('#add-score-form');
  const addScoreButton = document.querySelector('#add-score-button');

  playerName.focus();

  const leadScores = firebase.database().ref();

  // let addTeam(team) {
  //   return new Promise((resolve, reject) => {
  //       let newRef = dataRef.child('teams').push(team);
  //       if (newRef) {
  //           resolve(newRef.key());
  //       } else {
  //           reject("The write operation failed");
  //       }
  //   });
  // };

  // var scoresRef = db.ref("scores");
  // scoresRef.orderByValue().on("value", function(snapshot) {
  //   snapshot.forEach(function(data) {
  //     console.log("The " + data.key + " dinosaur's score is " + data.val());
  //   });
  // });

  // ref.orderByChild("score").on("child_added", function(snapshot) {
  //   console.log(snapshot.key);
  // });

  // load all scores from leadScores
  leadScores.orderByChild('score').on('child_added', (snapShot) => {
    const prom = new Promise((resolve, reject) => {
      if (snapShot.val()) {
        resolve(`Snapshot found: ${snapShot.key}`);
      } else {
        reject('Error: name and score no found');
      }
    });
    return prom.then((resolveMessage) => {
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

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    // this triggers leadScores.on > 'child_added' event
    const prom = new Promise((resolve, reject) => {
      if (playerName.value && score.moves) {
        resolve('Score added successfully');
      } else {
        reject('Error: please enter name and score');
      }
    });
    return prom.then((resolveMessage) => {
      leadScores.push({
        id: counter,
        name: playerName.value,
        score: score.moves,
      });
      playerName.value = '';
      addScoreForm.style.display = 'none';
    }).catch((error) => {
      console.log(error);
    })
  });
});