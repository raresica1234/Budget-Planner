import { makeAutoObservable, runInAction} from "mobx";
import { Item } from "../../../accessors/types";
import { getListDetails } from "../../../accessors/list-accessor";
import { createContext } from "react";

export class ListDetailsViewStore {
    public listName: string = "";
    public items: Item[] = [];
    public sum: number = 0;
    public isLoading: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchListDetails = async (listId: string) => {
        this.isLoading = true;
        
        const { listName, items, sum } = await getListDetails(listId);

        runInAction(() => {
            this.listName = listName;
            this.items = items;
            this.sum = sum;
            this.isLoading = false;
        });
        
    }

    public reset = () => {
        this.listName = "";
        this.items = [];
        this.sum = 0;
    }
}

export const listDetailsViewStore = new ListDetailsViewStore();
export const ListDetailsViewContext = createContext(listDetailsViewStore);