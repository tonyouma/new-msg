import {
  ClickAwayListener,
  FormControl,
  InputAdornment,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Search as SearchIcon } from "react-feather";
import { StyledSearchInput } from "../styles";

type ISearchProps = {
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

const ChatContactSearch: React.FC<ISearchProps> = (props) => {
  const { query, onChange, onFocus, onClickAway } = props;

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <FormControl fullWidth size="small">
        <StyledSearchInput
          value={query}
          onFocus={onFocus}
          onChange={onChange}
          placeholder="Search contacts..."
          startAdornment={
            <AdornmentComponent icon={<SearchIcon size="20" />} />
          }
        />
      </FormControl>
    </ClickAwayListener>
  );
};

export default ChatContactSearch;
