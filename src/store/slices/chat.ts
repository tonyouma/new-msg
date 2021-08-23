import { createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { Conversation, Participant } from "../../models/chat";
import chatApiService from "../../services/api/chat";
import "../../_api_";
import { dispatch } from "../store";

// ----------------------------------------------------------------------

function objFromArray(array: any[], key = "id") {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

type ChatState = {
  isLoading: boolean;
  error: boolean;
  contacts: {
    byId: Record<string, Participant>;
    allIds: string[];
  };
  conversations: {
    byId: Record<string, Conversation>;
    allIds: string[];
  };
  activeConversationId: null | string;
  participants: Participant[];
  recipients: any[];
};

const initialState: ChatState = {
  isLoading: false,
  error: false,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: [],
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // START LOADING
    STARTLOADING: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    // HAS ERROR
    HAS_ERROR: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    // GET CONTACT SSUCCESS
    GET_CONTACTS_SUCCESS: (state, action) => {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    // rewires the state to include the new conversations
    GET_CONVERSATIONS: (state, action) => {
      const conversations = action.payload;

      state.conversations.byId = objFromArray(conversations);
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    GET_CONVERSATION: (state, action) => {
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
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const conversation = action.payload;
      const {
        conversationId,
        messageId,
        message,
        contentType,
        attachments,
        createdAt,
        senderId,
      } = conversation;

      const newMessage = {
        id: messageId,
        body: message,
        contentType,
        attachments,
        createdAt,
        senderId,
      };

      state.conversations.byId[conversationId].messages.push(newMessage);
    },

    MARK_CONVERSATION_AS_READ: (state, action) => {
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
    },

    // GET PARTICIPANTS
    GET_PARTICIPANTS: (state, action) => {
      return {
        ...state,
        participants: action.payload,
      };
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      return {
        ...state,
        activeConversationId: null,
      };
    },

    addRecipients(state, action) {
      return {
        ...state,
        recipients: action.payload,
      };
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { addRecipients, onSendMessage, resetActiveConversation } =
  slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async () => {
    dispatch(slice.actions.STARTLOADING());
    await chatApiService
      .getContacts()
      .then((response: AxiosResponse) => {
        dispatch(slice.actions.GET_CONTACTS_SUCCESS(response.data.contacts));
      })
      .catch((error: AxiosError) => dispatch(slice.actions.HAS_ERROR(error)));
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async () => {
    dispatch(slice.actions.STARTLOADING());
    await chatApiService
      .getConversations()
      .then((response: AxiosResponse) => {
        dispatch(slice.actions.GET_CONVERSATIONS(response.data.conversations));
      })
      .catch((error: AxiosError) => dispatch(slice.actions.HAS_ERROR(error)));
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey: string) {
  return async () => {
    dispatch(slice.actions.STARTLOADING());
    await chatApiService
      .getConversation(conversationKey)
      .then((response: AxiosResponse) => {
        dispatch(slice.actions.GET_CONVERSATION(response.data.conversation));
      })
      .catch((error: AxiosError) => dispatch(slice.actions.HAS_ERROR(error)));
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId: string) {
  return async () => {
    dispatch(slice.actions.STARTLOADING());
    await chatApiService
      .markConversationAsRead(conversationId)
      .then(() => {
        dispatch(slice.actions.MARK_CONVERSATION_AS_READ({ conversationId }));
      })
      .catch((error: AxiosError) => dispatch(slice.actions.HAS_ERROR(error)));
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey: string) {
  return async () => {
    dispatch(slice.actions.STARTLOADING());
    await chatApiService
      .getParticipants(conversationKey)
      .then((response: AxiosResponse) => {
        dispatch(slice.actions.GET_PARTICIPANTS(response.data.participants));
      })
      .catch((error: AxiosError) => {
        dispatch(slice.actions.HAS_ERROR(error));
      });
  };
}
