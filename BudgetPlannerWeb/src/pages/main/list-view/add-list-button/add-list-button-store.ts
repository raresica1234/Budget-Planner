import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class AddListButtonStore {
    public list?: null = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public openDialog = () => this.list = null;

    public closeDialog = () => this.list = undefined;
}

export const addListButtonStore = new AddListButtonStore();
export const AddListButtonContext = createContext(addListButtonStore);