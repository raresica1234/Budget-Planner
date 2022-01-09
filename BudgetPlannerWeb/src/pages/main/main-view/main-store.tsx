import { debounce } from "@mui/material";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { createdListsViewStore } from "../list-view/list/created-lists-view-store";
import { sharedListsViewStore } from "../list-view/list/shared-lists-view-store";

export class TabNumberStore {
    public tabNumber: number = 0;
    public searchKeyword: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public setTabNumber = (value: number) => {
        this.tabNumber = value;
        this.fetchLists();
    }

    public setSearchKeyword = (value: string) => {
        this.searchKeyword = value;
        this.fetchLists();
    }

    public initialize = () => this.fetchLists();

    private fetchLists = debounce(() => {
        const store = this.tabNumber ? sharedListsViewStore : createdListsViewStore;
        
        store.search(this.searchKeyword);
    }, 250);
}

export const tabNumberStore = new TabNumberStore();
export const TabNumberContext = createContext(tabNumberStore);