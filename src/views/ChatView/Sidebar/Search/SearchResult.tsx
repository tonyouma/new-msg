import React from 'react';

import {
  Box,
  List,
  Avatar,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
} from '@material-ui/core';
import SearchNotFound from './SearchNotFound';

interface IResults {
  name: string;
  avatar: string;
  id: number;
}

interface ISearchResults {
  query: string;
  results: Array<IResults>;
}

const SearchResults: React.FC<ISearchResults> = (props) => {
  const { query, results } = props;
  const isFound = results.length > 0;
  return (
    <>
      <div>
        <Box>
          <Typography>Messages</Typography>
        </Box>
        <List disablePadding>
          {results.map((result) => (
            <ListItem key={result.id} button>
              <ListItemAvatar>
                <Avatar alt={result.name} src={result.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={result.name}
                primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
              />
            </ListItem>
          ))}
        </List>
        {!isFound && <SearchNotFound searchQuery={query} />}
      </div>
    </>
  );
};

export default SearchResults;