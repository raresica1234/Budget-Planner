import { makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { addList, getListUsers, updateList } from "../../../../accessors/list-accessor";
import { EmailWithRole, EMPTY_LIST_EDIT, EMPTY_LIST_USERS, ListEdit, ListUsers } from "../../../../accessors/types";
import { toastService } from "../../../../infrastructure";
import { createdListsViewStore } from "../list/created-lists-view-store";

export class EditListDialogStore {
    public listEdit: ListEdit | null = null;
    public isAdd: boolean = false;
    public users: ListUsers = EMPTY_LIST_USERS;

    constructor() {
        makeAutoObservable(this);
    }

    public setListEdit = (listEdit?: ListEdit | null) => {
        this.isAdd = !listEdit;
        this.listEdit = listEdit === undefined ? null : toJS(listEdit) ?? EMPTY_LIST_EDIT;

        if (this.listEdit)
            this.fetchUsers();
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

    public addUser = (user: EmailWithRole) => {
        this.listEdit?.users.push(user);

        const indexToRemove = this.users.relevantEmails.indexOf(user.email);

        this.users.relevantEmails.splice(indexToRemove, 1);
    }

    public removeUser = (user: EmailWithRole) => {
        if (!this.listEdit)
            return;

        const indexToRemove = this.listEdit.users.indexOf(user);

        this.listEdit.users.splice(indexToRemove, 1);

        this.users.relevantEmails.push(user.email);
    }

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

    private fetchUsers = async () => {
        console.log(this.listEdit?.id)
        const users = await getListUsers(this.listEdit?.id ?? "");
        runInAction(() => {
            this.users = users;
            if (this.listEdit)
                this.listEdit.users = users.linkedUsers;
        });
    }
}

export const editListDialogStore = new EditListDialogStore();
export const EditListDialogContext = createContext(editListDialogStore);