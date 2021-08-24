import { List, ListProps } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Conversation } from "../../../models/chat";
import ChatConversationItem from "./ChatConversationItem";

interface ChatConversationListProps extends ListProps {
  conversations: { byId: Record<string, Conversation>; allIds: string[] };
  isOpenSidebar: boolean;
  activeConversationId: string | null;
}

const ChatConversationList: React.FC<ChatConversationListProps> = (props) => {
  const { conversations, isOpenSidebar, activeConversationId, ...other } =
    props;
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
    navigate(`/chat/${conversationKey}`);
  };

  return (
    <List disablePadding {...other}>
      {conversations.allIds.map((conversationId, id) => (
        <ChatConversationItem
          key={id}
          isOpenSidebar={isOpenSidebar}
          conversation={conversations.byId[conversationId]}
          isSelected={activeConversationId === conversationId}
          onSelectConversation={() => handleSelectConversation(conversationId)}
        />
      ))}
    </List>
  );
};

export default ChatConversationList;
