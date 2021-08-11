import { Search as SearchIcon } from "react-feather";
// material
import Icon from "@material-ui/core/Icon";
import {
  Box,
  FormControl,
  InputAdornment,
  ClickAwayListener,
  Input,
  OutlinedInput
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import styled from "styled-components";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  search: {
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 16,
    padding: "10px 15px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.07)",
    border: "none"
  }
}));

const StyledInput = styled(OutlinedInput)`
background-color: #fff;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px 15px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.07);
    border: none
`

// ----------------------------------------------------------------------
type ChatContactSearchProps = {
  query: string;
  onChange: React.ChangeEventHandler;
  onFocus: VoidFunction;
  onClickAway: VoidFunction;
};

const AdornmentComponent = (props: any) => (
  <InputAdornment position="start">
    <Icon color="disabled">{props.icon}</Icon>
  </InputAdornment>
);

export default function ChatContactSearch({
  query,
  onChange,
  onFocus,
  onClickAway,
  ...other
}: ChatContactSearchProps) {

    const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={onClickAway}>
        <FormControl fullWidth size="small">
          <StyledInput
            value={query}
            onFocus={onFocus}
            onChange={onChange}
            placeholder="Search contacts..."
            className={classes.search}
                    startAdornment={<AdornmentComponent icon={<SearchIcon />} />}

          />
        </FormControl>
    </ClickAwayListener>
  );
}
