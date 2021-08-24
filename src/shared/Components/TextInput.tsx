import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import styled from 'styled-components';



interface ITextInputProps extends StandardTextFieldProps {
  icon?: any;
}

const StyledTextField = styled(TextField)`
  margin-bottom: 30px;
  @media screen and (max-width: 39.9375em) {
    margin-bottom: 10px;
  }
`;

const textInputPropsStyles: React.CSSProperties = {
  border: '1px solid #F2F2F2',
  fontSize: 16,
  borderRadius: 5,
  backgroundColor: '#fff',
  padding: 15,
};
const AdornmentComponent = (props: any) => (
  <InputAdornment position="start">
    <Icon color="primary">{props.icon}</Icon>
  </InputAdornment>
);

const TextInput: React.FC<ITextInputProps> = (props) => {
  const { icon, ...rest } = props;

  return (
    <StyledTextField
      {...rest}
      autoComplete="off"
      margin="normal"
      InputProps={{
        style: textInputPropsStyles,
        startAdornment: icon ? <AdornmentComponent icon={icon} /> : '',
        disableUnderline: true,
      }}
      InputLabelProps={{
        shrink: true,
        color: 'primary',
        variant: 'standard',
        style: {
          color: '#4a4a4a',
          fontWeight: 400,
          fontSize: 16,
        },
      }}
    />
  );
};

export default TextInput;
