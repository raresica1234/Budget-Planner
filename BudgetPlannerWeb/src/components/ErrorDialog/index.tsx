import React, { PropsWithChildren } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";

type ErrorDialogProps = PropsWithChildren<{
    isOpen: boolean;
    message: string;
    onClose: () => void;
}>

const ErrorDialog = ({ isOpen, message, onClose }: ErrorDialogProps) => (
    <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Error
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>OK</Button>
        </DialogActions>
    </Dialog>
);

export default ErrorDialog;