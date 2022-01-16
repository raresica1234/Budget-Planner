import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import {addItem, deleteItem, updateItem} from "../../../../accessors/item-accessor";
import { EMPTY_ITEM_EDIT, Item, ItemEdit } from "../../../../accessors/types";
import { toastService } from "../../../../infrastructure";
import { listDetailsViewStore } from "../../list-details-view/list-details-view-store";

export class EditItemDialogStore {
    public itemEdit: ItemEdit | null = null;
    public price: number | string = "";
    public isConfirmOpen: boolean = false;
    public isAdd: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setItemEdit = (itemEdit?: ItemEdit | null) => {
        this.isAdd = !itemEdit;
        this.itemEdit = itemEdit === undefined ? null : toJS(itemEdit) ?? EMPTY_ITEM_EDIT;
        this.price = this.itemEdit?.price || "";
    }

    public setName = (name: string) => {
        if (this.itemEdit)
            this.itemEdit.name = name;
    }

    public setPrice = (price: number | string) => {
        this.price = price
        if (this.itemEdit)
            this.itemEdit.price = price === "" ? 0 : Number(price);
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

    public removeItem = async (item: Item) => {
        try {
            await this.handleRemove(item);
        } catch (error) {
            if (typeof error === "string")
                toastService.showError(error);
            else
                toastService.showError("Unexpected server error!");
            return false;
        }

        toastService.showSuccess(
            <>Item&nbsp;<strong>{item.name}</strong>&nbsp; successfully removed!</>
        );
        return true;
    }

    public openConfirmDialog = () => this.isConfirmOpen = true;
    
    public closeConfirmDialog = () => this.isConfirmOpen = false;

    public reset = () => {
        this.itemEdit = null;
        this.price = "";
        this.isConfirmOpen = false;
    }

    private handleAdd = async () => {
        const newItem = await addItem(this.itemEdit!!);
            
        listDetailsViewStore.addItem(newItem);
    }

    private handleUpdate = async () => {
        const updatedItem = await updateItem(this.itemEdit!!);
            
        listDetailsViewStore.updateItem(updatedItem);
    }

    private handleRemove = async (item: Item) => {
        await deleteItem(item.id || "");

        listDetailsViewStore.removeItem(item);
    }
}

export const editItemDialogStore = new EditItemDialogStore();
export const EditItemDialogContext = createContext(editItemDialogStore);