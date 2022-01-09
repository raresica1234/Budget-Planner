import { ListEdit } from '../../../../accessors/types';
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class UpdateListButtonStore {
    public list?: ListEdit = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public openDialog = (list: ListEdit) => this.list = list;

    public closeDialog = () => this.list = undefined;
}

export const updateListButtonStore = new UpdateListButtonStore();
export const UpdateListButtonContext = createContext(updateListButtonStore);