import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Progres.css";

export default function Progres({ displayProgres, displayFunc }) {

  return (
    <div className={displayProgres}>
      <div className="progresContainer-display">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#424242",
          }}
        >
          <h2>Reordering Quotes</h2>
          <CircularProgress color="inherit" />
        </Box>
      </div>
    </div>
  );
}
