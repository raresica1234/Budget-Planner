import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import { ListEdit } from "../../../../accessors/types";
import { EditListDialogContext } from "./edit-list-dialog-store";
import { observer } from "mobx-react";

interface Props {
    list?: null| ListEdit;
    onClose: () => void;
}

const EditListDialog = ({ list, onClose }: Props) => {
    const {
        isAdd,
        listEdit,
        setListEdit,
        setName,
        sendList,
        reset
    } = useContext(EditListDialogContext);

    useEffect(() => {
        setListEdit(list);

        return reset;
    }, [list, setListEdit, reset]);

    const dialogTitle = isAdd ? "Add a new list" : `Edit ${list?.name} list`;

    const handleSubmit = async () => {
        if (await sendList()) onClose();
    }

    return (
        <Dialog open={list !== undefined} onClose={onClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={listEdit?.name}
                onChange={e => setName(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        </Dialog>
    );
}

export default observer(EditListDialog);