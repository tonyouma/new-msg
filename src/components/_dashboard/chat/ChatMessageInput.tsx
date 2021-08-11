import faker from 'faker';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
import { Send as SendIcon, Paperclip as AttachIcon, Mic, FilePlus as FileAdd } from "react-feather";
import { ButtonComponent } from "../../../components";
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Input, Divider, IconButton, InputAdornment } from '@material-ui/core';
// @types
import { SendMessage } from '../../../types/chat';
//
import EmojiPicker from '../../EmojiPicker';
import { makeStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2)
}));

const useStyles = makeStyles(() => ({
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
    padding: "15px",
    alignItems: "start",
    margin: "20px 0"
  }
}));

// ----------------------------------------------------------------------

type ChatMessageInputProps = {
  disabled: boolean;
  conversationId: string;
  onSend: (data: SendMessage) => void;
};

export default function ChatMessageInput({
  disabled,
  conversationId,
  onSend
}: ChatMessageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
    const classes = useStyles();


  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend) {
      onSend({
        conversationId,
        messageId: faker.datatype.uuid(),
        message,
        contentType: 'text',
        attachments: [],
        createdAt: new Date(),
        senderId: '8864c717-587d-472a-929a-8e5f298024da-0'
      });
    }
    return setMessage('');
  };

  return (
    <RootStyle>
        <Box
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        className={classes.input}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        startAdornment={
          // <InputAdornment position="start">
            <EmojiPicker disabled={disabled} value={message} setValue={setMessage} />
          // </InputAdornment>
        }
        endAdornment={
          <Box style={{display: 'flex'}}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <FileAdd />
            </IconButton>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <AttachIcon />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              <Mic />
            </IconButton>
          </Box>
        }
        style={{ height: '100%' }}
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

      {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} /> */}
      </Box>
    </RootStyle>
  );
}
