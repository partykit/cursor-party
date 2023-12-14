import * as React from "react";
import useCursorTracking from "./use-cursors";
import OtherCursors from "./other-cursors";
import Chat from "./Chat";

export default function Cursors() {
  useCursorTracking("document");
  return (
    <>
      <OtherCursors />
      {/*<Chat />*/}
    </>
  );
}
