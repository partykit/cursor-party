import * as React from "react";
import { render } from "react-dom";
import PresenceProvider from "./presence/presence-context";
import Cursors from "./presence/Cursors";

// @ts-ignore
import classes from "./styles.module.css";

// declare everything imported from *.module.css to be strings

// // This doesn't appear to work right now, hence the @ts-ignore up there
// declare module "*.module.css" {
//   const classes: { [key: string]: string };
//   export default classes;
// }

console.log(classes);

declare const PARTYKIT_HOST: string;

const pageId = window?.location.href
  ? btoa(window.location.href.split(/[?#]/)[0])
  : "default";

function App() {
  return (
    <PresenceProvider
      host={PARTYKIT_HOST}
      room={pageId}
      presence={{
        name: "Anonymous User",
        color: "#0000f0",
      }}
    >
      <div className={classes.x}>Test CSS modules (should have red border)</div>
      <Cursors />
    </PresenceProvider>
  );
}

const cursorsRoot = document.createElement("div");
document.body.appendChild(cursorsRoot);
// cursors display is absolute and needs a top-level relative container
document.documentElement.style.position = "relative";
document.documentElement.style.minHeight = "100dvh";
// add a classname
cursorsRoot.classList.add("cursors-root");

render(<App />, cursorsRoot);
