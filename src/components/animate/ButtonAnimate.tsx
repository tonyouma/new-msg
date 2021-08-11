import { motion } from 'framer-motion';
// material
import { Box, BoxProps } from '@material-ui/core';
//
import { varSmallClick, varMediumClick } from './variants';

// ----------------------------------------------------------------------

interface ButtonAnimateProps extends BoxProps {
  mediumClick?: boolean;
}

export default function ButtonAnimate({
  mediumClick = false,
  children,
  sx,
  ...other
}: ButtonAnimateProps) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      {...other}
    >
      {children}
    </Box>
  );
}
