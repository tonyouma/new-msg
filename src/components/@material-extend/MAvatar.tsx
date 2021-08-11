import { forwardRef } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Avatar, AvatarProps } from '@material-ui/core';

// ----------------------------------------------------------------------

type AvatarColor = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// ----------------------------------------------------------------------

export interface MAvatarProps extends AvatarProps {
  color?: AvatarColor;
}

const MAvatar = forwardRef<HTMLDivElement, MAvatarProps>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (color === 'default') {
      return (
        <Avatar ref={ref} sx={sx} {...other}>
          {children}
        </Avatar>
      );
    }

    return (
      <Avatar
        ref={ref}
        
        {...other}
      >
        {children}
      </Avatar>
    );
  }
);

export default MAvatar;
