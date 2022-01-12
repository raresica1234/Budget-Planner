import { makeAutoObservable, runInAction} from "mobx";
import { Item } from "../../../accessors/types";
import { getListDetails } from "../../../accessors/list-accessor";
import { createContext } from "react";

export class ListDetailsViewStore {
    public listName: string = "";
    public items: Item[] = [];
    public sum: number = 0;
    public isLoading: boolean = true;
    public isVisitor: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchListDetails = async (listId: string) => {
        this.isLoading = true;
        
        const { name, items, sum, isVisitor } = await getListDetails(listId);

        runInAction(() => {
            this.listName = name;
            this.items = items;
            this.sum = sum;
            this.isVisitor = isVisitor;
            this.isLoading = false;
        });
        
    }

    public reset = () => {
        this.listName = "";
        this.items = [];
        this.sum = 0;
        this.isVisitor = false;
    }

    public addItem = (item: Item) => {
        this.sum += item.price;

        this.items.push(this.mapItemDates(item));
    }

    public updateItem = (item: Item) => {
        let itemToUpdateIndex = this.items.findIndex(element => element.id === item.id);

        this.sum -= this.items[itemToUpdateIndex].price;
        this.sum += item.price;

        this.items[itemToUpdateIndex] = this.mapItemDates(item);
    }

    private mapItemDates = (item: Item) => {
        item.createdAt = new Date(item.createdAt);
        item.updatedAt = new Date(item.updatedAt);

        return item;
    }
}

export const listDetailsViewStore = new ListDetailsViewStore();
export const ListDetailsViewContext = createContext(listDetailsViewStore);