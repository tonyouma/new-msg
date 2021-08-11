// material
import {
  List,
  Avatar,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
// @types
import { Contact } from '../../../types/chat';
import SearchNotFound from '../../../views/ChatView/Sidebar/Search/SearchNotFound';
//

// ----------------------------------------------------------------------

type ChatSearchResultsProps = {
  query: string;
  results: Contact[];
  onSelectContact: (contact: Contact) => void;
};

export default function ChatSearchResults({
  query,
  results,
  onSelectContact
}: ChatSearchResultsProps) {
  const isFound = results.length > 0;

  return (
    <>
      <Typography paragraph variant="subtitle1" style={{  color: 'text.secondary' }}>
        Contacts
      </Typography>

      <List disablePadding>
        {results.map((result) => (
          <ListItem
            key={result.id}
            button
            onClick={() => onSelectContact(result)}
            style={{
            }}
          >
            <ListItemAvatar>
              <Avatar alt={result.name} src={result.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={result.name}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2'
              }}
            />
          </ListItem>
        ))}
      </List>
      {!isFound && (
        <SearchNotFound
          searchQuery={query}
         
        />
      )}
    </>
  );
}
