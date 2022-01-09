import { BASE_URL } from "./constants";
import { httpPost, httpPut } from "./helper-functions";
import { Item, ItemEdit } from "./types";

const ITEM_URL = `${BASE_URL}Items`;

export const addItem = (item: ItemEdit) => httpPost<Item>(ITEM_URL, item);

export const updateItem = (item: ItemEdit) => httpPut<Item>(ITEM_URL, item);