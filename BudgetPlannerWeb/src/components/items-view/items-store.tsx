import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { getListDetails } from "../../accessors/item-accessor";
import { Item } from "../../accessors/types";
import { toastService } from "../../infrastructure";

export class ItemsStore {
    public items?: Item[];

    constructor() {
        makeAutoObservable(this);
    }

    public getDetails = async () => {
        try {
            var result = await getListDetails();
        }
        catch (error) {
            if (typeof error === "string")
                toastService.showError(error);
            else
                toastService.showError("Unexpected server error!");
        }
    }
}

export const itemsStore = new ItemsStore();
export const ItemsContext = createContext(itemsStore);