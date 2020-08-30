### nice shuffle function

- From: https://javascript.info/task/shuffle

```js
function shuffle(array, prop) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i][prop], array[j][prop]] = [array[j][prop], array[i][prop]];
  }
}
```

### create an array containing 1-n

- From https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

```js
Array.from(Array(10).keys())
```

### Links
- [Javascript event handler with parameters](https://stackoverflow.com/questions/10000083/javascript-event-handler-with-parameters)
- [Javascript string](https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption)

### Firebase Resources

**Tutorial 1**
- [tutorial by @yevbar, Yev Barkalov](https://blog.repl.it/firebase)
- [tutorial by @Jp2323, Jorge P](https://repl.it/@Jp2323/firebase)
- Add Firebase to your web app from cog > Project settings > General > Add Web App

**Tutorial 2**
- https://codepen.io/k3no/post/getting-started-with-firebase
- [from medium.com](https://medium.com/@collardeau/es6-promises-wit=h-firebase-76606f36c80c)

### Ideas and fixes - done
- fix sorting when score is added to leader board
- change everything to oop
- change colour of each block to show status
- dynamically generate blocks based on dropdown showing 2x2, 3x3 etc
- sort out scoring: do a check for win
- use firebase to store scores
- fix bug when game size increases and heading dissapears
- improve sequence of winning - layout and styling
- sort out position and width of leaderboard when score is added
- create new game in addScoreButton click, line 69
- create an .env file so firebase api key isn't exposed

### Improvements

- create auto-solve button which randomly picks a div and triggers click event