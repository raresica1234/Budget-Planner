import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { setToken, getToken, clearToken } from "..";

class AuthenticateStore {
    public isUserLogged: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    public initialize = () => {
        this.isUserLogged = !!getToken();
    }

    public setToken = (token?: string) => {
        console.log(this.isUserLogged = !!token);
        if (this.isUserLogged = !!token) {
            setToken(token);
        } else {
            clearToken();
        }
    }
}

export const authenticateStore = new AuthenticateStore();
export const AuthenticateContext = createContext(authenticateStore);