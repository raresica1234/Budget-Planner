import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import { ItemEdit } from "../../../../accessors/types";
import { observer } from "mobx-react";
import { EditItemDialogContext } from "./edit-item-dialog-store";

interface Props {
    listId: string;
    item?: null| ItemEdit;
    onClose: () => void;
}

const EditItemDialog = ({listId, item, onClose }: Props) => {
    const {
        isAdd,
        itemEdit,
        setItemEdit,
        setName,
        setPrice,
        sendItem,
        reset
    } = useContext(EditItemDialogContext);

    useEffect(() => {
        setItemEdit(item);

        return reset;
    }, [item, setItemEdit, reset]);

    const dialogTitle = isAdd ? "Add a new item" : `Edit ${item?.name} item`;

    const handleSubmit = async () => {
        if (await sendItem(listId)) onClose();
    }

    return (
        <Dialog open={item !== undefined} onClose={onClose}>
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
                value={itemEdit?.name}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                variant="standard"
                value={itemEdit?.price}
                onChange={e => setPrice(parseInt(e.target.value))}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        </Dialog>
    );
}

export default observer(EditItemDialog);