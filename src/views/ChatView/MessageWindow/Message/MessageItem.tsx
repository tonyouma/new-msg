import { Avatar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import styled from "styled-components";
import { Conversation, Message } from "../../../../types/chat";
import { formatDistanceToNowStrict } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", marginBottom: 3 },
  container: { display: "flex" },

  content: {
    maxWidth: 544,
    marginTop: 0.5
  },
  info: {
    // fontWeight: fontWeight.mediumTwo,
    fontSize: 16,
    display: "flex"
  }
}));

const BodyText = styled(Typography)`
  font-size: 16px;
`;

type ChatMessageItemProps = {
  message: Message;
  conversation: Conversation;
  onOpenLightbox: (value: string) => void;
};

const MessageItem: React.FC<ChatMessageItemProps> = (props) => {
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
  const firstName = senderDetails.name && senderDetails.name.split(" ")[0];

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {senderDetails.type !== "me" && (
          <Avatar style={{ height: 40, width: 40 }} />
        )}
        <Box style={{ paddingLeft: 15 }}>
          <Typography
            className={classes.info}
            noWrap
            variant="caption"
            style={{ ...(isMe && { justifyContent: "flex-end" }) }}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true
            })}
          </Typography>
          <Box className={classes.content}>
            {isImage ? (
              <img
                alt="attachment"
                src={message.body}
                onClick={() => onOpenLightbox(message.body)}
              />
            ) : (
              <BodyText>{message.body}</BodyText>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageItem;
