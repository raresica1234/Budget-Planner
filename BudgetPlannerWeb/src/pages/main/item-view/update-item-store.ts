import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { ItemEdit } from "../../../accessors/types";

export class UpdateItemStore {
    public item?: ItemEdit = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public openDialog = (item: ItemEdit) => this.item = item;

    public closeDialog = () => this.item = undefined;
}

export const updateItemStore = new UpdateItemStore();
export const UpdateItemContext = createContext(updateItemStore);