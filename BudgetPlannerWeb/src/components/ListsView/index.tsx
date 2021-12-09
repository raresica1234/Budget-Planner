import { List as ListModel } from "../../accessors/types";
import { Paper, List } from "@mui/material";
import ListItemLink from "../ListItemLink";
import AddListButton from "../AddListButton";
import styles from "./lists.module.scss";

interface ListListProps {
    lists: ListModel[];
}

const ListsView = ({ lists }: ListListProps) => (
    <Paper elevation={0}>
        <List>
            {lists.map((list: ListModel) => (
                <ListItemLink
                    key={list.id}
                    redirectUrl={`/lists/${list.id}`}
                    text={list.name}
                />
            ))}
        </List>
        <AddListButton className={styles.addButton} />
    </Paper>
);

export default ListsView;
