import {
  ADD_RECIPIENTS,
  GET_CONTACTS_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_SUCCESS,
  GET_PARTICIPANTS,
  HAS_ERROR,
  IChat,
  MARK_CONVERSATION_AS_READ,
  ON_SEND_MESSAGE,
  RESET_ACTIVE_CONVERSATION,
  START_LOADING,
} from "../types/chat";

const defaultState: IChat = {
  isLoading: false,
  error: false,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: [],
};

const chat = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_PARTICIPANTS: {
      return {
        ...state,
        participants: action.payload,
      };
    }
    case ADD_RECIPIENTS: {
      return {
        ...state,
        recipients: action.payload,
      };
    }
    case HAS_ERROR: {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case RESET_ACTIVE_CONVERSATION: {
      return {
        ...state,
        activeConversationId: null,
      };
    }
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: {
          ...state,
          byId: action.payload.byId,
          allIds: action.payload.allIds,
        },
      };
    case GET_CONVERSATIONS_SUCCESS: {
      return {
        ...state,
        conversations: {
          ...state.conversations,
          byId: action.payload.byId,
          allIds: action.payload.allIds,
        },
      };
    }
    case GET_CONVERSATION_SUCCESS:
      const conversation = action.payload;
      const conversationId = conversation.id;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          byId: {
            ...state.conversations.byId,
            [conversationId]: conversation,
          },
        },
        activeConversationId: conversationId,
      };

    case MARK_CONVERSATION_AS_READ:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          byId: {
            ...state.conversations.byId,
            [action.payload.conversationId]: {
              ...state.conversations.byId[action.payload.conversationId],
              unreadCount: 0,
            },
          },
        },
      };
    case ON_SEND_MESSAGE: {
      const conversationId = action.payload.conversationId;
      const messages = state.conversations.byId[conversationId].messages;
      messages.push(action.payload.message);
      return {
        ...state,
        conversations: {
          ...state.conversations,
          byId: {
            ...state.conversations.byId,
            [conversationId]: {
              ...state.conversations.byId[conversationId],
              messages,
            },
          },
        },
      };
    }
    //  case ON_SEND_MESSAGE:
    //    const conversationId = action.payload.conversationId;
    //    const message = action.payload.message;
    //    const conversation = state.conversations.byId[conversationId];
    //    const newMessages = [...conversation.messages, message];
    //    const newConversation = {
    //      ...conversation,
    //      messages: newMessages,
    //      unreadCount: conversation.unreadCount + 1,
    //    };
    //    return {
    //      ...state,
    //      conversations: {
    //        ...state.conversations,
    //        byId: {
    //          ...state.conversations.byId,
    //          [conversationId]: newConversation,
    //        },
    //      },
    //    };
    //  case ON_SEND_MESSAGE:
    //      const conversation = action.payload;
    //      const {
    //          conversationId,
    //          messageId,
    //          message,
    //          contentType,
    //          attachments,
    //          createdAt,
    //          senderId
    //      } = conversation;

    //      const newMessage = {
    //          id: messageId,
    //          body: message,
    //          contentType,
    //          attachments,
    //          createdAt,
    //          senderId
    //      };

    //      state.conversations.byId[conversationId].messages.push(newMessage);
    //      return state

    default:
      return state;
  }
};

export default chat;
