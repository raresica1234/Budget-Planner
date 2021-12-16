import { BASE_URL } from "./constants";
import { httpGet } from "./helper-functions";
import { ListDetails } from "./types";

const LIST_URL = `${BASE_URL}lists`;

export const getListDetails = (listId: string) => httpGet<ListDetails>(`${LIST_URL}/${listId}`);