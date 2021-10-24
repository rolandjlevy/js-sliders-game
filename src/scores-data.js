window.addEventListener('DOMContentLoaded', (event) => {

  const leaderBoard = document.querySelector('#leader-board');
  const addScoreForm = document.querySelector('#add-score-form');
  const addScoreButton = document.querySelector('#add-score-button');
  let playerName;

  let users;
  let counter = 0;
  let totalChildren;
  const name = 'Kadampa';

  const baseUrl = 'https://express-portfolio-api.rolandjlevy.repl.co';
  const getScoresUrl = `${baseUrl}/api/routes/sliders?origin=${window.origin}`;
  const addScoreUrl = `${baseUrl}/api/routes/add-slider-score?origin=${window.origin}`;

  const getScores = async () => {
    users = [];
    leaderBoard.innerText = 'Loading...';
    const response = await fetch(getScoresUrl);
    const json = await response.json();
    json.forEach(score => {
      users.push(score);
    });
    renderAllScores(users);
  }
  
  getScores();

  function renderAllScores(users) {
    leaderBoard.innerText = '';
    const topUsers = users
    .sort((a, b) => b.score - a.score)
    .filter((item, index) => index < 100);
    topUsers.forEach((item, index) => {
      const p = document.createElement('p');
      const nameStr = unescape(item.user_name).replace(/</g, "&lt;").replace(/>/g, "gt;");
      const scoreStr = String(item.score).replace(/</g, "&lt;").replace(/>/g, "gt;");
      const validPattern = /^[a-zA-Z0-9@ ]*$/gm;
      const validInput = (nameStr.match(validPattern) || false) && (scoreStr.match(validPattern) || false);
      if (validInput && item.score < 900) {
        const textContent = document.createTextNode(`${index + 1}. ${unescape(nameStr.trim())}: ${unescape(scoreStr.trim())}`);
        p.appendChild(textContent);
        leaderBoard.appendChild(p);
      }
    });
  }

  addScoreButton.addEventListener('click', (event) => {
    event.preventDefault();
    const playerNameError = document.querySelector('.error-message');
    playerName = document.querySelector('#player-name');
    validate(game.s).then((validationResolve, validationReject) => {
      return pushIt(game.s).then(pushResolve => {
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

  function validate(score) {
    return new Promise((resolve, reject) => {
      const allowedLetters = /^[a-zA-Z0-9@ ]*$/gm;
      const allowedNumbers = /^[0-9]*$/gm;
      const validScore = String(score.currentMoves).match(allowedNumbers) || false;
      const playerNameValue = playerName.value.trim();
      const matched = playerNameValue.match(allowedLetters);
      const validPlayerName = matched ? matched.shift() : false;
      if (!playerNameValue.length || !score.currentMoves) {
        playerName.value = '';
        playerName.focus();
        reject('empty');
      } else if (!validScore || !validPlayerName || playerNameValue.length > 20) {
        reject('invalid');
      } else {
        resolve('success');
      }
    });
  }

  function pushIt(score) {
    return new Promise((resolve, reject) => {
      counter = Math.max(...users.map(user => user.id), 0) + 1;
      console.log(counter)
      const formData = {
        secret: `${name}${window.num}!`,
        id: counter,
        user_name: escape(playerName.value),
        score: Number(escape(score.currentMoves)),
      }
      return fetch(addScoreUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).then(result => {
        getScores();
        resolve('Score added successfully');
      }).catch(err => {
        reject('Error: score not added');
      });
    });
  }

});