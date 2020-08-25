### Improvements

- improve sequence of winning - layout and styling
- sort out position and width of leaderboard when score is added

### Done
- change everything to oop
- change colour of each block to show status
- dynamically generate blocks based on dropdown showing 2x2, 3x3 etc
- sort out scoring: do a check for win
- use firebase to store scores
- fix bug when game size increases and heading dissapears

### nice shuffle function

- https://javascript.info/task/shuffle

```js
function shuffle(array, prop) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i][prop], array[j][prop]] = [array[j][prop], array[i][prop]];
  }
}
```

### create an array containing 1-n

- from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

```js
Array.from(Array(10).keys())
```

### Links
- [Javascript event handler with parameters](https://stackoverflow.com/questions/10000083/javascript-event-handler-with-parameters)

### Firebase Resources

**Tutorial 1**
- https://blog.repl.it/firebase
- Find: Add Firebase to your web app from cog > Project settings > General > Add Web App
- https://repl.it/@Jp2323/firebase#main.js

**Tutorial 2**
- https://codepen.io/k3no/post/getting-started-with-firebase
- [from medium.com](https://medium.com/@collardeau/es6-promises-wit=h-firebase-76606f36c80c)

# Sharing on repl.it

Title: New Sliders Game with leader board

- Choose size of your game: 3x3, 4x4 etc...
- Slide pieces into the empty space, puttin them in the correct order in the fewest moves possible
- Pieces change to green when in the correct position
- Add your winning score to the Leader Board

### Features

- Using Firebase on the back-end to store leader board scores
- Mobile friendly

### Credit
Many thanks to @Jp2323 for this Firebase tutorial