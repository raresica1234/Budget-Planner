import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { setToken, getToken, clearToken } from "..";

class AuthenticateStore {
    public isUserLogged?: boolean = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    public initialize = () => {
        this.isUserLogged = !!getToken();
    }

    public setToken = (token?: string) => {
        // eslint-disable-next-line
        if (this.isUserLogged = !!token) {
            setToken(token);
        } else {
            clearToken();
        }
    }
}

export const authenticateStore = new AuthenticateStore();
export const AuthenticateContext = createContext(authenticateStore);