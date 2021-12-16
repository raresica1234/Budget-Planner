import { makeAutoObservable, observable, runInAction, action } from "mobx";
import { Item } from "../../accessors/types";
import { getListDetails } from "../../accessors/item-accessor";
import { createContext } from "react";

export class ItemsViewStore {
    protected fetchListDetailsEndpoint = getListDetails;
    public items: Item[] = [];
    public sum: number = 0;
    public isLoading: boolean = true;

    constructor() {
        makeAutoObservable(this, {
            items: observable,
            sum: observable,
            isLoading: observable,
            fetchListDetails: action
        });
    }

    public fetchListDetails = async (listId: string) => {
        this.isLoading = true;
        
        const response = await this.fetchListDetailsEndpoint(listId);
        runInAction(() => {
            const obj = JSON.parse(response);
            this.items = obj.items;
            this.sum = obj.sum;
            this.isLoading = false;
        });
    }
}

export const itemsViewStore = new ItemsViewStore();
export const ItemsViewContext = createContext(itemsViewStore);