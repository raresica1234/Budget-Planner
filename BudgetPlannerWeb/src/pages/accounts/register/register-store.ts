import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { register } from "../../../accessors/account-accessor";
import { EMPTY_REGISTER_USER, RegisterUser } from "../../../accessors/types";

export class RegisterStore {
    public user: RegisterUser = EMPTY_REGISTER_USER;
    public serverError: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    public setEmail = (email: string) => this.user.email = email;

    public setPassword = (password: string) => this.user.password = password;

    public setConfirmPassword = (confirmPassword: string) => this.user.confirmPassword = confirmPassword;

    public reset = () => {
        this.user = EMPTY_REGISTER_USER;
    }

    public register = async () => {
        if (this.user.password === this.user.confirmPassword){
            try{
                if (this.user.password !== this.user.confirmPassword) {
                    this.serverError = "Passwords do not match!";
                    return false;
                }
                await register(this.user);
                return true;
            } catch (error) {
                if (typeof error === "string"){
                    this.serverError = error;
                    return false;
                }
            }
        }
    }
}

export const registerStore = new RegisterStore();
export const RegisterContext = createContext(registerStore);
