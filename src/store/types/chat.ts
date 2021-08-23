import { Conversation, Participant } from "../../models/chat";


export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS'
export const GET_CONVERSATION_SUCCESS = 'GET_CONVERSATION_SUCCESS'
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS'
export const ON_SEND_MESSAGE = 'ON_SEND_MESSAGE'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const ADD_RECIPIENTS = 'ADD_RECIPIENTS'
export const RESET_ACTIVE_CONVERSATION = 'RESET_ACTIVE_CONVERSATION'
export const GET_PARTICIPANTS = 'GET_PARTICIPANTS'
export const MARK_CONVERSATION_AS_READ = 'MARK_CONVERSATION_AS_READ'
export const HAS_ERROR = 'HAS_ERROR'
export const START_LOADING = 'START_LOADING'

export interface IChat {
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