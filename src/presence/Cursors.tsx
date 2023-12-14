import * as React from "react";
import useCursorTracking from "./use-cursors";
import OtherCursors from "./other-cursors";
import Chat from "./Chat";

const ENABLE_CHAT = false;

export default function Cursors() {
  useCursorTracking("document");

  return (
    <>
      <OtherCursors showChat={ENABLE_CHAT} />
      {ENABLE_CHAT && <Chat />}
    </>
  );
}
