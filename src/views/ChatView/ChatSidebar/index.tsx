import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import { Icon } from "@iconify/react";
import { Box, IconButton, useMediaQuery } from "@material-ui/core";
import { useSelector } from "react-redux";

// material
import { useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Edit3 as EditIcon } from "react-feather";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// @types
import { Contact } from "../../../models/chat";
// redux
import { IChatState } from "../../../shared/store/types/chat";
// utils
import Scrollbar from "../../../shared/Components/Scrollbar";
import { SidebarContainer } from "../styles";
import ChatContactSearch from "./ChatContactSearch";
import ChatConversationList from "./ChatConversationList";
import ChatSearchResults from "./ChatSearchResults";
import chatApiService from "../../../shared/services/api/chat";

const ChatSidebar: React.FC<{}> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openSidebar, setOpenSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const displayResults = searchQuery && isSearchFocused;
  const { conversations, activeConversationId } = useSelector(
    (state: IChatState) => state.chat
  );

  useEffect(() => {
    if (isMobile) {
      return setOpenSidebar(false);
    }
    return setOpenSidebar(true);
  }, [isMobile]);

  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery("");
  };

  const handleChangeSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await chatApiService.chatSearch(value);
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
    setSearchQuery("");
    navigate(`/chat/${username}`);
  };

  const handleSelectContact = (result: Contact) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.username);
    }
  };

  return (
    <SidebarContainer style={{ ...(!openSidebar && { width: 80 }) }}>
      <Box style={{}}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          {openSidebar && (
            <>
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
            <IconButton to="/chat/new" component={RouterLink}>
              <EditIcon size="20" />
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
            style={{ ...(isSearchFocused && { display: "none" }) }}
          />
        ) : (
          <ChatSearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbar>
    </SidebarContainer>
  );
};

export default ChatSidebar;
