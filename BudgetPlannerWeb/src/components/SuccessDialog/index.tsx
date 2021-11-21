import React, { PropsWithChildren, useContext } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type SuccessDialogProps = PropsWithChildren<{
    isOpen: boolean;
    onCloseFunction: () => void;
}>

export const SuccessDialog = ({ children, isOpen, onCloseFunction, ...other }: SuccessDialogProps) => (
    <Dialog
    open={isOpen}
    onClose={onCloseFunction}
    aria-labelledby="alert-dialog-title"
    >
        <DialogTitle id="alert-dialog-title">
            Success!
        </DialogTitle>
        <DialogActions>
            <Button onClick={onCloseFunction}>OK</Button>
        </DialogActions>
    </Dialog>

);