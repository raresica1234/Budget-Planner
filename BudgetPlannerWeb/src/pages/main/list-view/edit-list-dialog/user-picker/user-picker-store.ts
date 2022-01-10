import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { EmailWithRole, EMPTY_EMAIL_WITH_ROLE, UserRole } from "../../../../../accessors/types";
import { toastService } from "../../../../../infrastructure";

export class UserPickerStore {
    public user: EmailWithRole = EMPTY_EMAIL_WITH_ROLE;

    constructor() {
        makeAutoObservable(this);
    }

    public setEmail = (email: string) => this.user.email = email;

    public setRole = (role: UserRole) => this.user.type = role;

    public validateUser = (existingUsers: EmailWithRole[]) => {
        if (!this.user.email) {
            toastService.showError("The email cannot be empty!");
            return false;
        }

        if (existingUsers.some(({ email }) => email === this.user.email)) {
            toastService.showError("The email is already added!");
            return false;
        }

        return true;
    }

    public reset = () => {
        this.user = EMPTY_EMAIL_WITH_ROLE;
    }
}

export const userPickerStore = new UserPickerStore();
export const UserPickerContext = createContext(userPickerStore);