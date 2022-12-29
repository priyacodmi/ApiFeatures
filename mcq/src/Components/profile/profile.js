import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import API from "services/axios";
import { ToastContainer, toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function Profile({ status }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = () => {
    console.log("from clonfdvf")
    API.post("/users/logout")
      .then((response) => {
         console.log("response",response)
      })
      .catch((error) => {
        console.log(error.response.data.errors[0].msg, "error");
        toast.error(error.response.data.errors[0].msg);
      });

    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div>{}</div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            logout
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
