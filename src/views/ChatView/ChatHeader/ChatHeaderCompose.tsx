import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
import { Icon } from "@iconify/react";
import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
// material
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useState } from "react";
// @types
import { Participant } from "../../../models/chat";
import { SearchNotFound } from "../../../shared/Components";
import { ComposeWrapper, useStyles } from "../styles";

// ----------------------------------------------------------------------

type ChatHeaderComposeProps = {
  contacts: Participant[];
  recipients: Participant[];
  onAddRecipients: (data: Participant[]) => void;
};

const ChatHeaderCompose: React.FC<ChatHeaderComposeProps> = (props) => {
  const { contacts, recipients, onAddRecipients } = props;
  const [query, setQuery] = useState("");
  const classes = useStyles();

  const handleAddRecipient = (recipients: Participant[]) => {
    setQuery("");
    onAddRecipients(recipients);
  };

  return (
    <ComposeWrapper>
      <Typography variant="subtitle2" style={{ color: "text.secondary" }}>
        To:
      </Typography>

      <Box className={classes.autocompleteContainer}>
        <Autocomplete
          multiple
          size="small"
          disablePortal
          popupIcon={null}
          noOptionsText={<SearchNotFound searchQuery={query} />}
          onChange={(e, value) => handleAddRecipient(value)}
          onInputChange={(e, value) => setQuery(value)}
          options={contacts}
          getOptionLabel={(recipient) => recipient.name}
          renderOption={(props, recipient, { inputValue, selected }) => {
            const { name, avatar } = recipient;
            const matches = match(name, inputValue);
            const parts = parse(name, matches);
            return (
              <ListItem {...props}>
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    overflow: "hidden",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  <Avatar alt={name} src={avatar} />
                  <Box
                    style={{
                      top: 0,
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      ...(selected && {
                        opacity: 1,
                        color: "primary.main",
                      }),
                    }}
                  >
                    <Icon icon={checkmarkFill} width={20} height={20} />
                  </Box>
                </Box>
                <Box style={{ marginLeft: 2 }} />
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    variant="subtitle2"
                    color={part.highlight ? "primary" : "textPrimary"}
                  >
                    {part.text}
                  </Typography>
                ))}
              </ListItem>
            );
          }}
          renderTags={(recipients, getTagProps) =>
            recipients.map((recipient, index) => {
              const { name, avatar } = recipient;
              return (
                <Chip
                  size="small"
                  label={name}
                  color="info"
                  avatar={<Avatar alt={name} src={avatar} />}
                  {...getTagProps({ index })}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={recipients.length === 0 ? "Recipients" : ""}
            />
          )}
        />
      </Box>
    </ComposeWrapper>
  );
};

export default ChatHeaderCompose;
