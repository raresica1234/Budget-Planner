import React from "react";
import { List as ListModel } from "../../accessors/types";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

const ListItemLink = (props: ListItemLinkProps) => {
    const { icon, primary, to } = props;

    return (
        <li>
            <ListItem button component={Link} to={to}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

interface ListListProps {
    lists: ListModel[];
}

const ListList = (props: ListListProps) => {
    const { lists } = props;
    const listItems = lists.map((list: ListModel) => (
        <ListItemLink to={`/lists/${list.id}`} primary={list.name} />
    ));

    return (
        <Paper elevation={0}>
            <List>{listItems}</List>
        </Paper>
    );
};

export default ListList;
