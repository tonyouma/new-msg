// / action creators
import { AxiosError, AxiosResponse } from "axios";
import { Conversation, Participant, Contact } from "../../models/chat";
import chatApiService from "../../services/api/chat";
import "../../_api_";
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
  // ON_SEND_MESSAGE,
  RESET_ACTIVE_CONVERSATION,
  START_LOADING,
} from "../types/chat";

// // GET PARTICIPANTS
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

// export const onSendMessage = (conversation: Message) => {
//   return {
//     type: ON_SEND_MESSAGE,
//     payload: {
//       conversation,
//     },
//   };
// };

export const resetActiveConversation = () => {
  return {
    type: RESET_ACTIVE_CONVERSATION,
  };
};

// export const {} type: START_LOADING() => {
//     return {
//         type: START_LOADING
//     }
// }

// export const hasError = (error: AxiosError) => {
//     return {
//         type: HAS_ERROR,
//         payload: error
//     }
// }

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

export function getContacts() {
  return async () => {
    dispatch({ type: START_LOADING });
    await chatApiService
      .getContacts()
      .then((response: AxiosResponse) => {
        dispatch(getContactsSuccess(response.data.contacts));
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async () => {
    dispatch({ type: START_LOADING });
    await chatApiService
      .getConversations()
      .then((response: AxiosResponse) => {
        console.log(response);
        dispatch(getConversationsSuccess(response.data.conversations));
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey: string) {
  return async () => {
    dispatch({ type: START_LOADING });
    await chatApiService
      .getConversation(conversationKey)
      .then((response: AxiosResponse) => {
        dispatch({
          type: GET_CONVERSATION_SUCCESS,
          payload: response.data.conversation,
        });
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId: string) {
  return async () => {
    dispatch({ type: START_LOADING });
    await chatApiService
      .markConversationAsRead(conversationId)
      .then(() => {
        dispatch({ type: MARK_CONVERSATION_AS_READ, payload: conversationId });
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey: string) {
  return async () => {
    dispatch({ type: START_LOADING });
    await chatApiService
      .getParticipants(conversationKey)
      .then((response) => {
        dispatch(getParticipantsSuccess(response.data.participants));
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}
