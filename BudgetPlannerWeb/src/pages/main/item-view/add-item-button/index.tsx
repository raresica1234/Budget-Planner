import { useContext } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react";
import { AddItemButtonContext } from "./add-item-button-store";
import EditItemDialog from "../edit-item-dialog";

interface Props {
    listId: string;
    className: string;
}

const AddItemButton = ({ listId, className }: Props) => {
    const {
        item,
        openDialog,
        closeDialog
    } = useContext(AddItemButtonContext);

    return <>
        <Fab
            color="primary"
            aria-label="add"
            onClick={openDialog}
            className={className}>
            <AddIcon />
        </Fab>

        <EditItemDialog
            listId={listId}
            item={item}
            onClose={closeDialog} />
    </>;
}

export default observer(AddItemButton);