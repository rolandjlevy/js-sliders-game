window.addEventListener('DOMContentLoaded', (event) => {

  const submitButton = document.querySelector('#submit-button');
  const nameInput = document.querySelector('#name');
  const commentTextarea = document.querySelector('#comment');

  let counter = 1;

  nameInput.focus();

  let guestBook = firebase.database().ref();

  guestBook.on('child_added', (guest) => {
    const prom = new Promise((resolve, reject) => {
      if (guest.val().name && guest.val().comment) {
        resolve('guest added');
      } else {
        reject('Error: please enter name and comment');
      }
    })
    return prom.then((fromResolve) => {
      setTimeout(() => {
        signGuestbook(guest.val().name, guest.val().comment);
      }, 1000);
    }).catch((fromReject) => {
      console.log('fromReject:', fromReject);
    })
  });

  function signGuestbook(name, comment) {
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
    // this triggers guestBook.on > 'child_added' event
    const prom = new Promise((resolve, reject) => {
      if (nameInput.value && commentTextarea.value) {
        resolve('success');
      } else {
        reject('Error: please enter name and comment');
      }
    });
    return prom.then((fromResolve) => {
      setTimeout(() => {
        guestBook.push({
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