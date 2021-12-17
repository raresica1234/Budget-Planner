import { BASE_URL } from "./constants";
import { httpPost } from "./helper-functions";
import { RegisterUser, TokenResponse, User } from "./types";

const ACCOUNT_URL = `${BASE_URL}Authenticate`;

export const register = (user: RegisterUser) => httpPost(`${ACCOUNT_URL}/register`, user);

export const login = async (user: User) => {
    const { token } = await httpPost<TokenResponse>(`${ACCOUNT_URL}/login`, user);

    return token;
}
