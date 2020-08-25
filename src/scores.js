window.addEventListener('DOMContentLoaded', (event) => {

  const submitButton = document.querySelector('#submit-button');
  const nameInput = document.querySelector('#name');
  const commentTextarea = document.querySelector('#comment');

  let counter = 1;

  nameInput.focus();

  const scores = firebase.database().ref();

  scores.on('child_added', (score) => {
    const prom = new Promise((resolve, reject) => {
      if (score.val().name && score.val().comment) {
        resolve('score added');
      } else {
        reject('Error: please enter name and comment');
      }
    })
    return prom.then((fromResolve) => {
      setTimeout(() => {
        addScore(score.val().name, score.val().comment);
      }, 1000);
    }).catch((fromReject) => {
      console.log('fromReject:', fromReject);
    })
  });

  function addScore(name, comment) {
    const commentNode = document.createElement('p');
    commentNode.style.backgroundColor = '#666';
    commentNode.textContent = comment;
    const nameNode = document.createElement('p');
    const bold = document.createElement('b');
    bold.textContent = name;
    nameNode.appendChild(bold);
    document.getElementById('comments').appendChild(nameNode);
    document.getElementById('comments').appendChild(commentNode);
    counter++;
  }

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    // this triggers scores.on > 'child_added' event
    const prom = new Promise((resolve, reject) => {
      if (nameInput.value && commentTextarea.value) {
        resolve('success');
      } else {
        reject('Error: please enter name and comment');
      }
    });
    return prom.then((fromResolve) => {
      setTimeout(() => {
        scores.push({
          id: counter,
          name: nameInput.value,
          comment: commentTextarea.value,
        });
        nameInput.value = '';
        commentTextarea.value = '';
        nameInput.focus();
        console.log('success');
      }, 1000);
    }).catch((fromReject) => {
      console.log(fromReject);
    });
  });
});