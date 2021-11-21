import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";
import { ListEdit } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const addList = (list: ListEdit) => httpPost(LIST_URL, list);