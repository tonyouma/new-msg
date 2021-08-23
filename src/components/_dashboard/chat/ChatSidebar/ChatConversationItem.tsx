import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import clsx from "clsx";
import { formatDistanceToNowStrict } from 'date-fns';
import { last } from 'lodash';
import { Conversation } from '../../../../models/chat';
import BadgeStatus from '../../../BadgeStatus';
import { StyledActivityWrapper, StyledAvatarWrapper, TimeStamp, useStyles } from '../styles';


const getDetails = (conversation: Conversation, currentUserId: string) => {
  const groupParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = groupParticipants.map((participant) => participant.name).join(', ');
  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { groupParticipants, displayNames, displayText };
};

type ChatConversationItemProps = {
  isSelected: boolean;
  conversation: Conversation;
  isOpenSidebar: boolean;
  onSelectConversation: VoidFunction;
};

const ChatConversationItem: React.FC<ChatConversationItemProps> = (props) => {
  const { isSelected, conversation, onSelectConversation, isOpenSidebar } = props
  const details = getDetails(conversation, '8864c717-587d-472a-929a-8e5f298024da-0');
  const lastActivity = last(conversation.messages)?.createdAt || '';
  const groupChat = details.groupParticipants.length > 1;
  const isUnread = conversation.unreadCount > 0;
  const totalUnreadCount = conversation.unreadCount;


  const isOnlineGroup =
    groupChat && details.groupParticipants.map((item) => item.status).includes('online');

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
          className={clsx({
            [classes.avatarGroup]: groupChat
          })}
        >
          {details.groupParticipants.slice(0, 2).map((participant) => (
            <StyledAvatarWrapper className="avatarWrapper" key={participant.id}>
              <Avatar alt={participant.name} src={participant.avatar} />
              {!groupChat && participant?.status && (
                <BadgeStatus
                  status={participant.status}
                  style={{ position: 'absolute' }}
                />
              )}
            </StyledAvatarWrapper>
          ))}
          {isOnlineGroup && (
            <BadgeStatus status="online" style={{ right: 0, bottom: 0, position: 'absolute' }} />
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

          <StyledActivityWrapper
          >
            <TimeStamp>
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false
              })}
            </TimeStamp>
            {isUnread && <Typography variant="caption" style={{ fontWeight: 700 }}>{totalUnreadCount}</Typography>}
          </StyledActivityWrapper>
        </>
      )}
    </ListItem>
  );
}

export default ChatConversationItem
