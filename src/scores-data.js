const $ = (elem) => document.querySelector(elem);

let users;
let counter = 0;
const leaderBoardLimit = 100;
const name = 'Kadampa';
const MAX_SCORE = 900;
const baseUrl = 'https://node-api-serverless.vercel.app';
const getScoresUrl = `${baseUrl}/api/sliders/view?page=1&orderBy=score&sortBy=desc&limit=100`;
const addScoreUrl = `${baseUrl}/api/sliders/add`;

const create = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

const getScores = async () => {
  try {
    const response = await fetch(getScoresUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching scores:', error.message);
  }
};

const getUnique = (data) =>
  data.reduce((acc, itemA) => {
    const found = acc.find((itemB) => {
      const a = `${itemA.user_name}${itemA.score}`;
      const b = `${itemB.user_name}${itemB.score}`;
      return a === b;
    });
    if (!found) acc.push(itemA);
    return acc;
  }, []);

const getUniqueMap = (data) => {
  const uniqueMap = {};
  data.forEach((item) => {
    const key = `${item.user_name}${item.score}`;
    uniqueMap[key] = item;
  });
  return Object.values(uniqueMap);
};

const validate = (score) => {
  return new Promise((resolve, reject) => {
    const allowedLetters = /^[a-zA-Z0-9@ ]*$/gm;
    const allowedNumbers = /^[0-9]*$/gm;
    const validScore =
      String(score.currentMoves).match(allowedNumbers) || false;
    const playerNameValue = $('#player-name').value?.trim();
    const matched = playerNameValue.match(allowedLetters);
    const validPlayerName = matched ? matched.shift() : false;
    if (!playerNameValue.length || !score.currentMoves) {
      $('#player-name').value = '';
      $('#player-name').focus();
      reject('empty');
    } else if (
      !validScore ||
      !validPlayerName ||
      playerNameValue.length > 20 ||
      playerNameValue.length < 3
    ) {
      reject('invalid');
    } else {
      resolve('success');
    }
  });
};

const sanitizeInput = (value) => DOMPurify.sanitize(value);

const addScore = async (score) => {
  try {
    const userName = sanitizeInput($('#player-name').value);
    const currentScore = sanitizeInput(score.currentMoves);
    const formData = { user_name: userName, score: currentScore };

    const response = await fetch(addScoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error(`Failed to add score: ${response.statusText}`);
    }
    const data = await response.json();
    const result = { message: 'Score added successfully', data };
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    return { message: 'Error: score not added', error };
  }
};

window.addEventListener('DOMContentLoaded', (event) => {
  const renderAllScores = (data) => {
    $('#leader-board').innerText = '';
    data.forEach((item, index) => {
      const userName = item.user_name;
      const score = item.score;
      if (userName && Number(score) < MAX_SCORE) {
        const num = create('span', {
          textContent: `${index + 1}. `,
          style: 'color: #aaa; font-size: 1rem'
        });
        const scoreContent = `${userName}: ${score}`;
        const scoreElement = create('span', { textContent: scoreContent });
        const pTag = document.createElement('p');
        pTag.appendChild(num);
        pTag.appendChild(scoreElement);
        $('#leader-board').appendChild(pTag);
      }
    });
  };

  (async () => {
    const scores = await getScores();
    renderAllScores(scores.data);
  })();

  $('#add-score-button').addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await validate(game.s);
      await addScore(game.s);
      $('#add-score-form').style.display = 'none';
      startGame();
    } catch (error) {
      console.log(error);
      if (error === 'empty') {
        $('.error-message').textContent = 'Your name is required';
      } else {
        const nameLength = $('#player-name').value.length;
        const errorMessage = `Invalid name (${nameLength} letters)`;
        $('.error-message').textContent = errorMessage;
      }
      $('#player-name').classList.add('invalid');
      $('.error-message').classList.add('show');
    }
    return;

    // // Call the async function
    // handleGameValidation(game);
    // validate(game.s)
    //   .then((result) => {
    //     return addScore(game.s)
    //       .then((pushResolve) => {
    //         $('#add-score-form').style.display = 'none';
    //         startGame();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     const nameLength = $('#player-name').value.length;
    //     const errorMessage =
    //       error === 'empty'
    //         ? 'Your name is required'
    //         : `Invalid name (${nameLength} letters)`;
    //     $('#player-name').classList.add('invalid');
    //     $('.error-message').classList.add('show');
    //     $('.error-message').textContent = errorMessage;
    //     return;
    //   });
  });
});
