import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class AddItemButtonStore {
    public item?: null = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public openDialog = () => this.item = null;

    public closeDialog = () => this.item = undefined;
}

export const addItemButtonStore = new AddItemButtonStore();
export const AddItemButtonContext = createContext(addItemButtonStore);