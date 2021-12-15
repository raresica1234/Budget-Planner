import { action, makeObservable, observable, runInAction } from "mobx";
import { List } from "../../../../../accessors/types";

abstract class ListsViewStore {
    protected abstract fetchListsEndpoint: () => Promise<List[]>

    public lists: List[] = []
    public isLoading: boolean = true

    constructor() {
        makeObservable(this, {
            lists: observable,
            isLoading: observable,
            fetchLists: action
        });
    }

    public fetchLists = async () => {
        this.isLoading = true;

        const lists = await this.fetchListsEndpoint();

        runInAction(() => {
            this.lists = lists;
            this.isLoading = false;
        });
    } 
}

export default ListsViewStore;