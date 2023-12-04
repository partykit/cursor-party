## 🎈 cursor-party

> [!IMPORTANT]  
> This project is a work in progress. It is not yet ready for use.

This [PartyKit](https://www.partykit.io) project makes it easy to add multiplayer cursors to your website.

- clone this repo
- modify partykit.json5#vars.WEBSITES
- modify cursors.tsx
- `npx partykit deploy --with-vars`
- insert `<script src="https://cursor-party.<username>.partykit.dev/cursors.js"></script>` in your html

Welcome to the party, pal!

### Issues

- When a website pattern in `partykit.json` is not a valid regular expression, the error is is not very helpful
- `cursors.tsx` needs the current hostname (varies in dev and prod). In dev, can be localhost or 127.0.0.1. Would be good if this were automatic
- ~~when deploying, using `npx partykit deploy --with-vars` is required. Should this be in `package.json`?~~ `npm run deploy`
- [To check] When deploying, is `npm run dev` required first to ensure that `dist` is up to date?
- Browser console shows error `Failed to load resource: the server responded with a status of 404 ()` for path `/dist/client.css`
- Move configuration to `.env`? That way you don't have a modified repo hanging around and it's easier to ship updates
