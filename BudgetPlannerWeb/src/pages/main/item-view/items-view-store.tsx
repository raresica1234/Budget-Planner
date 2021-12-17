import { makeAutoObservable, observable, runInAction, action } from "mobx";
import { Item, ListDetails } from "../../../accessors/types";
import { getListDetails } from "../../../accessors/item-accessor";
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
        
        const response: ListDetails = await this.fetchListDetailsEndpoint(listId);

        runInAction(() => {
            this.items = response.items;
            this.sum = response.sum;
            this.isLoading = false;
        });
    }

    public addItem = (item: Item) => this.items.push(item);

    public addToSum = (value: number) => this.sum += value;
}

export const itemsViewStore = new ItemsViewStore();
export const ItemsViewContext = createContext(itemsViewStore);