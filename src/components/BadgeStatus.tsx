// material
import { BoxProps } from "@material-ui/core";
import {
  experimentalStyled as styled, Theme,
  useTheme
} from "@material-ui/core/styles";

// ----------------------------------------------------------------------

type BadgeStatusEnum =
  | "away"
  | "busy"
  | "unread"
  | "online"
  | "offline"
  | "invisible"
  | string;

type BadgeSize = "small" | "medium";

const RootStyle = styled("span")(
  ({
    theme,
    styleProps
  }: {
    theme: Theme;
    styleProps: {
      size: BadgeSize;
      status: BadgeStatusEnum;
    };
  }) => {
    const { status, size } = styleProps;

    return {
      display: "flex",
      borderRadius: "50%",
      alignItems: "center",
      justifyContent: "center",
      "&:before, &:after": {
        content: "''",
        borderRadius: 1,
        backgroundColor: theme.palette.common.white
      },

      ...(size === "small"
        ? { height: theme.spacing(1), width: theme.spacing(1) }
        : { height: theme.spacing(1.25), width: theme.spacing(1.25) }),

      ...(status === "offline" && {
        backgroundColor: "transparent"
      }),

      ...(status === "away" && {
        backgroundColor: theme.palette.warning.main,
        "&:before": {
          width: 2,
          height: 4,
          transform: "translateX(1px) translateY(-1px)"
        },
        "&:after": {
          width: 2,
          height: 4,
          transform: "translateY(1px) rotate(125deg)"
        }
      }),

      ...(status === "busy" && {
        backgroundColor: theme.palette.error.main,
        "&:before": { width: 6, height: 2 }
      }),

      ...(status === "online" && {
        backgroundColor: theme.palette.success.main
      }),

      ...(status === "invisible" && {
        backgroundColor: theme.palette.text.disabled,
        "&:before": {
          width: 6,
          height: 6,
          borderRadius: "50%"
        }
      }),

      ...(status === "unread" && {
        backgroundColor: theme.palette.info.main
      })
    };
  }
);

// ----------------------------------------------------------------------

interface IStatusProps extends BoxProps {
  size?: BadgeSize;
  status?: BadgeStatusEnum;
}
const BadgeStatus: React.FC<IStatusProps> = ({
  size = "medium",
  status = "offline",
  sx
}: IStatusProps) => {
  const theme = useTheme();

  return <RootStyle styleProps={{ status, size }} sx={sx} theme={theme} />;
}

export default BadgeStatus