import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";
import { ListEdit } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const addList = (list: ListEdit) => {
    console.log(LIST_URL);
    httpPost(LIST_URL, list);
}