import React, { PropsWithChildren } from 'react';

import Link, { LinkProps } from '@material-ui/core/Link';
import styled from 'styled-components';


const LinkStyled = styled(Link)`
  color: #2F80ED;
  &: hover {
    color: #2F80ED;
  }
`;

const LinkComponent: React.FC<PropsWithChildren<LinkProps>> = (props) => {
  const { children } = props;
  return <LinkStyled>{children}</LinkStyled>;
};

export default LinkComponent;