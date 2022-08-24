import React, { useState } from "react";
import { Input, Button, IconButton } from "@chakra-ui/react";
import useStyles from "./styles";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const classes = useStyles();

  const handleChange = (e) => setQuery(e.target.value);

  const search = () => console.log("xd");

  return (
    <>
      <div className={classes.container}>
        <form
          className={classes.searchBar}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            className={classes.textField}
            name="query"
            required
            fullWidth
            variant="outlined"
            color="primary"
            value={query}
            placeholder={"Type here.."}
            inputProps={{ disableUnderline: true, className: classes.input }}
            onChange={handleChange}
          />
          <IconButton onClick={() => search()}></IconButton>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
