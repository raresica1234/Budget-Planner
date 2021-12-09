import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { login } from "../../../accessors/account-accessor";
import { EMPTY_USER, User } from "../../../accessors/types";
import { authenticateStore, toastService } from "../../../infrastructure";

export class LoginStore {
    public user: User = EMPTY_USER;

    constructor() {
        makeAutoObservable(this);
    }

    public setEmail = (email: string) => this.user.email = email;

    public setPassword = (password: string) => this.user.password = password;

    public reset = () => {
        this.user = EMPTY_USER;
    }

    public login = async () => {
        try {
            const token = await login(this.user);
            authenticateStore.setToken(token);

            return true;
        } catch {
            toastService.showError("Login failed, wrong email or password!");
        }
        return false;
    }
}

export const loginStore = new LoginStore();
export const LoginContext = createContext(loginStore);
