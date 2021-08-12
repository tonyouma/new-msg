import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { Box, IconButton, useMediaQuery } from '@material-ui/core';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Edit3 as EditIcon } from 'react-feather';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @types
import { Contact } from '../../../../models/chat';
// redux
import { RootState, useSelector } from '../../../../store/store';
// utils
import axios from '../../../../utils/axios';
import Scrollbar from '../../../Scrollbar';
import ChatContactSearch from './ChatContactSearch';
import ChatConversationList from './ChatConversationList';
import ChatSearchResults from './ChatSearchResults';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: 360,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('width'),
}));

// ----------------------------------------------------------------------

export default function ChatSidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSidebar, setOpenSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const displayResults = searchQuery && isSearchFocused;
  const { conversations, activeConversationId } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (isMobile) {
      return setOpenSidebar(false);
    }
    return setOpenSidebar(true);
  }, [isMobile]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  const handleChangeSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/chat/search', {
          params: { query: value }
        });
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchSelect = (username: string) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigate(`${username}`);
  };

  const handleSelectContact = (result: Contact) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
    }
  };

  return (
    <RootStyle style={{ ...(!openSidebar && { width: 96 }) }}>
      <Box style={{  }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {openSidebar && (
            <>
              {/* <ChatAccount /> */}
              {openSidebar && (
          <ChatContactSearch
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
              <Box style={{ flexGrow: 1, marginRight: 15 }} />
            </>
          )}

          <IconButton onClick={() => setOpenSidebar(!openSidebar)}>
            <Icon
              width={20}
              height={20}
              icon={openSidebar ? arrowIosBackFill : arrowIosForwardFill}
            />
          </IconButton>

          {openSidebar && (
            <IconButton
              to="chat/new"
              component={RouterLink}
            >
              <EditIcon size='20'/>
            </IconButton>
          )}
        </Box>

        
      </Box>

      <Scrollbar>
        {!displayResults ? (
          <ChatConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={activeConversationId}
            style={{ ...(isSearchFocused && { display: 'none' }) }}
          />
        ) : (
          <ChatSearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbar>
    </RootStyle>
  );
}
