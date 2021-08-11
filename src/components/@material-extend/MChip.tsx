import { forwardRef } from 'react';
// material
import {
  alpha,
  Theme,
  useTheme,
  emphasize,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Chip, ChipProps } from '@material-ui/core';
// @types
import { ColorSchema } from '../../types/theme';

// ----------------------------------------------------------------------

const ChipStyle = styled(Chip)(
  ({
    theme,
    styleProps
  }: {
    theme: Theme;
    styleProps: {
      color: ColorSchema;
      variant: 'filled' | 'outlined';
      clickable?: boolean;
      onDelete?: (event: any) => void;
    };
  }) => {
    const { color, variant, clickable, onDelete } = styleProps;

    // Filled
    const styleFilled = (color: ColorSchema) => ({
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      '& .MuiChip-icon': { color: 'inherit' },
      '& .MuiChip-avatar': {
        color: theme.palette[color].light,
        backgroundColor: theme.palette[color].dark
      },
      '& .MuiChip-deleteIcon': {
        color: alpha(theme.palette[color].contrastText, 0.7),
        '&:hover, &:active': { color: theme.palette[color].contrastText }
      }
    });

    const styleFilledClickable = (color: ColorSchema) => ({
      '&:hover, &:focus': {
        backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.hoverOpacity)
      }
    });

    const styleFilledDeletable = (color: ColorSchema) => ({
      '&:focus': {
        backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.focusOpacity)
      }
    });

    // Outlined
    const styleOutlined = (color: ColorSchema) => ({
      color: theme.palette[color].main,
      border: `1px solid ${theme.palette[color].main}`,
      '&:focus, &.MuiChip-clickable:hover': {
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
      },
      '& .MuiChip-icon': { color: 'currentColor' },
      '& .MuiChip-avatar': {
        color: theme.palette[color].light,
        backgroundColor: theme.palette[color].dark
      },
      '& .MuiChip-deleteIcon': {
        color: alpha(theme.palette[color].main, 0.7),
        '&:hover, &:active': { color: theme.palette[color].main }
      }
    });

    return {
      ...(variant === 'filled'
        ? {
            ...styleFilled(color),
            ...(clickable && { ...styleFilledClickable(color) }),
            ...(onDelete && { ...styleFilledDeletable(color) })
          }
        : {
            ...styleOutlined(color)
          })
    };
  }
);

// ----------------------------------------------------------------------

interface MChipProps extends Omit<ChipProps, 'color'> {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

const Mchip = forwardRef<HTMLDivElement, MChipProps>(
  (
    {
      color = 'default',
      variant = 'filled',
      clickable: clickableProp,
      onDelete: onDeleteProp,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return (
        <Chip
          ref={ref}
          color={color}
          variant={variant}
          clickable={clickableProp && clickableProp}
          onDelete={onDeleteProp && onDeleteProp}
          {...other}
        />
      );
    }

    return (
      <ChipStyle
        ref={ref}
        variant={variant}
        clickable={clickableProp && clickableProp}
        onDelete={onDeleteProp && onDeleteProp}
        styleProps={{
          color,
          variant,
          clickable: clickableProp && clickableProp,
          onDelete: onDeleteProp && onDeleteProp
        }}
        theme={theme}
        {...other}
      />
    );
  }
);

export default Mchip;
