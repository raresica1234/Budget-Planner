import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { List, EMPTY_LIST_EDIT, ListEdit } from "../../accessors/types";
import { addList } from "../../accessors/list-accessor";

export class AddListStore {
    public isOpen: boolean = false;
    public list: ListEdit = EMPTY_LIST_EDIT;
    public serverError: string = "";
    public addListCalled: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setIsOpen = (value: boolean) => this.isOpen = value;

    public setName = (name: string) => this.list.name = name;

    public flushOperationResults = () => {
        this.addListCalled = false;
        this.serverError = "";
    }

    public submitList = async () => {
        

        if (!this.list.name) {
            this.serverError = "Empty list name!";
            return;
        } 
        
        try {
            await addList(this.list);
        } catch (error) {
            if (typeof error === "string") {
                this.serverError = error;
            }
        }
        this.addListCalled = true;
        this.setIsOpen(false);
    };
}

export const addListStore = new AddListStore();
export const AddListContext = createContext(addListStore);