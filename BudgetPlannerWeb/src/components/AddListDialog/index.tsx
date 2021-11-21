import React, { PropsWithChildren } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";

type AddListDialogProps = PropsWithChildren<{
    isOpen: boolean;
    changeListNameFunction: (value: string) => void;
    onSubmitFunction: () => void;
    changeIsOpenFunction: (value: boolean) => void;
}>

export const AddListDialog = ({ 
    children, 
    isOpen, 
    changeListNameFunction, 
    onSubmitFunction, 
    changeIsOpenFunction, ...other }: AddListDialogProps) => (

    <Dialog open={isOpen} onClose={_ => changeIsOpenFunction(false)}>
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
            onChange={e => changeListNameFunction(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={_ => changeIsOpenFunction(false)}>Cancel</Button>
        <Button onClick={_ => onSubmitFunction()}>Submit</Button>
    </DialogActions>
    </Dialog>

);