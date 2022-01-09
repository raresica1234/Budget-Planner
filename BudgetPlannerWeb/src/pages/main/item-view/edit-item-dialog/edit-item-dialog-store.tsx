import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import { addItem, updateItem } from "../../../../accessors/item-accessor";
import { EMPTY_ITEM_EDIT, ItemEdit } from "../../../../accessors/types";
import { toastService } from "../../../../infrastructure";
import { listDetailsViewStore } from "../../list-details-view/list-details-view-store";

export class EditItemDialogStore {
    public itemEdit: ItemEdit | null = null;
    public isAdd: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setItemEdit = (itemEdit?: ItemEdit | null) => {
        this.isAdd = !itemEdit;
        this.itemEdit = itemEdit === undefined ? null : toJS(itemEdit) ?? EMPTY_ITEM_EDIT;
    }

    public setName = (name: string) => {
        if (this.itemEdit)
            this.itemEdit.name = name;
    }

    public setPrice = (price: number) => {
        if (this.itemEdit)
            this.itemEdit.price = price;
    }

    public sendItem = async (listId: string) => {
        if (!this.itemEdit?.name) {
            toastService.showError("The item name cannot be empty!");
            return false;
        }
        
        this.itemEdit.listId = listId;

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
            <>Item&nbsp;<strong>{this.itemEdit.name}</strong>&nbsp;was {this.isAdd ? "added" : "updated"} successfully!</>
        );
        return true;
    };

    public reset = () => {
        this.itemEdit = null;
    }

    private handleAdd = async () => {
        const newItem = await addItem(this.itemEdit!!);
            
        listDetailsViewStore.addItem(newItem);
    }

    private handleUpdate = async () => {
        const updatedItem = await updateItem(this.itemEdit!!);
            
        listDetailsViewStore.updateItem(updatedItem);
    }
}

export const editItemDialogStore = new EditItemDialogStore();
export const EditItemDialogContext = createContext(editItemDialogStore);