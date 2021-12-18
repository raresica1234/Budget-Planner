import { action, makeObservable, observable, runInAction } from "mobx";
import { List } from "../../../../../accessors/types";
import { toastService } from "../../../../../infrastructure";

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

        try {
            const lists = await this.fetchListsEndpoint();

            runInAction(() => this.lists = lists);
        } catch {
            toastService.showError("Failed to connect to the server!");
        } finally {
            runInAction(() => this.isLoading = false);
        }
    } 
}

export default ListsViewStore;