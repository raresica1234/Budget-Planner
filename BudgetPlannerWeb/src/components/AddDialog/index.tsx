import React, { useContext } from "react";
import { AddDialogContext } from "./add-dialog-store";
import { Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react";
import { SuccessDialog } from "../SuccessDialog";
import { ErrorDialog } from "../ErrorDialog";

const AddDialog  = () => {
    const {
        isOpen,
        serverError,
        addedSuccessfully,
        addListCalled,
        setIsOpen,
        setInput,
        flushOperationResults,
        submitList
    } = useContext(AddDialogContext);

    return (
        <div>
            <Fab color="primary" aria-label="add" onClick={_ => setIsOpen(true)}>
                <AddIcon />
            </Fab>

            <Dialog open={isOpen} onClose={_ => setIsOpen(false)}>
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
                        onChange={e => setInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={_ => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={_ => submitList()}>Submit</Button>
                </DialogActions>
            </Dialog>

            <ErrorDialog
            isOpen={addListCalled && !addedSuccessfully && serverError.length > 0}
            message={serverError}
            onCloseFunction={flushOperationResults}
            />

            <SuccessDialog 
                isOpen={addListCalled && addedSuccessfully} 
                onCloseFunction={flushOperationResults}
            />
        </div>
    )
}

export default observer(AddDialog);