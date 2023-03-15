import { Alert, AlertColor, Snackbar as MuiSnackbar } from "@mui/material";
import ReactDOM from "react-dom";

type Props = {
  open: boolean;
  text: string | null | undefined;
  color: AlertColor;
  handleClose: () => void;
};

const Snackbar = ({ open, handleClose, text, color }: Props) => {
  return ReactDOM.createPortal(
    <MuiSnackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </MuiSnackbar>,
    document.body
  );
};

export default Snackbar;
