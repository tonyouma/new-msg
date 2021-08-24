import { Box, Typography } from "@material-ui/core";
import { format } from "date-fns";
import { Conversation, Message } from "../../../models/chat";
import {
  ChatItemWrapper,
  InfoText,
  MessageContentStyle,
  MessageImgStyle,
  StyledChatAvatar,
  StyledTimeStamp,
} from "../styles";

type ChatMessageItemProps = {
  message: Message;
  conversation: Conversation;
  onOpenLightbox: (value: string) => void;
};

const ChatMessageItem: React.FC<ChatMessageItemProps> = (props) => {
  const { message, conversation, onOpenLightbox } = props;
  const sender = conversation.participants.find(
    (participant) => participant.id === message.senderId
  );
  const senderDetails =
    message.senderId === "8864c717-587d-472a-929a-8e5f298024da-0"
      ? { type: "me" }
      : { avatar: sender?.avatar, name: sender?.name };

  const isMe = senderDetails.type === "me";
  const isImage = message.contentType === "image";
  const senderName = senderDetails.name;
  const timeStamp = format(new Date(message.createdAt), " h:mm");

  return (
    <ChatItemWrapper>
      <Box
        style={{
          display: "flex",
          ...(isMe && {
            marginLeft: "auto",
          }),
        }}
      >
        <Box style={{ marginLeft: 2 }}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            {senderDetails.type !== "me" && (
              <StyledChatAvatar
                alt={senderDetails.name}
                src={senderDetails.avatar}
              />
            )}
            <InfoText
              noWrap
              style={{ ...(isMe && { justifyContent: "flex-end" }) }}
            >
              {!isMe && `${senderName}`}
            </InfoText>
          </Box>
          <MessageContentStyle
            style={{
              ...(isMe && {
                color: "#333",
                marginLeft: 0,
                backgroundColor: "#bcdcff",
              }),
            }}
          >
            {isImage ? (
              <MessageImgStyle
                alt="attachment"
                src={message.body}
                onClick={() => onOpenLightbox(message.body)}
              />
            ) : (
              <Typography>{message.body}</Typography>
            )}
            <StyledTimeStamp variant="caption">{timeStamp}</StyledTimeStamp>
          </MessageContentStyle>
        </Box>
      </Box>
    </ChatItemWrapper>
  );
};

export default ChatMessageItem;
