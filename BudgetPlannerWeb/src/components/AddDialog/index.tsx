import React, { useContext } from "react";
import { AddDialogContext } from "./add-dialog-store";
import { Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react";


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

            {/* //error dialog */}
            <Dialog
                open={addListCalled && !addedSuccessfully && (serverError.length > 0)}
                onClose={flushOperationResults}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Error
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {serverError}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={flushOperationResults}>OK</Button>
                </DialogActions>
            </Dialog>

            {/* //success dialog */}
            <Dialog
                open={addListCalled && addedSuccessfully}
                onClose={flushOperationResults}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    Success!
                </DialogTitle>
                <DialogActions>
                    <Button onClick={flushOperationResults}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default observer(AddDialog);