import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import { addList, updateList } from "../../../../../accessors/list-accessor";
import { EMPTY_LIST_EDIT, ListEdit } from "../../../../../accessors/types";
import { toastService } from "../../../../../infrastructure";
import { createdListsViewStore } from "../../list/created-lists-view-store";

export class EditListDialogStore {
    public listEdit: ListEdit | null = null;
    public isAdd: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setListEdit = (listEdit?: ListEdit | null) => {
        this.isAdd = !listEdit;
        this.listEdit = listEdit === undefined ? null : toJS(listEdit) ?? EMPTY_LIST_EDIT;
    }

    public setName = (name: string) => {
        if (this.listEdit)
            this.listEdit.name = name;
    }

    public sendList = async () => {
        if (!this.listEdit?.name) {
            toastService.showError("The list name cannot be empty!");
            return false;
        }
        
        try {
            const apiCall = this.isAdd ? this.handleAdd : this.handleUpdate;

            await apiCall();
        } catch (error) {
            if (typeof error === "string")
                toastService.showError(error);
            else
                toastService.showError("Unexpected server error!");
            return false;
        }

        toastService.showSuccess(
            <>List&nbsp;<strong>{this.listEdit.name}</strong>&nbsp;was {this.isAdd ? "added" : "updated"} successfully!</>
        );
        return true;
    };

    public reset = () => {
        this.listEdit = null;
    }

    private handleAdd = async () => {
        const newList = await addList(this.listEdit!!);
            
        createdListsViewStore.addList(newList);
    }

    private handleUpdate = async () => {
        const updatedList = await updateList(this.listEdit!!);
            
        createdListsViewStore.updateList(updatedList);
    }
}

export const editListDialogStore = new EditListDialogStore();
export const EditListDialogContext = createContext(editListDialogStore);