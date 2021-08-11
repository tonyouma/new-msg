// material
import { Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// @types
import { Conversation, Participant, SendMessage } from '../../../models/chat';
// routes
import {
  addRecipients, getConversation,
  getParticipants,
  markConversationAsRead, onSendMessage, resetActiveConversation
} from '../../../store/slices/chat';
// redux
import { RootState, useDispatch, useSelector } from '../../../store/store';
import ChatHeaderCompose from './ChatHeaderCompose';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessage/ChatMessageInput';
import ChatMessageList from './ChatMessage/ChatMessageList';
//
import ChatRoom from './ChatRoom';

// ----------------------------------------------------------------------


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.07)",
    borderRadius: 5,
        marginLeft: 30

  },
  main: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
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

const ChatWindow: React.FC<{}> = () => {
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
        navigate("/chat/new");
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

  return (
    <Box className={classes.root}>
      {mode === 'DETAIL' ? (
        <ChatHeaderDetail participants={displayParticipants} />
      ) : (
        <ChatHeaderCompose
          recipients={recipients}
          contacts={Object.values(contacts.byId)}
          onAddRecipients={handleAddRecipients}
        />
      )}

      <Divider />

      <Box className={classes.main}>
        <Box style={{ display: 'flex', flexGrow: 1, flexDirection: 'column',  }}>
          <ChatMessageList conversation={conversation} />

<Box
          style={{
            backgroundColor: "#F2F2F2",
            paddingLeft: 30,
            paddingTop: 16
          }}
        >
          <ChatMessageInput
            // @ts-ignore
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === "chat/new"} 
          />
        </Box>
</Box>
        {mode === 'DETAIL' && (
          <ChatRoom conversation={conversation} participants={displayParticipants} />
        )}
      </Box>
    </Box>
  );
}

export default ChatWindow;
