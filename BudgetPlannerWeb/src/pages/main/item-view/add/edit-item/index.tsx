import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import { ItemEdit } from "../../../../../accessors/types";
import { observer } from "mobx-react";
import { EditItemContext } from "./edit-item-store";

interface Props {
  item?: null| ItemEdit;
  listId: string;
  onClose: () => void;
}

const EditItemDialog = ({ item, listId, onClose }: Props) => {
  const {
    itemEdit,
    isAdd,
    setItemEdit,
    setName,
    setPrice,
    setListId,
    sendItem,
    reset
  } = useContext(EditItemContext);

  useEffect(() => {
    setItemEdit(item);
    return reset;
  }, [item, setItemEdit, reset]);

  const dialogTitle = isAdd ? "Add a new item" : `Edit ${itemEdit?.name} item`;

  const handleSubmit = async () => {
    setListId(listId);
    if (await sendItem()) onClose();
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
          onChange={e => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="price"
          label="Price"
          type="text"
          fullWidth
          variant="standard"
          onChange={e => setPrice(e.target.value)}
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