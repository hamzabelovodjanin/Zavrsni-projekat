import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./PopUpMessage.css";
import { useEffect, useState } from "react";

// const typeOfPops = ["error", "warning", "info", "success"];
export default function PopUpMessage({
  typeOfMessage,
  message,
  messageFuncSetUp,
}) {
  const [displayMessage, setDisplayMessage] = useState("pop");
  useEffect(() => {
    function PopMessage() {
      setDisplayMessage("show");

      const timer = setTimeout(() => {
        setDisplayMessage("pop");
        messageFuncSetUp({ type: "success", text: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (message) {
      PopMessage();
    }
    // eslint-disable-next-line
  }, [message]);
  return (
    <div className={displayMessage}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="outlined" severity={typeOfMessage}>
          {message}
        </Alert>
      </Stack>
    </div>
  );
}
