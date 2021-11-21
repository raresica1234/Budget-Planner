import { List as ListModel } from "../../accessors/types";
import { Paper, List } from "@mui/material";
import ListItemLink from "../ListItemLink";
import AddDialog from "../AddDialog";
import styles from "./lists.module.scss";

interface ListListProps {
    lists: ListModel[];
}

const ListsView = ({ lists }: ListListProps) => (
    <Paper elevation={0}>
        <List>
            {lists.map((list: ListModel) => (
                <ListItemLink
                    redirectUrl={`/lists/${list.id}`}
                    text={list.name}
                />
            ))}
        </List>
        <div className={styles.addButton} ><AddDialog/></div>
    </Paper>
);

export default ListsView;
