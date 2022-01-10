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
            addList: action,
            updateList: action
        });
    }

    public addList = (list: List) => this.lists.push(list); 
    
    public updateList = (list: List) => {
        let listToUpdateIndex = this.lists.findIndex(element => element.id === list.id);

        this.lists[listToUpdateIndex] = list;
    }
}

export const createdListsViewStore = new CreatedListsViewStore();
export const CreatedListsViewContext = createContext(createdListsViewStore);