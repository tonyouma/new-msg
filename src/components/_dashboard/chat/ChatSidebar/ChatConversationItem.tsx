import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// @types
//
import { makeStyles } from '@material-ui/styles';
import clsx from "clsx";
import { formatDistanceToNowStrict } from 'date-fns';
import { last } from 'lodash';
import { Conversation } from '../../../../models/chat';
import BadgeStatus from '../../../BadgeStatus';


// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;



const AvatarWrapperStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15px",
    height: 75,
    // background: colors.white,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.07)",
    border: '1px solid #F2F2F2',
    borderRadius: 5,
    // color: colors.text,
    // transition: theme.transitions.create("all"),
    margin: "15px 0",
    fontSize: 13
  },
  listItemSelected: {
    // backgroundColor: colors.link,
    // color: colors.white,
  },
  recentActivity: {
    fontSize: 12,
    lineHeight: 22,
    whiteSpace: "nowrap",
    marginBottom: 1.25
  },
  container: {
    marginLeft: 2,
    height: 44,
    display: "flex",
    alignItems: "flex",
    flexDirection: "column",
    // textAlign: "right"
  }
}));

// ----------------------------------------------------------------------

const getDetails = (conversation: Conversation, currentUserId: string) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = otherParticipants.map((participant) => participant.name).join(', ');

  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

type ChatConversationItemProps = {
  isSelected: boolean;
  conversation: Conversation;
  isOpenSidebar: boolean;
  onSelectConversation: VoidFunction;
};

export default function ChatConversationItem({
  isSelected,
  conversation,
  onSelectConversation,
  isOpenSidebar
}: ChatConversationItemProps) {
  const details = getDetails(conversation, '8864c717-587d-472a-929a-8e5f298024da-0');

  const displayLastActivity = last(conversation.messages)?.createdAt || '';
  const isGroup = details.otherParticipants.length > 1;
  const isUnread = conversation.unreadCount > 0;
  const isOnlineGroup =
    isGroup && details.otherParticipants.map((item) => item.status).includes('online');

      const classes = useStyles();

  return (
    <ListItem
    button
      disableGutters
      onClick={onSelectConversation}
      className={clsx(classes.root, {
          [classes.listItemSelected]: isSelected
        })}
    >
      <ListItemAvatar>
        <Box
          style={{
            ...(isGroup && {
              position: 'relative',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              '& .avatarWrapper': {
                position: 'absolute',
                width: AVATAR_SIZE_GROUP,
                height: AVATAR_SIZE_GROUP,
                '&:nth-child(1)': {
                  left: 0,
                  zIndex: 9,
                  bottom: 2,
                  '& .MuiAvatar-root': {
                  }
                },
                '&:nth-child(2)': { top: 2, right: 0 }
              }
            })
          }}
        >
          {details.otherParticipants.slice(0, 2).map((participant) => (
            <AvatarWrapperStyle className="avatarWrapper" key={participant.id}>
              <Avatar alt={participant.name} src={participant.avatar} />
              {!isGroup && participant?.status && (
                <BadgeStatus
                  status={participant.status}
                  style={{ right: 2, bottom: 2, position: 'absolute' }}
                />
              )}
            </AvatarWrapperStyle>
          ))}
          {isOnlineGroup && (
            <BadgeStatus status="online" style={{ right: 2, bottom: 2, position: 'absolute' }} />
          )}
        </Box>
      </ListItemAvatar>

      {isOpenSidebar && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2'
            }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'textPrimary' : 'textSecondary'
            }}
          />

          <Box
            style={{
              marginLeft: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column'
            }}
          >
            <Box
              style={{
                marginBottom: 1.25,
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                color: 'text.disabled'
              }}
            >
              {formatDistanceToNowStrict(new Date(displayLastActivity), {
                addSuffix: false
              })}
            </Box>
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}
    </ListItem>
  );
}
