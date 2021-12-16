import { action, makeObservable } from "mobx";
import { createContext } from "react";
import { getCreatedLists } from "../../../../accessors/list-accessor";
import { List } from "../../../../accessors/types";
import ListsViewStore from "./components/lists-view-store";

export class CreatedListsViewStore extends ListsViewStore {
    protected fetchListsEndpoint = getCreatedLists;

    constructor() {
        super();
        makeObservable(this, {
            addList: action
        });
    }

    public addList = (list: List) => this.lists.push(list); 
}

export const createdListsViewStore = new CreatedListsViewStore();
export const CreatedListsViewContext = createContext(createdListsViewStore);
