import { BASE_URL } from "./constants";
import { httpGet } from "./helper-functions";

const LIST_URL = `${BASE_URL}lists`;

export const getListDetails = () => httpGet(LIST_URL);