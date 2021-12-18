import { ListEdit } from './../../../../accessors/types';
import { action, makeObservable } from "mobx";
import { createContext } from "react";
import { getCreatedLists } from "../../../../accessors/list-accessor";
import { List } from "../../../../accessors/types";
import ListsViewStore from "./components/lists-view-store";
import { toastService } from '../../../../infrastructure';

export class CreatedListsViewStore extends ListsViewStore {
    protected fetchListsEndpoint = getCreatedLists;

    constructor() {
        super();
        makeObservable(this, {
            addList: action
        });
    }

    public addList = (list: List) => this.lists.push(list); 
    
    public updateList = (list: List) => {
        let listToUpdateIndex = this.lists.findIndex(element => element.id === list.id);

        this.lists[listToUpdateIndex] = list;

        // this.lists = this.lists.map(el => (el.id === list.id ? Object.assign(el, list) : el))
    }

}

export const createdListsViewStore = new CreatedListsViewStore();
export const CreatedListsViewContext = createContext(createdListsViewStore);








// try {
//     const newList = await updateList(list);
    
// } catch (error) {
//     if (typeof error === "string")
//         toastService.showError(error);
//     else
//         toastService.showError("Unexpected server error!");
//     return false;
// }