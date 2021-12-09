import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { addList } from "../../../../../accessors/list-accessor";
import { EMPTY_LIST_EDIT, ListEdit } from "../../../../../accessors/types";
import { toastService } from "../../../../../infrastructure";

export class EditListDialogStore {
    public listEdit: ListEdit | null = null;
    public isAdd: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setListEdit = (listEdit?: ListEdit | null) => {
        this.isAdd = !listEdit;
        this.listEdit = listEdit === undefined ? null : listEdit ?? EMPTY_LIST_EDIT;
    }

    public setName = (name: string) => {
        if (this.listEdit)
            this.listEdit.name = name;
    }

    public sendList = async () => {
        console.log("sendList", this.listEdit);
        if (!this.listEdit?.name)
            return false;
        
        try {
            await addList(this.listEdit);
        } catch (error) {
            if (typeof error === "string")
                toastService.showError(error);
            else
                toastService.showError("Unexpected server error!");
            return false;
        }

        toastService.showSuccess(
            `List ${this.listEdit.name} was ${this.isAdd ? "added" : "updated"} successfully!`
        );
        return true;
    };

    public reset = () => {
        this.listEdit = null;
    }
}

export const editListDialogStore = new EditListDialogStore();
export const EditListDialogContext = createContext(editListDialogStore);