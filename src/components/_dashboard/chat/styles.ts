import {
  Avatar,
  Box,
  Input,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

export const StyledAvatarWrapper = styled(Box)`
  position: relative;
  width: 48px;
  height: 48px;
  & .MuiAvatar-img {
    border-radius: "50%";
  }
  & .MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`;

export const TimeStamp = styled(Box)`
  margin-bottom: 1.25px;
  font-size: 12px;
  line-height: 22px;
  white-space: nowrap;
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 15px",
    height: 75,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.07)",
    border: "1px solid #F2F2F2",
    borderRadius: 5,
    margin: "15px 0",
    fontSize: 13,
  },
  listItemSelected: {
    backgroundColor: "#2F80ED",
    color: "#fff",
    border: "none",
  },
  recentActivity: {
    fontSize: 12,
    lineHeight: 22,
    whiteSpace: "nowrap",
    marginBottom: 1.25,
  },
  container: {
    marginLeft: 2,
    height: 44,
    display: "flex",
    alignItems: "flex",
    flexDirection: "column",
    // textAlign: "right"
  },
  avatarGroup: {
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
        "& .MuiAvatar-root": {},
      },
      "&:nth-child(2)": { top: 2, right: 0 },
    },
  },
  autocompleteContainer: {
    "& .MuiAutocomplete-root": {
      minWidth: 280,
      marginLeft: 16,
      "&.Mui-focused .MuiAutocomplete-inputRoot": {
        //
      },
    },
    "& .MuiAutocomplete-inputRoot": {
      // transition: theme.transitions.create("box-shadow", {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: theme.transitions.duration.shorter,
      // }),
      "& fieldset": {
        borderWidth: `1px !important`,
        // borderColor: `${theme.palette.grey[500_32]} !important`
      },
    },
  },
}));

export const StyledSearchInput = styled(OutlinedInput)`
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  padding: 3px 15px;
  border: none;
`;

export const StyledActivityWrapper = styled(Box)`
  margin-left: 2px;
  height: 44px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const StyledContainer = styled(Box)`
  flex-shrink: 0;
  min-height: 92px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

export const HeaderAvatar = styled(Avatar)`
  height: 60px;
  width: 60px;
`;

export const ChatWindowWrapper = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  margin-left: 30px;
`;

export const InputWrapper = styled(Box)`
  min-height: 56px;
  display: flex;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 16px 0 45px 30px;
`;

export const StyledInput = styled(Input)`
  height: 85px;
  width: 580px;
  background: #fff;
  border: 1px solid #f2f2f2;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  align-items: center;
  margin: 20px 0;
  & :placeholder-shown {
    font-style: italic;
  }
`;

export const ChatItemWrapper = styled(Box)`
  display: flex;
  margin-bottom: 20px;
`;

export const MessageContentStyle = styled(Box)`
  max-width: 320px;
  border-radius: 5px;
  margin-left: 55px;
  background-color: #fafafa;
  padding: 10px;
  padding-left: 20px;
  border-radius: 5px;

  & me {
  }
`;

export const InfoText = styled(Typography)`
  display: flex;
`;

export const MessageImgStyle = styled("img")`
  height: 200px;
  min-width: 296px;
  width: 100%;
  cursor: pointer;
  object-fit: cover;
  border-radius: 5px;
`;

export const StyledChatAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

export const StyledTimeStamp = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  color: #637381;
`;

export const SidebarContainer = styled(Box)`
  width: 360px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

export const ComposeWrapper = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px 24px;
`;
