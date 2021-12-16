import ListsViewStore from "./components/lists-view-store";
import {getSharedLists} from "../../../../accessors/list-accessor";
import {action, makeObservable} from "mobx";
import {List} from "../../../../accessors/types";
import {createContext} from "react";

export class SharedListsViewStore extends ListsViewStore {
    protected fetchListsEndpoint = getSharedLists;

    constructor() {
        super();
        makeObservable(this, {
            addList: action
        });
    }

    public addList = (list: List) => this.lists.push(list);
}

export const sharedListsViewStore = new SharedListsViewStore();
export const SharedListsViewContext = createContext(sharedListsViewStore);