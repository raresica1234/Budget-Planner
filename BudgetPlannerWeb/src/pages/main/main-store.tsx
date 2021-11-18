import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class TabNumberStore {
    public tabNumber: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    public setTabNumber = (value: number) => this.tabNumber = value;
}

export const tabNumberStore = new TabNumberStore();
export const TabNumberContext = createContext(tabNumberStore);