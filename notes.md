### Improvements

- sort out scoring: do a check for success
- improve layout and styling
- use firebase to store scores

### Done
- change everything to oop
- create another grid that shows status or change colour of each block to show status
- dynamically generate blocks based on dropdown showing 2x2, 3x3 etc

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