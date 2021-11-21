import React, { PropsWithChildren, useContext } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type SuccessDialogProps = PropsWithChildren<{
    isOpen: boolean;
    onClose: () => void;
}>

const SuccessDialog = ({ isOpen, onClose }: SuccessDialogProps) => (
    <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    >
        <DialogTitle id="alert-dialog-title">
            Success!
        </DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>OK</Button>
        </DialogActions>
    </Dialog>

);

export default SuccessDialog;