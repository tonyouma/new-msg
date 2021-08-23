import { Box, IconButton } from '@material-ui/core'
import faker from 'faker'
import { useRef, useState } from 'react'
import { Camera as CameraIcon, Mic, Paperclip as AttachIcon, Send as SendIcon } from "react-feather"
import { ButtonComponent } from "../../.."
import { SendMessage } from '../../../../models/chat'
import EmojiPicker from '../../../EmojiPicker/EmojiPicker'
import { InputWrapper, StyledInput } from '../styles'



type IMessageInputProps = {
  disabled: boolean;
  conversationId: string;
  onSend: (data: SendMessage) => void;
};

const ChatMessageInput: React.FC<IMessageInputProps> = (props) => {
  const { disabled, conversationId, onSend } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')


  const handleAttach = () => {
    fileInputRef.current?.click()
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSend()
    }
  }

  const handleSend = () => {
    if (!message) {
      return ''
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
      })
    }
    return setMessage('')
  }

  return (
    <InputWrapper>
      <StyledInput
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        startAdornment={
          <EmojiPicker disabled={disabled} value={message} setValue={setMessage} />
        }
        endAdornment={
          <Box style={{ display: 'flex' }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <CameraIcon size="22" />
            </IconButton>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <AttachIcon size="21" />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              <Mic size="21" />
            </IconButton>
          </Box>
        }
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

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </InputWrapper>
  )
}

export default ChatMessageInput

