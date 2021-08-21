// / action creators
import { AxiosError, AxiosResponse } from "axios";
import { Conversation, Participant } from "../../models/chat";
import chatApiService from "../../services/api/chat";
import "../../_api_";
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
  START_LOADING,
} from "../types/chat";

// // GET PARTICIPANTS
// export function getParticipantsSuccess(participants: Participant) {
//     return {
//         type: GET_PARTICIPANTS,
//         payload: participants
//     };
// }

// export const getConversationsSuccess = (conversations: Conversation[]) => {
//     return {
//         type: GET_CONVERSATIONS_SUCCESS,
//         payload: {
//             conversations
//         }
//     }
// }

// export const getConversationSuccess = (conversation: Conversation) => {

//     return {
//         type: GET_CONVERSATION_SUCCESS,
//         payload: {
//             conversation
//         }
//     }
// }

// export const onSendMessage = (conversation: Conversation) => {
//     return {
//         type: ON_SEND_MESSAGE,
//         payload: {
//             conversation
//         }
//     }
// }

export const resetActiveConversation = (conversationId: string) => {
  return {
    type: RESET_ACTIVE_CONVERSATION,
    payload: {
      conversationId,
    },
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
        dispatch({
          type: GET_CONTACTS_SUCCESS,
          payload: response.data.contacts,
        });
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
        dispatch({
          type: GET_CONVERSATIONS_SUCCESS,
          payload: response.data.conversations,
        });
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
        dispatch({
          type: GET_PARTICIPANTS,
          payload: response.data.participants,
        });
      })
      .catch((error: AxiosError) =>
        dispatch({ type: HAS_ERROR, payload: error })
      );
  };
}
