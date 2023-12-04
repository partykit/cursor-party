## 🎈 cursor-party

Welcome to the party, pal!

This is a [Partykit](https://partykit.io) project, which lets you create real-time collaborative applications with minimal coding effort.

[`server.ts`](./src/server.ts) is the server-side code, which is responsible for handling WebSocket events and HTTP requests. [`client.ts`](./src/client.ts) is the client-side code, which connects to the server and listens for events.

You can start developing by running `npm run dev` and opening [http://localhost:1999](http://localhost:1999) in your browser. When you're ready, you can deploy your application on to the PartyKit cloud with `npm run deploy`.

Refer to our docs for more information: https://github.com/partykit/partykit/blob/main/README.md. For more help, reach out to us on [Discord](https://discord.gg/g5uqHQJc3z), [GitHub](https://github.com/partykit/partykit), or [Twitter](https://twitter.com/partykit_io).

- clone this repo
- modify partykit.json5#vars.WEBSITES
- modify cursors.tsx
- npx partykit deploy
- insert `<script src="https://cursor-party.<username>.partykit.dev/cursors.js"></script>` in your html

### Issues

- When a website pattern in `partykit.json` is not a valid regular expression, the error is is not very helpful
- `cursors.tsx` needs the current hostname (varies in dev and prod). In dev, can be localhost or 127.0.0.1. Would be good if this were automatic
- When deploying, using `npx partykit deploy --with-vars` is required. Should this be in `package.json`?
- [To check] When deploying, is `npm run dev` required first to ensure that `dist` is up to date?
- Browser console shows error `Failed to load resource: the server responded with a status of 404 ()` for path `/dist/client.css`
- Move configuration to `.env`? That way you don't have a modified repo hanging around and it's easier to ship updates
