import * as React from "react";
import { render } from "react-dom";
import PresenceProvider from "./presence/presence-context";
import Cursors from "./presence/Cursors";

function App() {
  const pageId = window?.location.href
    ? btoa(window.location.href.split(/[?#]/)[0])
    : "default";
  return (
    <PresenceProvider
      host="localhost:1999"
      room={pageId}
      presence={{
        name: "Anonymous DJ",
        color: "#0000f0",
      }}
    >
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
