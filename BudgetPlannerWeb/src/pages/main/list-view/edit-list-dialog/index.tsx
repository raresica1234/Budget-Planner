import { useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import { ListEdit } from "../../../../accessors/types";
import { EditListDialogContext } from "./edit-list-dialog-store";
import { observer } from "mobx-react";
import UserPicker from "./user-picker";
import styles from "./edit-list-dialog.module.scss";

interface Props {
    list?: null | ListEdit;
    onClose: () => void;
}

const EditListDialog = ({ list, onClose }: Props) => {
    const {
        isAdd,
        listEdit,
        users,
        setListEdit,
        setName,
        sendList,
        addUser,
        removeUser,
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
            <div className={styles.mainContainer}>
                <DialogTitle className={styles.title}>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                            classes: {
                                root: styles.inputLabel
                            }
                        }}
                        InputProps={{
                            classes: {
                                root: styles.input
                            }
                        }}
                        value={listEdit?.name}
                        onChange={e => setName(e.target.value)} />
                    <UserPicker
                        className={styles.userPicker}
                        label="Shared with users"
                        emailSuggestions={users.relevantEmails}
                        users={listEdit?.users}
                        onAdd={addUser}
                        onRemove={removeUser} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} className={styles.button}>Cancel</Button>
                    <Button onClick={handleSubmit} className={styles.button}>Submit</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default observer(EditListDialog);