import React from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface ISearchNotFoundProps {
  searchQuery: string;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  queryNotFound: {
    margin: "auto",
    padding: 16,
    borderRadius: 5,
    width: `calc(100% - 48)`,
    backgroundColor: "#F2F2F2"
  }
}));
const SearchNotFound: React.FC<ISearchNotFoundProps> = (props) => {
  const classes = useStyles();

  const { searchQuery } = props;
  return (
    <Box className={classes.queryNotFound}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos using
        complete words
      </Typography>
    </Box>
  );
};

export default SearchNotFound;
