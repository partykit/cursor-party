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
      // Reset any timeouts
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setListening(false);
        setMessage((prev) => "");
      }, 10000);

      if (!listening) {
        if (event.key === "/") {
          setMessage((prev) => "");
          setListening(true);
        }
      } else {
        if (!event.metaKey && !event.ctrlKey && !event.altKey) {
          if (event.key === "Enter") {
            setListening(false);
          } else if (event.key === "Escape") {
            setListening(false);
            setMessage((prev) => "");
          } else if (event.key === "Backspace") {
            setMessage((prev) => prev.slice(0, -1));
          } else if (event.key.length === 1) {
            setMessage((prev) => {
              return prev.length < 30 ? prev + event.key : prev;
            });
          }

          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }
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
          position: "fixed",
          fontSize: "16px",
          color: "white",
          borderRadius: "9999px",
          whiteSpace: "nowrap",
          backgroundColor: "#00f",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "12px",
          paddingRight: "12px",
          top: "6px",
          left: "6px",
        }}
      >
        {message ? message : "..."}
      </div>
    );
  }

  return null;
}
