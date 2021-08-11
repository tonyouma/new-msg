import { Avatar, Box, Input, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useRef } from "react";
import { Send as SendIcon } from "react-feather";
import { ButtonComponent } from "../../../../components";
// import { colors } from '../../../../../../theme/theme';
import { SendMessage } from "../../../../types/chat";
import faker from "faker";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 56,
    display: "flex",
    position: "relative",
    alignItems: "center"
  },
  input: {
    height: 85,
    width: 580,
    background: "#fff",
    border: "1px solid #F2F2F2",
    fontSize: 16,
    borderRadius: 5,
    fontStyle: "italic",
    padding: "15px 0 0 15px",
    alignItems: "start",
    margin: "20px 0"
  }
}));

type ChatMessageInputProps = {
  disabled: boolean;
  conversationId: string;
  onSend: (data: SendMessage) => void;
};

const MessageInput: React.FC<ChatMessageInputProps> = (props) => {
  const { disabled, conversationId, onSend } = props;
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }
    if (onSend) {
      onSend({
        conversationId,
        messageId: faker.datatype.uuid(),
        message,
        contentType: "text",
        attachments: [],
        createdAt: new Date(),
        senderId: "8864c717-587d-472a-929a-8e5f298024da-0"
      });
    }
    return setMessage("");
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <Box className={classes.root}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Avatar></Avatar>
          <Box style={{ paddingLeft: 15, fontSize: 16 }}>
            <Typography>George Carmello</Typography>
          </Box>
        </Box>
        <Input
          fullWidth
          disableUnderline
          className={classes.input}
          placeholder="Reply to John"
          value={message}
          onKeyUp={handleKeyUp}
        />
        <ButtonComponent
          variant="contained"
          color="primary"
          startIcon={<SendIcon size="17" />}
          style={{ width: 124, marginBottom: 24 }}
          onClick={handleSend}
          disabled={!message}
        >
          Send
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default MessageInput;
