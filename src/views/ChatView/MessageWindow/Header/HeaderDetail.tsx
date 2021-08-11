import {
  Box,
  Container,
  IconButton,
  Typography,
  Link,
  Avatar,
  AvatarGroup
} from "@material-ui/core";
import React from "react";
import { Trash2 as DeleteIcon } from "react-feather";
import { Flag as FlagIcon } from "react-feather";
import { Share2 as ShareIcon } from "react-feather";
import {  useStyles } from "./styles";
import { Participant } from "../../../../types/chat";
import { Icon } from "@iconify/react";
import { capitalCase } from "change-case";

import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";


function OneAvatar({ participants }: { participants: Participant[] }) {
  const participant = [...participants][0];

  if (participant === undefined || !participant.status) {
    return null;
  }

  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Box style={{ position: "relative" }}>
        <Avatar src={participant.avatar} alt={participant.name} />
        {/* <BadgeStatus
          status={participant.status}
          style={{ position: 'absolute', right: 2, bottom: 2 }}
        /> */}
      </Box>
      <Box style={{ marginLeft: 2 }}>
        <Typography variant="subtitle2">{participant.name}</Typography>

        <Typography variant="body2" style={{ color: "text.secondary" }}>
          {participant.status !== "offline"
            ? capitalCase(participant.status)
            : ""}
        </Typography>
      </Box>
    </Box>
  );
}

function GroupAvatar({ participants }: { participants: Participant[] }) {
  return (
    <div>
      <AvatarGroup
        max={3}>
        {participants.map((participant) => (
          <Avatar
            key={participant.id}
            alt={participant.name}
            src={participant.avatar}
          />
        ))}
      </AvatarGroup>
      <Link
        variant="body2"
        underline="none"
        component="button"
        color="text.secondary"
        onClick={() => {}}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          {participants.length} persons
          <Icon icon={arrowIosForwardFill} />
        </Box>
      </Link>
    </div>
  );
}

interface IProps {
  participants: Participant[];
}

const HeaderDetail: React.FC<IProps> = (props) => {
  const { participants } = props;
  const isGroup = participants.length > 1;

  const classes = useStyles();

  return (
    <Container className={classes.root} disableGutters>
      <Box style={{ display: "flex", alignItems: "center" }}>
        {isGroup ? (
          <GroupAvatar participants={participants} />
        ) : (
          <OneAvatar participants={participants} />
        )}
      </Box>
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
    </Container>
  );
};

export default HeaderDetail;
