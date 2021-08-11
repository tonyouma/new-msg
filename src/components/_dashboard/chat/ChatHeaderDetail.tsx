import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { Trash2 as DeleteIcon } from "react-feather";
import { Flag as FlagIcon } from "react-feather";
import { Share2 as ShareIcon } from "react-feather";
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Avatar, Typography, AvatarGroup, IconButton } from '@material-ui/core';
// utils
import { fToNow } from '../../../utils/formatTime';
// @types
import { Participant } from '../../../types/chat';
//
import BadgeStatus from '../../BadgeStatus';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3)
}));

// ----------------------------------------------------------------------

function OneAvatar({ participants }: { participants: Participant[] }) {
  const participant = [...participants][0];

  if (participant === undefined || !participant.status) {
    return null;
  }

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Box style={{ position: 'relative' }}>
        <Avatar src={participant.avatar} alt={participant.name} />
        <BadgeStatus
          status={participant.status}
          style={{ position: 'absolute', right: 2, bottom: 2 }}
        />
      </Box>
      <Box style={{ marginLeft: 2 }}>
        <Typography variant="subtitle2">{participant.name}</Typography>

        <Typography variant="body2" style={{ color: 'text.secondary' }}>
          {participant.status !== 'offline'
            ? capitalCase(participant.status)
            : fToNow(participant.lastActivity || '')}
        </Typography>
      </Box>
    </Box>
  );
}

function GroupAvatar({ participants }: { participants: Participant[] }) {
  return (
    <div>
      <AvatarGroup
        max={3}
        style={{
          marginBottom: 0.5,
        }}
      >
        {participants.map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatar} />
        ))}
      </AvatarGroup>
      <Link
        variant="body2"
        underline="none"
        component="button"
        color="text.secondary"
        onClick={() => {}}
      >
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {participants.length} persons
          <Icon icon={arrowIosForwardFill} />
        </Box>
      </Link>
    </div>
  );
}

export default function ChatHeaderDetail({ participants }: { participants: Participant[] }) {
  const isGroup = participants.length > 1;

  return (
    <RootStyle>
      {isGroup ? (
        <GroupAvatar participants={participants} />
      ) : (
        <OneAvatar participants={participants} />
      )}

      <Box style={{ flexGrow: 1 }} />
     <IconButton>
        <FlagIcon />
      </IconButton>
      <IconButton>
        <ShareIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </RootStyle>
  );
}
