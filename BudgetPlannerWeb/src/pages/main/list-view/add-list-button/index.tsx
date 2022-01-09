import { useContext } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react";
import { AddListButtonContext } from "./add-list-button-store";
import EditListDialog from "../edit-list-dialog";

interface AddListButtonProps {
    className: string;
}

const AddListButton = ({ className }: AddListButtonProps) => {
    const {
        list,
        openDialog,
        closeDialog
    } = useContext(AddListButtonContext);

    return <>
        <Fab
            color="primary"
            aria-label="add"
            onClick={openDialog}
            className={className}>
            <AddIcon />
        </Fab>

        <EditListDialog
            list={list}
            onClose={closeDialog} />
    </>;
}

export default observer(AddListButton);