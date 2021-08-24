import { AxiosError, AxiosResponse } from "axios";
import {
  Conversation,
  Participant,
  Contact,
  SendMessage,
} from "../../../models/chat";
import chatApiService from "../../services/api/chat";
import "../../data/chat";
import { normalize, schema } from "normalizr";
import { dispatch } from "../store";
import {
  ADD_RECIPIENTS,
  GET_CONTACTS_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_SUCCESS,
  GET_PARTICIPANTS,
  HAS_ERROR,
  MARK_CONVERSATION_AS_READ,
  ON_SEND_MESSAGE,
  RESET_ACTIVE_CONVERSATION,
} from "../types/chat";

export function getParticipantsSuccess(participants: Participant[]) {
  return {
    type: GET_PARTICIPANTS,
    payload: participants,
  };
}
const conversationSchema = new schema.Entity("conversations");
const conversationList = [conversationSchema];

const contactSchema = new schema.Entity("contacts");
const contactList = [contactSchema];

export const getConversationsSuccess = (conversations: Conversation) => {
  const normalizedConversations = normalize(conversations, conversationList);
  return {
    type: GET_CONVERSATIONS_SUCCESS,
    payload: {
      byId: normalizedConversations.entities.conversations,
      allIds: normalizedConversations.result,
    },
  };
};

export const getContactsSuccess = (contacts: Contact) => {
  const normalizedContacts = normalize(contacts, contactList);
  return {
    type: GET_CONTACTS_SUCCESS,
    payload: {
      byId: normalizedContacts.entities.contacts,
      allIds: normalizedContacts.result,
    },
  };
};

export const getConversationSuccess = (conversation: Conversation) => {
  return {
    type: GET_CONVERSATION_SUCCESS,
    payload: {
      conversation,
    },
  };
};

export const onSendMessage = (message: SendMessage) => {
  return {
    type: ON_SEND_MESSAGE,
    payload: {
      // conversationId,
      message,
    },
  };
};

export const resetActiveConversation = () => {
  return {
    type: RESET_ACTIVE_CONVERSATION,
  };
};

export const hasError = (error: AxiosError) => {
  return {
    type: HAS_ERROR,
    payload: error,
  };
};

export const addRecipients = (recipients: any[]) => {
  return {
    type: ADD_RECIPIENTS,
    payload: {
      recipients,
    },
  };
};

/**
 *
 */

export const getContacts = () => {
  return async () => {
    await chatApiService
      .getContacts()
      .then((response: AxiosResponse) => {
        dispatch(getContactsSuccess(response.data.contacts));
      })
      .catch((error: AxiosError) => dispatch(hasError(error)));
  };
};

// ----------------------------------------------------------------------

export const getConversations = () => {
  return async () => {
    await chatApiService
      .getConversations()
      .then((response: AxiosResponse) => {
        dispatch(getConversationsSuccess(response.data.conversations));
      })
      .catch((error: AxiosError) => dispatch(hasError(error)));
  };
};

// ----------------------------------------------------------------------

export const getConversation = (conversationKey: string) => {
  return async () => {
    await chatApiService
      .getConversation(conversationKey)
      .then((response: AxiosResponse) => {
        dispatch({
          type: GET_CONVERSATION_SUCCESS,
          payload: response.data.conversation,
        });
      })
      .catch((error: AxiosError) => dispatch(hasError(error)));
  };
};

// ----------------------------------------------------------------------

export const markConversationAsRead = (conversationId: string) => {
  return async () => {
    await chatApiService
      .markConversationAsRead(conversationId)
      .then(() => {
        dispatch({
          type: MARK_CONVERSATION_AS_READ,
          payload: conversationId,
        });
      })
      .catch((error: AxiosError) => dispatch(hasError(error)));
  };
};

// ----------------------------------------------------------------------

export const getParticipants = (conversationKey: string) => {
  return async () => {
    await chatApiService
      .getParticipants(conversationKey)
      .then((response: AxiosResponse) => {
        dispatch(getParticipantsSuccess(response.data.participants));
      })
      .catch((error: AxiosError) => dispatch(hasError(error)));
  };
};
