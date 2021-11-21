import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";
import { RegisterUser, User } from "./types";

const ACCOUNT_URL = `${BASE_URL}authenticate`;

export const register = (user: RegisterUser) => httpPost(`${ACCOUNT_URL}/register`, user);
export const login = (user: User) => httpPost(`${ACCOUNT_URL}/login`, user);
