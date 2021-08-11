import { List, ListProps } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import ConversationItem from "./ConversationItem";
import { Conversation } from "../../../../types/chat";

interface ChatConversationListProps extends ListProps {
  conversations: { byId: Record<string, Conversation>; allIds: string[] };
  isOpenSidebar: boolean;
  activeConversationId: string | null;
}

// const conversationId = '8864c717-587d-472a-929a-8e5f298024da-0';

const ConversationList: React.FC<ChatConversationListProps> = (props) => {
  const {
    conversations,
    isOpenSidebar,
    activeConversationId,
    ...other
  } = props;
  const navigate = useNavigate();

  const handleSelectConversation = (conversationId: string) => {
    let conversationKey = "";
    const conversation = conversations.byId[conversationId];
    if (conversation.type === "GROUP") {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) =>
          participant.id !== "8864c717-587d-472a-929a-8e5f298024da-0"
      );
      if (otherParticipant?.username) {
        conversationKey = otherParticipant?.username;
      }
    }
    navigate(`/${conversationKey}`);
      console.log(`/${conversationKey}`)

  };
  return (
    <List>
      {conversations.allIds.map((conversationId) => (
        <ConversationItem
          key={conversationId}
          isOpenSidebar={isOpenSidebar}
          conversation={conversations.byId[conversationId]}
          isSelected={activeConversationId === conversationId}
          onSelectConversation={() => handleSelectConversation(conversationId)}
        />
      ))}
    </List>
  );
};

export default ConversationList;
