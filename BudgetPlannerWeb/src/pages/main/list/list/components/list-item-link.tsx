import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import {List as ListModel} from "../../../../../accessors/types";

interface ListItemLinkProps {
    text: string;
    redirectUrl: string;
    onDoubleClickAction?(list: ListModel): any; 
}

const ListItemLink = ({ text, redirectUrl, onDoubleClickAction }: ListItemLinkProps) => (
    <li>
        <ListItem button component={Link} to={redirectUrl}  onDoubleClick={() => onDoubleClickActionTest()}>
            <ListItemText primary={text} />
        </ListItem>
    </li>
);

export default ListItemLink;
function onDoubleClickActionTest(): void {
    console.log("Double Clicked");
}

