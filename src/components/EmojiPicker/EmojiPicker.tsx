import smilingFaceFill from '@iconify/icons-eva/smiling-face-fill';
import { Icon } from '@iconify/react';
import { Box, BoxProps, ClickAwayListener, IconButton } from '@material-ui/core';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled(Box)`
position: relative;
`

const StyledPicker = styled(Box)`
  bottom: 40px;
  overflow: hidden;
  position: absolute;
  & .emoji-mart {
    border: none;
    background-color: #fff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.07);
    border: 1px solid #F2F2F2;
  };
`

interface EmoijPickerProps extends BoxProps {
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  alignRight?: boolean;
}

const EmojiPicker = ({ disabled, value, setValue, alignRight = false, ...other }: EmoijPickerProps) => {
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji: BaseEmoji) => setValue(value + emoji?.native)}
      />
    );
  }

  const triggerPicker = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const handleClickAway = () => {
    SetEmojiPicker(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledWrapper {...other}>
        <StyledPicker
          style={{
            ...(alignRight && {
              right: -2,
              left: 'auto !important',
            })
          }}
        >
          {emojiPicker}
        </StyledPicker>
        <IconButton disabled={disabled} size="small" onClick={triggerPicker}>
          <Icon icon={smilingFaceFill} width={24} height={24} />
        </IconButton>
      </StyledWrapper>
    </ClickAwayListener>
  );
}


export default EmojiPicker;
