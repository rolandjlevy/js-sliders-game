### Improvements

- create an .env file so firebase.config isn't accessible

### Done
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

- - -

# Sharing on repl.it

read: https://repl.it/talk/learn/How-to-get-a-million-upvotes-python/29511/121164

Post on Sunday morning. Post it on share and ask DevZ to check it out. Put it on Discord too

also use this: https://repl-talk-stats.mat1.repl.co/ to see your cycle graph and post on tuesdays at 12pm cst

Title: 1️⃣  New Sliders Game with Leader Board!

# Slider Game

### Features
- This game took me 5 days to create in my spare time
- I challenged myself to only use Vanilla JS and CSS rather than use React or Vue
- Leader board scores are saved on the back-end with Firebase
- Includes Help section
- Mobile friendly
- Many thanks to @Jp2323 for [this Firebase tutorial](https://repl.it/@Jp2323/firebase)

### Instructions
- Choose the game size: 3x3, 4x4 etc...
- Slide pieces into the empty space from above, below or the side
- Position numbers in the correct order in the fewest possible moves
- Pieces turn green in the correct position
- When you've completed the game, add your score to the Leader Board

### Links
- [Live demo](https://js-sliders-game.rjlevy.repl.co/)
- [Source code](https://repl.it/@rjlevy/js-sliders-game)
- [Github repo](https://github.com/rolandjlevy/js-sliders-game)