import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Pagination.css";

export default function PaginationFor({
  currPage,
  numberOfPage,
  selectPageFunc,
}) {
  // const [page, setPage] = React.useState(currPage);
  const handleChange = (event, value) => {
    // setPage(value);
    selectPageFunc(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPage}
        page={currPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
