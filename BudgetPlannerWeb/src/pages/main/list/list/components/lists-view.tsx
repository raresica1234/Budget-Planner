import { Paper, List, LinearProgress } from "@mui/material";
import ListItemLink from "./list-item-link";
import ListsViewStore from "./lists-view-store";
import { Context, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import {List as ListModel} from "../../../../../accessors/types";

interface ListListProps<T extends ListsViewStore> {
    listsViewContext: Context<T>;
    onEdit?: (list: ListModel) => void;
}

const ListsView = <T extends ListsViewStore>({ listsViewContext, onEdit }: ListListProps<T>) => {
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
                        onDoubleClickAction = { () => onEdit?(list):list}
                        redirectUrl={`/list/${list.id}`}
                        text={list.name}
                    />
                ))}
            </List>
        </Paper>
    );
}

export default observer(ListsView);
