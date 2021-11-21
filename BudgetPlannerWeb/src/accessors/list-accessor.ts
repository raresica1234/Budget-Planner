import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";
import { List } from "./types";

const LIST_URL = `${BASE_URL}Lists`;

export const addList = (list: List) => httpPost(`${LIST_URL}`, list);