// material
import { Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// @types
import { Conversation, Participant, SendMessage } from "../../../models/chat";
import {
  addRecipients,
  onSendMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
} from "../../../shared/store/actions/chat";
// redux
import ChatHeaderCompose from "../ChatHeader/ChatHeaderCompose";
import ChatHeaderDetail from "../ChatHeader/ChatHeaderDetail";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";
import { ChatWindowWrapper } from "../styles";
import { IChatState } from "../../../shared/store/types/chat";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  main: {
    flexGrow: 1,
    display: "flex",
    overflow: "hidden",
  },
}));

const conversationSelector = (state: IChatState): Conversation => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId
    ? conversations.byId[activeConversationId]
    : null;
  if (conversation) {
    return conversation;
  }
  const initState: Conversation = {
    id: "",
    messages: [],
    participants: [],
    unreadCount: 0,
    type: "",
  };
  return initState;
};

const ChatWindow: React.FC<{}> = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { conversationKey } = useParams();
  const { contacts, recipients, participants, activeConversationId } =
    useSelector((state: IChatState) => state.chat);
  const conversation = useSelector((state: IChatState) =>
    conversationSelector(state)
  );
  const mode = conversationKey ? "DETAIL" : "COMPOSE";
  const displayParticipants = participants.filter(
    (item: { id: string }) =>
      item.id !== "8864c717-587d-472a-929a-8e5f298024da-0"
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

  const handleSendMessage = (value: SendMessage) => {
    dispatch(onSendMessage(value));
    console.log("send message", value);
  };

  return (
    <ChatWindowWrapper>
      {mode === "DETAIL" ? (
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
        <Box style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          <ChatMessageList conversation={conversation} />

          <ChatMessageInput
            // @ts-ignore
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === "chat/new"}
          />
        </Box>
      </Box>
    </ChatWindowWrapper>
  );
};

export default ChatWindow;
