# Sliders Game

### Links 🔗

- [Play the game](https://js-sliders-game.vercel.app/)
- [View the Github repo](https://github.com/rolandjlevy/js-sliders-game)
- [Featured on Clone Wars](https://github.com/GorvGoyl/Clone-Wars#clones-and-alternatives)

### Demo 🏁

![Sliders demo](https://github.com/rolandjlevy/js-sliders-game/blob/master/images/sliders-demo.gif?raw=true 'Sliders demo')

### How to Play Sliders 👉

- Choose the game size: 3x3, 4x4 etc...
- Slide pieces into the empty space from above, below or the side
- Position numbers in the correct order in the fewest possible moves
- Pieces turn green in the correct position
- When you've completed the game, add your score to the Leader Board
- See demo above ⬆

### Features 💡

- Made with Vanilla JavaScript and CSS only
- Mobile friendly and fully responsive
- Leader board scores saved to database using MongoDB Atlas - [view the Node API](https://github.com/rolandjlevy/node-api-serverless) which uses Vercel's serverless functions
- Uses DOMPurify to sanitize input. [DOMPurify](https://www.npmjs.com/package/dompurify) is a DOM-only sanitizer to protect against Cross-Site Scripting (XSS) attacks
- Includes Help section and initializing sequence to randomize game

### How to run this app in Github CodeSpaces

- Run http-server with nodemon

```bash
npm i -g http-server
```

```bash
npm i nodemon -g
```

```bash
nodemon --exec http-server
```

or

```bash
which http-server`
```

- Run http-server without nodemon

```bash
http-server -c-1
```

- Click 'Open in Browser' or from the Terminal, click the link Forwarded Address link from PORTS
