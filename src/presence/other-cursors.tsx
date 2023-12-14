import * as React from "react";
import Cursor from "./cursor";
import { usePresenceWithCursors } from "./use-cursors";

export default function OtherCursors({
  showChat = false,
}: {
  showChat: boolean;
}) {
  const otherUserIds = usePresenceWithCursors((state) =>
    Array.from(state.otherUsers.keys())
  );
  const within = usePresenceWithCursors((state) => state.within);

  const style = {
    position: (within === "window"
      ? "fixed"
      : "absolute") as React.CSSProperties["position"],
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "clip",
    pointerEvents: "none" as React.CSSProperties["pointerEvents"],
  };

  return (
    <div style={style}>
      {otherUserIds.map((id) => {
        return (
          <Cursor key={id} userId={id} fill={"#00f"} showChat={showChat} />
        );
      })}
    </div>
  );
}
