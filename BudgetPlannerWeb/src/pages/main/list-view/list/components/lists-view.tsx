import { Paper, List, LinearProgress } from "@mui/material";
import ListsViewStore from "./lists-view-store";
import { Context, useContext } from "react";
import { observer } from "mobx-react";
import ListItemLink from "./list-item-link";
import styles from "./lists-view.module.scss";

interface ListListProps<T extends ListsViewStore> {
    listsViewContext: Context<T>;
    showEdit?: boolean;
}

const ListsView = <T extends ListsViewStore>({ listsViewContext, showEdit }: ListListProps<T>) => {
    const { isLoading, lists } = useContext(listsViewContext);

    return (
        <Paper elevation={0} className={styles.mainContainer} square>
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
