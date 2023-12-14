# Cursor Party

**🎈 Easily add multiplayer cursors to any website.**

Follow these instructions and add one script tag. It works on static websites and web apps too.

_Why?_

- Vibes
- Because you can start here and then customize.

👉 See a demo: [here's the Cursor Party deployment](https://cursor-party.labs.partykit.dev) behind the multiplayer cursors on the [PartyKit blog](https://blog.partykit.io).

## tl;dr

```console
$ git clone https://github.com/partykit/cursor-party.git  # this repo
$ cd cursor-party
$ npm install
$ cp .env.example .env
$ npx partykit login  # note your username
$ vi .env  # add your PartyKit username and set your website URL
$ npm run deploy
```

Now add `<script src="https://cursor-party.YOUR-USERNAME-HERE.partykit.dev/cursors.js"></script>` in your HTML, just before the closing `</body>` tag.

Get fixes and new features by periodically running `git pull`.

Welcome to the party, pal!

## Getting Started

_Follow these instructions if you don't want to customize the display of the cursors._

### What you'll need

- A development machine with [Node.js](https://nodejs.org/en/) installed, or a Replit account
- A [GitHub](https://github.com) account

### Clone this repo and login to PartyKit

_For local development:_

```console
$ git clone https://github.com/partykit/cursor-party.git  # wherever you keep code
$ npm install
$ npx partykit login  # note your username
```

_Developing on Replit:_

- Create a new Repl and choose "Import from GitHub" from the dialog box. Enter the URL `https://github.com/partykit/cursor-party.git`
- Follow the instructions below: [Logging into PartyKit from Replit](#logging-into-partykit-from-replit)
- In the Shell type `npm install` and then `npx partykit whoami` -- and make a note of your username.

### Test your installation (local development only)

Type `npx partykit dev`.

Go to `http://127.0.0.1:1999` in your browser. You should see a PartyKit welcome page with the title 'Cursor Party'. Open another browser to the same page and confirm that they share multiplayer cursors.

When you deploy this installation to the PartyKit platform, it will act as your backend for multiplayer cursors on any website you configure.

### Configure and deploy your PartyKit server

In your working directory, run `cp .env.example .env`. This sets environment variables for your PartyKit server.

The `WEBSITES` environment variable is an allowlist. It is a JSON array of URL patterns using the [URL Patterns API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API), and only websites that match one of the patterns will be allowed to use your PartyKit server.

_(This is important because PartyKit has a free tier with usage limits. Very large websites, or running cursors on websites, could mean you'll need to upgrade to a paid plan.)_

Modify your `.env` to:

- Add your PartyKit username to the first backend URL
- Add a URL pattern for your website

For example:

```env
WEBSITES=["https://cursor-party.genmon.partykit.dev/*", "https://(www.)?interconnected.org/*"]
```

### Deploy and test

- Run `npm run deploy`
- In your browser, visit `https://cursor-party.YOUR-USERNAME-HERE.partykit.dev`

You should see the same welcome page as before.

Make a note of the script tag. It will look something like:

```html
<script src="https://cursor-party.YOUR-USERNAME-HERE.partykit.dev/cursors.js"></script>
```

### Add multiplayer cursors to your website

The final step is to add the script tag from the previous step to the HTML of your website. Add it just before the closing `</body>` tag.

Now you can test your website. Open two browsers to your website and you should see multiplayer cursors.

🎈 You're done!

BONUS SECRET FEATURE: type `/` to cursor chat with other users.

### Stay up to date

Run `git pull` periodically in your working directory for new features and fixtures. Also run `npm install` to keep the dependencies up to date.

## Disabling secret cursor chat

- In `src/presence/Cursors.tsx` set `ENABLE_CHAT = false`

## Customizing the display of the cursors

You can modify the code in this repo to change the display of the cursors. You'll need to be familiar with JavaScript and CSS.

- Instead of cloning this repo, fork it to your own GitHub account
- `src/presence/Cursors.tsx`: To make the cursors fit in the browser windows instead of over the full document, change the hook to read: `useCursorTracking("document")`
- `src/presence/other-cursors.tsx`: Change the cursor container here, for example to change the z-index
- `src/presence/cursor.tsx`: Change the appearance of a cursor here, for example to swap out the pointer for an image of your choosing.

## Detailed instructions

### Logging into PartyKit from Replit

Logging into PartyKit from Replit is a little different from logging in from your own machine. You'll need to create and use a GitHub token.

- Sign into GitHub and go to _Settings_ > _Developer Settings_ > [Personal Access Tokens (classic)](https://github.com/settings/tokens)
- From the menu, choose _Generate new token_ > _Generate new token (classic)_
- _Note_ field: enter `Replit PartyKit login` or similar
- _Expiration_ dropdown: choose `No expiration`
- Choose _Generate Token_ at the bottom of the page
- Copy the token to your clipboard

Now you can login to PartyKit from Replit. In Replit:

- In the _Tools_ menu, choose _Secrets_
- In the Secrets pane, choose _+ New Secret_
- Make a secret with key `GITHUB_LOGIN` and the value is your GitHub username. Tap _Add Secret_
- Choose _+ New Secret_ again
- Make a secret with key `GITHUB_TOKEN` and the value is the token you generated above. Tap _Add Secret_
- Confirm that both secrets are listed in the _Secrets_ pane
- If the _Shell_ pane is open, close it and then open it again.

Test your login by typing:

- `npx partykit login`
- and then: `npx partykit whoami` # if this hangs, close and re-open the Shell
