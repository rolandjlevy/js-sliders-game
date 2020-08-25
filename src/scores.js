window.addEventListener('DOMContentLoaded', (event) => {

  const submitButton = document.querySelector('#submit-button');
  const playerName = document.querySelector('#player-name');
  const addScore = document.querySelector('#add-score');

  playerName.focus();

  const leaderBoard = firebase.database().ref();

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

  // load all scores from leaderBoard
  leaderBoard.orderByChild('score').on('child_added', (snapShot) => {
    console.log('child_added');
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
    }).catch((error) => {
      console.log(error);
    })
  });

  let counter = 1;

  function renderScore(name, score) {
    const scoreNode = document.createElement('p');
    const nameNode = document.createElement('p');
    scoreNode.textContent = score;
    nameNode.textContent = name;
    document.querySelector('#leader-board').appendChild(nameNode);
    document.querySelector('#leader-board').appendChild(scoreNode);
    counter++;
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    // this triggers leaderBoard.on > 'child_added' event
    const prom = new Promise((resolve, reject) => {
      if (playerName.value && score.moves) {
        resolve('Score added successfully');
      } else {
        reject('Error: please enter name and score');
      }
    });
    return prom.then((resolveMessage) => {
      leaderBoard.push({
        id: counter,
        name: playerName.value,
        score: score.moves,
      });
      playerName.value = '';
      addScore.style.display = 'none';
    }).catch((error) => {
      console.log(error);
    })
  });
});