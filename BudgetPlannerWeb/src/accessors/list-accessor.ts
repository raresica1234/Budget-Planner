import { BASE_URL } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";
import { List, ListEdit, ListDetails, ListUsers } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const addList = (list: ListEdit) => httpPost<List>(LIST_URL, list);

export const updateList = (list: ListEdit) => httpPut<List>(LIST_URL, list);

export const getCreatedLists = (searchKeyword: string) => httpGet<List[]>(`${LIST_URL}/created?search=${searchKeyword}`);

export const getSharedLists = (searchKeyword: string) => httpGet<List[]>(`${LIST_URL}/shared?search=${searchKeyword}`);

export const getListUsers = (listId: string) => httpGet<ListUsers>(`${LIST_URL}/users/${listId}`);

export const getListDetails = async (listId: string) => {
    const { items, ...other } = await httpGet<ListDetails>(`${LIST_URL}/${listId}`);

    items.forEach((item) => {
        item.createdAt = new Date(item.createdAt);
        item.updatedAt = new Date(item.updatedAt);
    });
    
    return { items, ...other };
}