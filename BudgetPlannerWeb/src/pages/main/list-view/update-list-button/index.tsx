import { useContext, MouseEvent } from "react";
import { IconButton } from "@mui/material";
import { observer } from "mobx-react";
import { UpdateListButtonContext } from "./update-list-button-store";
import { List } from '../../../../accessors/types';
import EditIcon from "@mui/icons-material/EditSharp";


interface Props {
    list: List;
}

const UpdateListButton = ({ list: { id, name } }: Props) => {
    const { openDialog } = useContext(UpdateListButtonContext);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openDialog({
            id,
            name,
            users: []
        });
    }

    return (
        <IconButton edge="end" onClick={handleClick}>
            <EditIcon htmlColor="white"/>
        </IconButton>
    );
}

export default observer(UpdateListButton);