import { Paper, List, LinearProgress } from "@mui/material";
import ListsViewStore from "./lists-view-store";
import { Context, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import ListItemLink from "./list-item-link";

interface ListListProps<T extends ListsViewStore> {
    listsViewContext: Context<T>;
    showEdit?: boolean;
}

const ListsView = <T extends ListsViewStore>({ listsViewContext, showEdit }: ListListProps<T>) => {
    const { isLoading, lists, fetchLists } = useContext(listsViewContext);

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    return (
        <Paper elevation={0}>
            {isLoading && (
                <LinearProgress />
            )}
            <List>
                {lists.map(list => (
                    <ListItemLink
                        key={list.id}
                        listItem={list}
                        showEdit={showEdit}
                    />
                ))}
            </List>
        </Paper>
    );
}

export default observer(ListsView);
