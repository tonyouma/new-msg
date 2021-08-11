import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
export const useStyles = makeStyles(() => ({
  root: {
    flexShrink: 0,
    minHeight: 92,
    display: "flex",
    alignItems: "center",
    padding: "0 30px 0 30px"
  }
}));

export const StyledProfileAvatar = styled(Avatar)`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;
