import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useState } from "react";
import ConversationList from "./ConversationItem/ConversationList";
import MessageSearch from "./Search/Search";
import SearchResults from "./Search/SearchResult";
import { RootState, useSelector } from "../../../store/store";
import Scrollbar from "../../../components/Scrollbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    paddingRight: 20
  },
  collapse: { width: 96 },
  hide: { display: "none" }
}));

const MessageSidebar: React.FC<{}> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isFocused, setFocused] = useState(false);
  const displayResults = searchQuery && isFocused;

  const classes = useStyles();
  const { conversations, activeConversationId } = useSelector(
    (state: RootState) => state.chat
  );



  const handleSearchClickAway = () => {
    setSearchQuery("");
    setFocused(false);
  };
  return (
    <div className={clsx(classes.root)}>
      <Box>
        <MessageSearch onClickAway={handleSearchClickAway} />
        <Scrollbar>
        {!displayResults ? (
          <ConversationList
            conversations={conversations}
            isOpenSidebar={openSidebar}
            activeConversationId={activeConversationId}
          />
        ) : (
          <SearchResults query={searchQuery} results={searchResults} />
        )}
        </Scrollbar>
      </Box>
    </div>
  );
};

export default MessageSidebar;
