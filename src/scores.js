window.addEventListener('DOMContentLoaded', (event) => {

  const submitButton = document.querySelector('#submit-button');
  const nameInput = document.querySelector('#name');

  nameInput.focus();

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
    scoreNode.style.backgroundColor = '#666';
    scoreNode.textContent = score;
    const nameNode = document.createElement('p');
    const bold = document.createElement('b');
    bold.textContent = name;
    nameNode.appendChild(bold);
    document.getElementById('comments').appendChild(nameNode);
    document.getElementById('comments').appendChild(scoreNode);
    counter++;
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    // this triggers leaderBoard.on > 'child_added' event
    const prom = new Promise((resolve, reject) => {
      if (nameInput.value && score.moves) {
        resolve('Score added successfully');
      } else {
        reject('Error: please enter name and score');
      }
    });
    return prom.then((resolveMessage) => {
      console.log({resolveMessage});
      leaderBoard.push({
        id: counter,
        name: nameInput.value,
        score: score.moves,
      });

      console.logs({items})
      nameInput.value = '';
      nameInput.focus();
      console.log('success');
    }).catch((error) => {
      console.log(error);
    })
  });
});