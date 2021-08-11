import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";
import { Conversation } from "../../../../types/chat";
import { last } from "lodash";
// import { colors } from '../../../../../../theme/theme';
import BadgeStatus from "../../../../components/BadgeStatus";

import styled from "styled-components";

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const AvatarWrapper = styled(Box)`
position: relative;
width: 48px;
height: 48px;

&.MuiAvatar-img{
  border-radius: 50%;
}
&.MuiAvatar-root{
  width: 100%;
  height: 100%;
}
`

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15px",
    height: 85,
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



const getDetails = (conversation: Conversation, currentUserId: string) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = otherParticipants
    .map((participant) => participant.name)
    .join(", ");

  let displayText = "";
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? "You: " : "";
    const message =
      lastMessage.contentType === "image" ? "Sent a photo" : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

type ChatConversationItemProps = {
  isSelected: boolean;
  conversation: Conversation;
  isOpenSidebar: boolean;
  onSelectConversation: () => void;
};

const ConversationItem: React.FC<ChatConversationItemProps> = (props) => {
  const {
    isSelected,
    conversation,
    isOpenSidebar,
    onSelectConversation
  } = props;
  const classes = useStyles();
  const details = getDetails(
    conversation,
    "8864c717-587d-472a-929a-8e5f298024da-0"
  );

  const displayLastActivity = last(conversation.messages)?.createdAt || "";
  const isGroup = details.otherParticipants.length > 1;
  const isUnread = conversation.unreadCount > 0;
  const isOnlineGroup =
    isGroup &&
    details.otherParticipants.map((item) => item.status).includes("online");

  return (
    <>
      <ListItem
        disableGutters
        onClick={onSelectConversation}
        className={clsx(classes.root, {
          [classes.listItemSelected]: isSelected
        })}
         style={{
        ...(isSelected && { backgroundColor: 'action.selected' })
      }}
      >
        <ListItemAvatar>
          <Box
            style={{
              ...(isGroup && {
                position: "relative",
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                "& .avatarWrapper": {
                  position: "absolute",
                  width: AVATAR_SIZE_GROUP,
                  height: AVATAR_SIZE_GROUP,
                  "&:nth-child(1)": {
                    left: 0,
                    zIndex: 9,
                    bottom: 2,
                    "& .MuiAvatar-root": {
                      border: "solid 2px red"
                    }
                  },
                  "&:nth-child(2)": { top: 2, right: 0 }
                }
              })
            }}
          >
            {details.otherParticipants.slice(0, 2).map((participant) => (
              <AvatarWrapper key={participant.id}>
                <Avatar alt={participant.name} src={participant.avatar} />
                {!isGroup && participant?.status && (
                  <BadgeStatus
                    status={participant.status}
                    style={{ right: 2, bottom: 2, position: "absolute" }}
                  />
                )}
              </AvatarWrapper>
            ))}
            {isOnlineGroup && (
              <BadgeStatus
                status="online"
                style={{ right: 2, bottom: 2, position: "absolute" }}
              />
            )}
          </Box>
        </ListItemAvatar>
        {isOpenSidebar && (
          <>
            <ListItemText
              primary={details.displayNames}
              primaryTypographyProps={{
                noWrap: true,
                variant: "subtitle2"
              }}
              secondary={details.displayText}
              secondaryTypographyProps={{
                noWrap: true,
                variant: isUnread ? "subtitle2" : "body2",
                color: isUnread ? "textPrimary" : "textSecondary"
              }}
            />
            <Box style={{
              marginLeft: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column'
            }}>
              <Box  style={{
                marginBottom: 1.25,
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                color: 'text.disabled'
              }}>
                {formatDistanceToNowStrict(new Date(displayLastActivity), {
                  addSuffix: true
                })}
              </Box>
              {isUnread && <BadgeStatus status="unread" size="small" />}
            </Box>
          </>
        )}
      </ListItem>
    </>
  );
};

export default ConversationItem;
