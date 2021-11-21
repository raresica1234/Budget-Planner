import React, { PropsWithChildren, useContext } from "react";
import { Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";

type ErrorDialogProps = PropsWithChildren<{
    isOpen: boolean;
    message: string;
    onCloseFunction: () => void;
}>

export const ErrorDialog = ({ children, isOpen, message, onCloseFunction, ...other }: ErrorDialogProps) => (
    <Dialog
        open={isOpen}
        onClose={onCloseFunction}
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
            <Button onClick={onCloseFunction}>OK</Button>
        </DialogActions>
    </Dialog>
);