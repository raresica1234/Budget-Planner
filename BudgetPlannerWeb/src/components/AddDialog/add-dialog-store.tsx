import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { List, EMPTY_LIST } from "../../accessors/types";
import { addList } from "../../accessors/list-accessor";

export class AddDialogStore {
    public isOpen: boolean = false;
    public input: string = "";
    public serverError: string = "";
    public addListCalled: boolean = false;
    public addedSuccessfully: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setIsOpen = (value: boolean) => this.isOpen = value;

    public setInput = (name: string) => this.input = name;

    public flushOperationResults = () => {
        this.addListCalled = false;
        this.serverError = "";
        this.addedSuccessfully = false;
    }

    public submitList = async () => {
        var newList: List = EMPTY_LIST;
        if (this.input.length == 0) {
            this.serverError = "Empty list name!";
            this.addListCalled = true;
            this.addedSuccessfully = false;
            return;
        } 
        
        newList.name = this.input;
        this.addListCalled = true;
        this.setIsOpen(false);

        try {
            await addList(newList);
            this.addedSuccessfully = true;
        } catch (error) {
            if (typeof error === "string") {
                this.serverError = error;
                this.addedSuccessfully = false;
            }
        }
        
    };
}

export const addDialogStore = new AddDialogStore();
export const AddDialogContext = createContext(addDialogStore);