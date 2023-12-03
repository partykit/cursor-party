import * as React from "react";
import { render } from "react-dom";
import PresenceProvider from "./presence/presence-context";
import Cursors from "./presence/Cursors";

function App() {
  return (
    <PresenceProvider
      host="localhost:1999"
      room="default"
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
// add a classname
cursorsRoot.classList.add("cursors-root");

render(<App />, cursorsRoot);
