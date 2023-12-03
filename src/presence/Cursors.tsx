import * as React from "react";
import useCursorTracking from "./use-cursors";
import OtherCursors from "./other-cursors";

export default function Cursors() {
  useCursorTracking("document");
  return <OtherCursors />;
}
