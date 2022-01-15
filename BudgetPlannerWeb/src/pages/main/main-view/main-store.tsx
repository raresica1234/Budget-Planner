import { debounce } from "@mui/material";
import { makeAutoObservable} from "mobx";
import { createContext } from "react";
import { List, StatisticsEntry } from "../../../accessors/types";
import { createdListsViewStore } from "../list-view/list/created-lists-view-store";
import { sharedListsViewStore } from "../list-view/list/shared-lists-view-store";
import { getCreatedLists, getListDetails, getSharedLists } from "../../../accessors/list-accessor";

export class MainViewStore {
    public tabNumber: number = 0;
    public searchKeyword: string = "";
    public statisticsData: StatisticsEntry[] = [];
    public statisticsIsOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public setTabNumber = (value: number) => {
        this.tabNumber = value;
        this.fetchLists();
    }

    public setSearchKeyword = (value: string) => {
        this.searchKeyword = value;
        this.fetchLists();
    }

    public initialize = () => this.fetchLists();

    private fetchLists = debounce(() => {
        const store = this.tabNumber ? sharedListsViewStore : createdListsViewStore;
        
        store.search(this.searchKeyword);
    }, 250);

    private getListStats = async (list: List) => {
        const {name, sum} = await getListDetails(list.id || "");
        const stats: StatisticsEntry = {listName: name, totalSum: sum}
        this.statisticsData.push(stats);
    }
    
    public populateAndOpenStatistics = async () => {
        this.statisticsData = [];
        const createdLists = await getCreatedLists("");
        const sharedLists = await getSharedLists("");
        const allLists: List[] = createdLists.concat(sharedLists);
        Promise.all(allLists.map(this.getListStats)).then(this.openStatistics);
    }

    private openStatistics = () => {
        this.statisticsIsOpen = true;
    }
    public closeStatistics = () => {
        this.statisticsData = [];
        this.statisticsIsOpen = false;
    }
}

export const mainViewStore = new MainViewStore();
export const MainViewContext = createContext(mainViewStore);