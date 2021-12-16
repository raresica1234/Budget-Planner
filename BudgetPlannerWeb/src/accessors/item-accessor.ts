import { BASE_URL } from "./constants";
import { httpGet } from "./helper-functions";
import { Item } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const getListDetails = (listId: string) => httpGet<string>(`${LIST_URL}/${listId}`);