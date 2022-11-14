import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#260d4a",
    },
    secondary: {
      main: "#583c64",
    },
    text: {
      primary: "rgba(12,1,22,0.87)",
      secondary: "rgba(16,1,43,0.54)",
      hint: "rgba(19,5,47,0.38)",
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function TagsMui({ tags, selectTagsFunc, reset, resetFunc }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    if (personName.length) {
      selectTagsFunc((prev) => {
        return { ...prev, tags: personName.join(","), page: "1" };
      });
    } else {
      selectTagsFunc((prev) => {
        return { ...prev, tags: "" };
      });
    }
    // eslint-disable-next-line
  }, [personName]);
  useEffect(() => {
    resetFunc(false);
    selectTagsFunc((prev) => {
      return { ...prev, tags: "" };
    });
    setPersonName([]);
    // eslint-disable-next-line
  }, [reset]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
