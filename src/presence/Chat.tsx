import * as React from "react";
import { useState, useEffect } from "react";
import { usePresence } from "./presence-context";

export default function Chat() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { updatePresence } = usePresence((state) => {
    return {
      updatePresence: state.updatePresence,
    };
  });

  // Create an event listener for the keyboard, with these rules
  // - if not listening and the user types '/' then start listening
  // - if listening and the user types 'Enter' then stop listening
  // - if listening and the user types 'Escape' then stop listening
  // - if listening and the user types any other key then append that key to the message
  // - if listening and the user types 'Backspace' then remove the last character from the message
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!listening) {
        if (event.key === "/") {
          setListening(true);
        }
      } else {
        if (
          event.key.length === 1 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey
        ) {
          if (event.key === "Enter" || event.key === "Escape") {
            setListening(false);
          } else if (event.key === "Backspace") {
            setMessage((prev) => prev.slice(0, -1));
          } else {
            setMessage((prev) => prev + event.key);
          }
        }
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setMessage((prev) => "");
      }, 10000);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [listening]);

  // When the message changes, send it to the server
  useEffect(() => {
    updatePresence({ message: message.length > 0 ? message : null });
  }, [message, updatePresence]);

  if (listening || message) {
    return (
      <div
        style={{
          position: "absolute",
          fontSize: "12px",
          color: "white",
          borderRadius: "9999px",
          whiteSpace: "nowrap",
          backgroundColor: "#00f",
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "8px",
          paddingRight: "8px",
          top: "18px",
          left: "20px",
        }}
      >
        {message ? message : "..."}
      </div>
    );
  }

  return null;
}
