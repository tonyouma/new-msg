import { useState } from 'react';
import { Icon } from '@iconify/react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Avatar, TextField, Typography, Autocomplete } from '@material-ui/core';
// @types
import { Participant } from '../../../types/chat';
import SearchNotFound from '../../../views/ChatView/Sidebar/Search/SearchNotFound';
import MChip from '../../@material-extend/MChip';
//
// import { MChip } from '../../@material-extend';
// import SearchNotFound from '../../SearchNotFound';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3)
}));

const AutocompleteStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    '&.Mui-focused .MuiAutocomplete-inputRoot': {
      // 
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      // borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

type ChatHeaderComposeProps = {
  contacts: Participant[];
  recipients: Participant[];
  onAddRecipients: (data: Participant[]) => void;
};

export default function ChatHeaderCompose({
  contacts,
  recipients,
  onAddRecipients
}: ChatHeaderComposeProps) {
  const [query, setQuery] = useState('');

  const handleAddRecipient = (recipients: Participant[]) => {
    setQuery('');
    onAddRecipients(recipients);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle2" style={{ color: 'text.secondary' }}>
        To:
      </Typography>

      <AutocompleteStyle>
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
              <li {...props}>
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    position: 'relative'
                  }}
                >
                  <Avatar alt={name} src={avatar} />
                  <Box
                    style={{
                      top: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                      // transition: (theme) =>
                      //   theme.transitions.create('opacity', {
                      //     easing: theme.transitions.easing.easeInOut,
                      //     duration: theme.transitions.duration.shorter
                      //   }),
                      ...(selected && {
                        opacity: 1,
                        color: 'primary.main'
                      })
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
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </li>
            );
          }}
          renderTags={(recipients, getTagProps) =>
            recipients.map((recipient, index) => {
              const { name, avatar } = recipient;
              return (
                // eslint-disable-next-line react/jsx-key
                <MChip
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
            <TextField {...params} placeholder={recipients.length === 0 ? 'Recipients' : ''} />
          )}
        />
      </AutocompleteStyle>
    </RootStyle>
  );
}
