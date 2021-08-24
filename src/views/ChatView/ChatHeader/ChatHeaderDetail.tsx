import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import { Icon } from "@iconify/react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import {
  Flag as FlagIcon,
  Share2 as ShareIcon,
  Trash2 as DeleteIcon,
} from "react-feather";
import { Participant } from "../../../models/chat";
import BadgeStatus from "../../../shared/Components/BadgeStatus";
import { HeaderAvatar, StyledContainer } from "../styles";

interface IProps {
  participants: Participant[];
}

function OneAvatar({ participants }: { participants: Participant[] }) {
  const participant = [...participants][0];
  if (participant === undefined || !participant.status) {
    return null;
  }

  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <Box style={{ position: "relative" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={<BadgeStatus status={participant.status} />}
        >
          <HeaderAvatar src={participant.avatar} alt={participant.name} />
        </Badge>
      </Box>
      <Box style={{ marginLeft: 15 }}>
        <Typography variant="subtitle2">{participant.name}</Typography>
        <Typography variant="body2" style={{ color: "text.secondary" }}>
          {participant.position}
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

const ChatHeaderDetail: React.FC<IProps> = (props) => {
  const { participants } = props;
  const isGroup = participants.length > 1;

  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

export default ChatHeaderDetail;
