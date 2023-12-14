import * as React from "react";
import { useState, useEffect } from "react";
import { usePresence } from "./presence-context";

const styles: Record<string, React.CSSProperties> = {
  container: {
    boxSizing: "border-box",
    position: "fixed",
    bottom: "24px",
    right: "32px",
    padding: "8px",
    height: "48px",
    borderRadius: "24px",
    minWidth: "4.4em",
    backgroundColor: "rgba(52, 199, 89, 1)",
    color: "white",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    gap: "8px",
    fontFamily:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: 320,
  },
  input: {
    boxSizing: "border-box",
    padding: "0px 4px 0px 4px",
    margin: "0px",
    fontSize: "24px",
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  button: {
    boxSizing: "border-box",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: 250,
    padding: "0px",
    margin: "0px",
    border: "0.5px solid rgba(255,255,255,0.75)",
    cursor: "pointer",
    color: "white",
    backgroundColor: "transparent",
  },
};

export default function Chat() {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { updatePresence, showCTA } = usePresence((state) => {
    // Go through state.otherUsers.message and set showCTA to true if any of them have a non-null, non-empty message
    const otherUsers = Array.from(state.otherUsers.values());
    let showCTA = false;
    for (const user of otherUsers) {
      if (user.presence?.message) {
        showCTA = true;
        break;
      }
    }

    return {
      updatePresence: state.updatePresence,
      showCTA,
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
              return prev.length < 42 ? prev + event.key : prev;
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
      <div style={styles.container}>
        <div style={styles.input}>{message ? message : "..."}</div>
        <div
          style={styles.button}
          onClick={() => {
            setListening(false);
            setMessage("");
          }}
        >
          &times;
        </div>
      </div>
    );
  } else if (showCTA) {
    return (
      <div style={styles.container}>
        <div style={styles.input}>Type / to reply</div>
      </div>
    );
  }

  return null;
}
