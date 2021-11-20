import { List as ListModel } from "../../accessors/types";
import { Paper, List, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ListItemLink from "../ListItemLink";

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
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    </Paper>
);

export default ListsView;
