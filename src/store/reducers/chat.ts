import {
  ADD_RECIPIENTS,
  GET_CONTACTS_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION_SUCCESS,
  GET_PARTICIPANTS,
  HAS_ERROR,
  IChatState,
  MARK_CONVERSATION_AS_READ,
  RESET_ACTIVE_CONVERSATION,
  START_LOADING,
} from "../types/chat";

// function objFromArray(array: any[], key = "id") {
//   return array.reduce((accumulator, current) => {
//     accumulator[current[key]] = current;
//     return accumulator;
//   }, {});
// }

// function mapIds(array: any[], initialValue = [], key = "id") {
//   const allIds = array.map((item) => item[key]);
//   return [...initialValue, allIds];
// }

const defaultState: IChatState = {
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
    // case RESET_ACTIVE_CONVERSATION: {

    case RESET_ACTIVE_CONVERSATION: {
      return {
        ...state,
        activeConversationId: null,
      };
    }
    case GET_CONTACTS_SUCCESS:
      // const { byId, allIds } = objFromArray(action.payload.contacts, "id");
      return {
        ...state,
        // isLoading: false,
        // error: false,
        contacts: {
          ...state,
          byId: action.payload.byId,
          allIds: action.payload.allIds,
        },
      };
    //  normalize state byIds and allIds
    case GET_CONVERSATIONS_SUCCESS: {
      // const { byId, allIds } = objFromArray(action.payload.conversations, "id");
      // return {
      //   ...state,
      //   isLoading: false,
      //   error: false,
      //   conversations: { byId, allIds },
      // };

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
    // case ON_SEND_MESSAGE:
    //     const conversation = action.payload;
    //     const {
    //         conversationId,
    //         messageId,
    //         message,
    //         contentType,
    //         attachments,
    //         createdAt,
    //         senderId
    //     } = conversation;

    //     const newMessage = {
    //         id: messageId,
    //         body: message,
    //         contentType,
    //         attachments,
    //         createdAt,
    //         senderId
    //     };

    //     state.conversations.byId[conversationId].messages.push(newMessage);
    //     return state

    default:
      return state;
  }
};

export default chat;
