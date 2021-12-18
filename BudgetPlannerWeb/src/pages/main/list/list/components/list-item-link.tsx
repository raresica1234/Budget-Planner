import { ListItem, ListItemText, ListItemButton, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {List as ListModel} from "../../../../../accessors/types";
import UpdateListButton from "../../update/update-list-button";
import EditIcon from "@mui/icons-material/EditSharp";

interface ListItemLinkProps {
    listItem: ListModel;
}

const ListItemLink = ({ listItem }: ListItemLinkProps) => {
    const navigate = useNavigate();

    return (
        <li>
            <ListItem
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/list/${listItem.id}`)}
                secondaryAction={
                    <UpdateListButton list={listItem} />
                }>
                <ListItemText primary={listItem.name} />
            </ListItem>
        </li>
    );
}

export default ListItemLink;