import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import pinFill from '@iconify/icons-eva/pin-fill';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Collapse, Divider, Typography } from '@material-ui/core';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// theme
// @types
import { Participant } from '../../../models/chat';

// ----------------------------------------------------------------------

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1.5, 0)
}));

const RowIconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginTop: 4,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 160,
  wordWrap: 'break-word',
}));

// ----------------------------------------------------------------------

type ChatRoomOneParticipantProps = {
  participants: Participant[];
  isCollapse: boolean;
  onCollapse: VoidFunction;
};

export default function ChatRoomOneParticipant({
  participants,
  isCollapse,
  onCollapse
}: ChatRoomOneParticipantProps) {
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <>
      <Box
        style={{
          paddingTop: 4,
          paddingBottom: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar alt={participant.name} src={participant.avatar} style={{ width: 96, height: 96 }} />
        <Box style={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">{participant.name}</Typography>
          <Typography variant="body2" style={{ color: 'text.secondary' }}>
            {participant.position}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        information
      </CollapseButtonStyle>

      <Collapse in={isCollapse}>
        <Box style={{ }}>
          <RowStyle>
            <RowIconStyle icon={pinFill} />
            <RowTextStyle>{participant.address}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={phoneFill} />
            <RowTextStyle>{participant.phone}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={emailFill} />
            <RowTextStyle>{participant.email}</RowTextStyle>
          </RowStyle>
        </Box>
      </Collapse>
    </>
  );
}
