const $ = (elem) => document.querySelector(elem);

const create = (tagName, props = {}) => {
  const el = document.createElement(tagName);
  return Object.assign(el, props);
};

window.addEventListener("DOMContentLoaded", (event) => {
  let users;
  let counter = 0;
  const leaderBoardLimit = 200;
  const name = "Kadampa";
  const MAX_SCORE = 900;

  const baseUrl = "https://express-portfolio-api.rolandjlevy.repl.co";
  const getScoresUrl = `${baseUrl}/api/routes/sliders?origin=${window.origin}`;
  const addScoreUrl = `${baseUrl}/api/routes/add-slider-score?origin=${window.origin}`;

  const getScores = async () => {
    $("#leader-board").innerText = "Loading scores...";
    const response = await fetch(getScoresUrl);
    users = await response.json();
    renderAllScores();
  };

  getScores();

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

  function renderAllScores() {
    $("#leader-board").innerText = "";
    const topUsers = getUnique(users)
      .sort((a, b) => b.score - a.score)
      .filter((item, index) => index < leaderBoardLimit);
    topUsers.forEach((item, index) => {
      const p = document.createElement("p");
      const nameStr = unescape(item.user_name)
        .replace(/</g, "&lt;")
        .replace(/>/g, "gt;");
      const scoreStr = String(item.score)
        .replace(/</g, "&lt;")
        .replace(/>/g, "gt;");
      const validPattern = /^[a-zA-Z0-9@ ]*$/gm;
      const validInput =
        (nameStr.match(validPattern) || false) &&
        (scoreStr.match(validPattern) || false);
      if (validInput && item.score < MAX_SCORE) {
        const num = create("span", {
          textContent: `${index + 1}. `,
          style: "color: #aaa; font-size: 1rem",
        });
        const scoreContent = `${unescape(nameStr.trim())}: ${unescape(
          scoreStr.trim()
        )}`;
        const score = create("span", { textContent: scoreContent });
        p.appendChild(num);
        p.appendChild(score);
        $("#leader-board").appendChild(p);
      }
    });
  }

  $("#add-score-button").addEventListener("click", (event) => {
    event.preventDefault();
    validate(game.s)
      .then((validationResolve, validationReject) => {
        return pushIt(game.s)
          .then((pushResolve) => {
            $("#add-score-form").style.display = "none";
            startGame();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        const nameLength = $("#player-name").value.length;
        const errorMessage =
          error === "empty"
            ? "Your name is required"
            : `Invalid name (${nameLength} letters)`;
        $("#player-name").classList.add("invalid");
        $(".error-message").classList.add("show");
        $(".error-message").textContent = errorMessage;
        return;
      });
  });

  function validate(score) {
    return new Promise((resolve, reject) => {
      const allowedLetters = /^[a-zA-Z0-9@ ]*$/gm;
      const allowedNumbers = /^[0-9]*$/gm;
      const validScore =
        String(score.currentMoves).match(allowedNumbers) || false;
      const playerNameValue = $("#player-name").value.trim();
      const matched = playerNameValue.match(allowedLetters);
      const validPlayerName = matched ? matched.shift() : false;
      if (!playerNameValue.length || !score.currentMoves) {
        $("#player-name").value = "";
        $("#player-name").focus();
        reject("empty");
      } else if (
        !validScore ||
        !validPlayerName ||
        playerNameValue.length > 20 ||
        playerNameValue.length < 3
      ) {
        reject("invalid");
      } else {
        resolve("success");
      }
    });
  }

  function pushIt(score) {
    return new Promise((resolve, reject) => {
      counter = Math.max(...users.map((user) => user.id), 0) + 1;
      console.log(counter);
      const formData = {
        secret: `${name}${window.num}!`,
        id: counter,
        user_name: escape($("#player-name").value),
        score: Number(escape(score.currentMoves)),
      };
      return fetch(addScoreUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((result) => {
          getScores();
          resolve("Score added successfully");
        })
        .catch((err) => {
          reject("Error: score not added");
        });
    });
  }
});
