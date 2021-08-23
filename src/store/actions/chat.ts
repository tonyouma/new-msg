// / action creators
import { AxiosError, AxiosResponse } from 'axios';
import { Conversation, Participant } from '../../models/chat';
import chatApiService from "../../services/api/chat";
import '../../_api_';
import { dispatch } from '../store';
import { ADD_RECIPIENTS, GET_CONTACTS_SUCCESS, GET_CONVERSATIONS_SUCCESS, GET_CONVERSATION_SUCCESS, GET_PARTICIPANTS, HAS_ERROR, MARK_CONVERSATION_AS_READ, ON_SEND_MESSAGE, RESET_ACTIVE_CONVERSATION, START_LOADING } from '../types/chat';


// // GET PARTICIPANTS
export function getParticipantsSuccess(participants: Participant) {
    return {
        type: GET_PARTICIPANTS,
        payload: participants
    };
}


export const getConversationsSuccess = (conversations: Conversation[]) => {
    return {
        type: GET_CONVERSATIONS_SUCCESS,
        payload: {
            conversations
        }
    }
}

export const getConversationSuccess = (conversation: Conversation) => {

    return {
        type: GET_CONVERSATION_SUCCESS,
        payload: {
            conversation
        }
    }
}

export const onSendMessage = (conversation: Conversation) => {
    return {
        type: ON_SEND_MESSAGE,
        payload: {
            conversation
        }
    }
}

export const markConversationAsReadSuccess = (conversationId: string) => {
    return {
        type: MARK_CONVERSATION_AS_READ,
        payload: {
            conversationId
        }
    }
}

export const resetActiveConversation = (conversationId: string) => {
    return {
        type: RESET_ACTIVE_CONVERSATION,
        payload: {
            conversationId
        }
    }
}

export const startLoading = () => {
    return {
        type: START_LOADING
    }
}

export const hasError = (error: AxiosError) => {
    return {
        type: HAS_ERROR,
        payload: error
    }
}

export const addRecipients = (recipients: any[]) => {
    return {
        type: ADD_RECIPIENTS,
        payload: {
            recipients
        }
    }
}

export const getContactsSuccess = (contacts: Array<Participant>) => {
    return {
        type: GET_CONTACTS_SUCCESS,
        payload: {
            contacts
        }
    }
}


/**
 * 
 */

export function getContacts() {
    return async () => {
        dispatch(startLoading());
        await chatApiService.getContacts()
            .then((response: AxiosResponse) => {
                dispatch(getContactsSuccess(response.data.contacts));
            })
            .catch((error: AxiosError) => dispatch(hasError(error)));
    };
}

// ----------------------------------------------------------------------

export function getConversations() {
    return async () => {
        dispatch(startLoading());
        await chatApiService.getConversations()
            .then((response: AxiosResponse) => {
                dispatch(getConversationsSuccess(response.data.conversations));
            })
            .catch((error: AxiosError) => dispatch(hasError(error)));
    };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey: string) {
    return async () => {
        dispatch(startLoading());
        await chatApiService.getConversation(conversationKey)
            .then((response: AxiosResponse) => {
                dispatch(getConversationSuccess(response.data.conversation));
            })
            .catch((error: AxiosError) => dispatch(hasError(error)));
    };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId: string) {
    return async () => {
        dispatch(startLoading());
        await chatApiService.markConversationAsRead(conversationId)
            .then(() => {
                dispatch(markConversationAsReadSuccess(conversationId));
            })
            .catch((error: AxiosError) => dispatch(hasError(error)));
    };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey: string) {
    return async () => {
        dispatch(startLoading());
        await chatApiService.getParticipants(conversationKey)
            .then((response) => {
                dispatch(getParticipantsSuccess(response.data.participants));
            })
            .catch((error: AxiosError) => {
                dispatch(hasError(error));
            })
    };
}





