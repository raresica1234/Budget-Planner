import { BASE_URL } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";
import { List, ListEdit } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const addList = (list: ListEdit) => httpPost<List>(LIST_URL, list);

export const updateList = (list: ListEdit) => httpPut(LIST_URL, list);

export const getCreatedLists = () => httpGet<List[]>(`${LIST_URL}/created`);

export const getSharedLists = () => httpGet<List[]>(`${LIST_URL}/shared`);