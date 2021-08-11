import { Box, Container, Divider, Paper } from "@material-ui/core";
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import HeaderDetail from "./Header/HeaderDetail";
import MessageInput from "./Message/MessageInput";
import MessageList from "./Message/MessageList";

import { RootState, useDispatch, useSelector } from '../../../store/store';
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation
} from '../../../store/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { Conversation, Participant, SendMessage } from '../../../types/chat';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.07)",
    borderRadius: 5
  },
  main: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
    padding: "15px 30px 15px 30px"
  }
}));

const conversationSelector = (state: RootState): Conversation => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState: Conversation = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: ''
  };
  return initState;
};

const MessageWindow: React.FC<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const { contacts, recipients, participants, activeConversationId } = useSelector(
    (state: RootState) => state.chat
  );
  const conversation = useSelector((state: RootState) => conversationSelector(state));
  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';
  const displayParticipants = participants.filter(
    (item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
  );

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        await dispatch(getConversation(conversationKey));
      } catch (error) {
        console.error(error);
        navigate('chat/new');
      }
    };
    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (recipients: Participant[]) => {
    dispatch(addRecipients(recipients));
  };

  const handleSendMessage = async (value: SendMessage) => {
    try {
      dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  console.log(conversation);
  return (
    <Container component={Paper} className={classes.root} disableGutters>
      <div className={classes.root}>
        <HeaderDetail participants={displayParticipants} />
        <Divider />

        <Box className={classes.main}><MessageList conversation={conversation} /></Box>
        <Box
          style={{
            backgroundColor: "#F2F2F2",
            paddingLeft: 30,
            paddingTop: 16
          }}
        >
          <MessageInput
            // @ts-ignore
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === "chat/new"} />
        </Box>
      </div>
    </Container>
  );
};

export default MessageWindow;
