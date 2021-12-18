import ListsViewStore from "./components/lists-view-store";
import { getSharedLists } from "../../../../accessors/list-accessor";
import { createContext } from "react";

export class SharedListsViewStore extends ListsViewStore {
    protected fetchListsEndpoint = getSharedLists;
}

export const sharedListsViewStore = new SharedListsViewStore();
export const SharedListsViewContext = createContext(sharedListsViewStore);