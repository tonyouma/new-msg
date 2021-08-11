import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { IconButton, IconButtonProps } from '@material-ui/core';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

interface MIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

const MIconButton = forwardRef<HTMLButtonElement, MIconButtonProps>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <ButtonAnimate>
          <IconButton ref={ref} color={color} sx={sx} {...other}>
            {children}
          </IconButton>
        </ButtonAnimate>
      );
    }

    return (
      <ButtonAnimate>
        <IconButton
          ref={ref}
          
          {...other}
        >
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }
);

export default MIconButton;
