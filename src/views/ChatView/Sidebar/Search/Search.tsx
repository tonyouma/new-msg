import { ClickAwayListener, Input, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { Search as SearchIcon } from "react-feather";
// import { colors } from '../../../../../../theme/theme';

// export const FormControl = withStyles({
//   marginNormal: {
//     marginTop: 0,
//     marginBottom: 0
//   }
// })(MuiFormControl);

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

const AdornmentComponent = (props: any) => (
  <InputAdornment position="start">
    <Icon color="disabled">{props.icon}</Icon>
  </InputAdornment>
);

interface ISearchProps {
  onClickAway(): void;
}

const MessageSearch: React.FC<ISearchProps> = (props) => {
  const { onClickAway } = props;
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <FormControl fullWidth size="small">
        <Input
          placeholder="Search messages"
          disableUnderline
          startAdornment={<AdornmentComponent icon={<SearchIcon />} />}
          className={classes.search}
        />
      </FormControl>
    </ClickAwayListener>
  );
};

export default MessageSearch;
