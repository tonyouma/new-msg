import { Typography } from "@material-ui/core";
// material
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import Lightbox from "react-image-lightbox";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isRTL = "rtl";

  const backgroundIcon = (iconName: string) => ({
    backgroundSize: "24px 24px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    backgroundImage: `url("/static/icons/controls/${iconName}.svg")`,
  });

  return {
    root: {
      backdropFilter: "blur(8px)",

      // Toolbar
      "& .ril__toolbar": {
        height: "auto !important",

        backgroundColor: "transparent",
      },
      "& .ril__toolbarLeftSide": { display: "none" },
      "& .ril__toolbarRightSide": {
        height: "auto !important",
        padding: 0,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        "& li": {
          display: "flex",
          alignItems: "center",
        },
        "& li:first-child": {
          flexGrow: 1,
        },
        "& li:not(:first-child)": {
          justifyContent: "center",
        },
      },

      // Button
      "& button:focus": { outline: "none" },
      "& .ril__toolbarRightSide button": {
        width: "100%",
        height: "100%",
        "&.ril__zoomInButton": backgroundIcon("maximize-outline"),
        "&.ril__zoomOutButton": backgroundIcon("minimize-outline"),
        "&.ril__closeButton": backgroundIcon("close"),
      },
      "& .ril__navButtons": {
        "&.ril__navButtonPrev": {
          right: "auto",
          ...backgroundIcon(isRTL ? "arrow-ios-forward" : "arrow-ios-back"),
        },
        "&.ril__navButtonNext": {
          left: "auto",
          ...backgroundIcon(isRTL ? "arrow-ios-back" : "arrow-ios-forward"),
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

interface ModalLighboxProps {
  images: string[];
  photoIndex: number;
  setPhotoIndex: (index: number) => void;
  isOpen: boolean;
  onClose: VoidFunction;
}

function LightboxModal({
  images,
  photoIndex,
  setPhotoIndex,
  isOpen,
  onClose,
  ...other
}: ModalLighboxProps) {
  const classes = useStyles();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const showIndex = (
    <Typography variant="subtitle2">{`${photoIndex + 1} / ${
      images.length
    }`}</Typography>
  );

  const toolbarButtons = [showIndex];
  const customStyles = {
    overlay: {
      zIndex: 9999,
    },
  };

  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={onClose}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          toolbarButtons={toolbarButtons}
          reactModalStyle={customStyles}
          wrapperClassName={classes.root}
          {...other}
        />
      )}
    </>
  );
}

export default LightboxModal;
