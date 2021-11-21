import React, { PropsWithChildren } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";

type AddListDialogProps = PropsWithChildren<{
    isOpen: boolean;
    changeListName: (value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}>

export const AddListDialog = ({ 
    isOpen, 
    changeListName, 
    onSubmit,
    onClose 
}: AddListDialogProps) => (

    <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Add a new list</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => changeListName(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
    </DialogActions>
    </Dialog>

);