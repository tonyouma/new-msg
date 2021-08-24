import { Avatar, Box } from "@material-ui/core";
import { useState } from "react";
import BadgeStatus from "../../../shared/Components/BadgeStatus";

const ChatAccount: React.FC<{}> = () => {
  const [status] = useState<
    "online" | "away" | "busy" | "unread" | "offline" | "invisible"
  >("online");

  return (
    <>
      <Box style={{ position: "relative" }}>
        <Avatar
          src=""
          alt=""
          style={{ cursor: "pointer", width: 48, height: 48 }}
        />
        <BadgeStatus
          status={status}
          style={{ position: "absolute", bottom: 2, right: 2 }}
        />
      </Box>
    </>
  );
};

export default ChatAccount;
