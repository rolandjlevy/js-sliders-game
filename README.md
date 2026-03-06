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

### Local dev server with API proxy

The upstream Vercel API (`node-api-serverless.vercel.app`) only accepts requests from `https://js-sliders-game.vercel.app`. Any other origin — such as a Codespace URL — is blocked by the browser's CORS policy.

To work around this, a small Express server (`server.js`) acts as a local proxy:

1. The game's JavaScript always calls relative URLs (e.g. `/api/sliders/view`).
2. In development, those requests hit the local Express server on port 8080.
3. The Express server forwards them to the upstream Vercel API, spoofing the `Origin` header as `https://js-sliders-game.vercel.app` so the API accepts them.
4. The response is returned to the browser — no CORS restriction, because the request never leaves the same origin as far as the browser is concerned.

In production (deployed on Vercel) the same relative URL is handled by a rewrite rule in `vercel.json`, so no proxy is needed.

Start the dev server with:

```bash
npm install
```

```bash
npm run dev
```

Then open the Forwarded Address shown in the **PORTS** tab (port 8080).
