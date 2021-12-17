import { useContext, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { observer } from "mobx-react";
import { UpdateListButtonContext } from "./update-list-button-store";
import EditListDialog from "../../add/edit-list-dialog";
import { ListEdit } from '../../../../../accessors/types';


interface UpdateListButtonProps {
    className: string;
}

const UpdateListButton = ({ className }: UpdateListButtonProps) => {
    const {
        list,
        openDialog,
        closeDialog
    } = useContext(UpdateListButtonContext);

    useEffect(() => closeDialog, [closeDialog]);

    return <>
        {/* <Fab
            color="primary"
            aria-label="add"
            onClick={openDialog(list)}
            className={className}>
            <AddIcon />
        </Fab>
         */}
        <EditListDialog
            list={list}
            onClose={closeDialog} />
    </>;
}

export default observer(UpdateListButton);