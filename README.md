## 🎈 cursor-party

> [!IMPORTANT]  
> This project is a work in progress. It is not yet ready for use.

This [PartyKit](https://www.partykit.io) project makes it easy to add multiplayer cursors to your website.

- clone this repo

# Cursor Party

**🎈 Easily add multiplayer cursors to any website.**

Follow these instructions and add one script tag. It works on static websites and web apps too.

Why?

- Vibes
- Because you can start here and then customize.

👉 See a demo: [here's the Cursor Party deployment](#) behind the multiplayer cursors on the [PartyKit docs site](https://docs.partykit.io).

_Brought to you by [PartyKit](https://www.partykit.io)._

## tl;dr

- clone this repo
- run `cp .env.example .env`
- login to PartyKit: `npx partykit login` -- make a note of your username
- modify `.env` to set your website URL, and add your PartyKit username
- run `npm run deploy`
- add `<script type="module" src="https://cursor-party.YOUR-USERNAME-HERE.partykit.dev/cursors.js"></script>` in your HTML, just fore the closing `</body>` tag
- get fixes and new features by periodically running `git pull`

Welcome to the party, pal!

## Getting Started

_Follow these instructions if you don't want to customize the display of the cursors._

### What you'll need

- A development machine with [Node.js](https://nodejs.org/en/) installed, or a Replit account
- A [GitHub](https://github.com) account

You'll create a PartyKit account as part of these instructions, if you don't already have one.

### Clone this repo and login to PartyKit

If you're developing locally on your own machine:

- Clone this repo to wherever you want to work on it, e.g. `git clone https://github.com/partykit/cursor-party.git`
- In the working directory, run `npm install`
- Login to PartyKit: `npx partykit login` -- and make a note of your username

If you're developing on Replit:

- Create a new Repl and choose "Import from GitHub" from the dialog box. Enter the URL `https://github.com/partykit/cursor-party.git`
- In the Shell type `npm install`
- In the Shell type `npx partykit login` -- which will print instructions on how to login using GitHub tokens. [These instructions are repeated below.](#)
- Check you have logged in. In the Shell type `partykit whoami` -- and make a note of your username

### Test your installation

Run and test your local PartyKit server:

- Type `npx partykit dev`
- Go to `http://127.0.0.1:1999` in your browser (or use the Webview in Replit). You should see a PartyKit welcome page with the title "Cursor Party"
- Open another browser to the same page and note that they share multiplayer cursors.

When you deploy this installation to the PartyKit platform, it will act as your backend for multiplayer cursors on any website you configure.

### Configure and deploy your PartyKit server

- In your working directory, run `cp .env.example .env`
- Modify `.env` to list the deployment URL and the URL of your website. Read on for how to do this.

The `WEBSITES` environment variable is an allowlist. It is a JSON array of URL patterns using the [URL Patterns API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API), and only websites that match one of the patterns will be allowed to use your PartyKit server.

(This is important because PartyKit has a free tier with usage limits. Very large websites, or supporting many websites, could mean you'll need to upgrade to a pain plan.)

For example, your `.env` file might look like this:

```
WEBSITES=["https://cursor-party.genmon.partykit.dev/*", "https://(www.)?interconnected.org/*"]
```

You can see that we have (a) inserted a PartyKit username in the first backend URL, and (b) added a URL pattern for a website.

### Deploy and test your PartyKit server

- In your working directory, run `npm run deploy` -- this will deploy your Cursor Party server to the PartyKit platform, including the environment variables you have just set
- Visit your new server by opening a browser to `https://cursor-party.YOUR-USERNAME-HERE.partykit.dev` -- you should see the same welcome page as before.

### Add multiplayer cursors to your website

The last step is to add the multiplayer cursors to your website. You'll need to add a script tag to your website's HTML.

The exact steps for this will vary depending on your website. The following is an example for a static website.

You need the script tag corresponding to your new deployment. This is on the welcome page and will look something like this:

```
<script type="module" src="https://cursor-party.YOUR-USERNAME-HERE.partykit.dev/cursors.js"></script>
```

Add this script tag to your website's HTML, just before the closing `</body>` tag.

Now you can test your website. Open two browsers to your website and you should see multiplayer cursors.

🎈 You're done!

### Keep up to date

You can get fixes and new features by periodically running `git pull` in your working directory.

Also run `npm install` to keep the dependencies up to date.

## Customizing the display of the cursors

You can modify the code in this repo to change the display of the cursors. You'll need to be familiar with JavaScript and CSS.

- Instead of cloning this repo, fork it to your own GitHub account
- To make the cursors fit in the browser windows, instead of over the full document, go to `src/presence/Cursors.tsx` and change the hook to read: `useCursorTracking("document")`
- To change the cursor container, for example to change the z-index, edit `src/presence/other-cursors.tsx`
- To change the appearance of a cursor, for example to swap out the pointer for an image of your choosing, edit `src/presence/cursor.tsx`

## Detailed instructions

### Logging into PartyKit from Replit

Logging into PartyKit from Replit is a little different from logging in from your own machine. You'll need to create and use a GitHub token.

- In GitHub Settings, go to _Developer Settings_ > [Personal Access Tokens (classic)](https://github.com/settings/tokens). You'll need to be signed in with GitHub to see the page
- From the menu, choose _Generate new token_ > _Generate new token (classic)._ GitHub may ask you to confirm your password at this point
- In the _Note_ field, enter `Replit PartyKit login` or similar
- In the _Expiration_ dropdown, choose _No expiration_
- At the bottom of the page, choose _Generate Token_
- Copy the token to your clipboard

Now you can login to PartyKit from Replit. In Replit:

- In the _Tools_ menu, choose _Secrets_
- In the _Secrets_ pane, choose _+ New Secret_
- Make a secret with key `GITHUB_LOGIN` and the value is your GitHub username. Tap _Add Secret_
- Choose _+ New Secret_ again
- Make a secret with key `GITHUB_TOKEN` and the value is the token you generated above. Tap _Add Secret_
- Confirm that both secrets are listed in the _Secrets_ pane

Test your login by typing:

- `npx partykit login`
- and then: `npx partykit whoami`
