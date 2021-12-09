import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface ListItemLinkProps {
    text: string;
    redirectUrl: string;
}

const ListItemLink = ({ text, redirectUrl }: ListItemLinkProps) => (
    <li>
        <ListItem button component={Link} to={redirectUrl}>
            <ListItemText primary={text} />
        </ListItem>
    </li>
);

export default ListItemLink;
