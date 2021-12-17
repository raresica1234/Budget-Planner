import { EMPTY_ITEM_EDIT, ItemEdit } from "../../../../../accessors/types";
import { makeAutoObservable } from "mobx";
import { toastService } from "../../../../../infrastructure";
import { createContext } from "react";
import { addItem } from "../../../../../accessors/item-accessor";
import { itemsViewStore } from "../../items-view-store";

export class EditItemStore {
  public itemEdit: ItemEdit | null = null;
  public isAdd: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public setItemEdit = (itemEdit?: ItemEdit | null) => {
    this.isAdd = !itemEdit;
    this.itemEdit = itemEdit === undefined ? null : itemEdit ?? EMPTY_ITEM_EDIT;
  }

  public setName = (name: string) => {
    if (this.itemEdit)
      this.itemEdit.name = name;
  }

  public setPrice = (price: string) => {
    if (this.itemEdit)
      this.itemEdit.price = parseInt(price);
  }

  public setListId = (listId: string) => {
    if (this.itemEdit)
      this.itemEdit.listId = listId;
  }

  public sendItem = async () => {
    if (!this.itemEdit?.name || !this.itemEdit?.price)
      return false;

    try {
      const newItem = await addItem(this.itemEdit);

      itemsViewStore.addItem(newItem);
      itemsViewStore.addToSum(newItem.price);
    } catch (error) {
      if (typeof error === "string")
        toastService.showError(error);
      else
        toastService.showError("Unexpected server error!");
      return false;
    }

    toastService.showSuccess(
      `Item was ${this.isAdd ? "added" : "updated"} successfully!`
    );
    return true;
  };

  public reset = () => {
    this.itemEdit = null;
  }
}

export const editItemStore = new EditItemStore();
export const EditItemContext = createContext(editItemStore);