import { LOGIN_TOKEN } from "../../accessors/constants";

export const getToken = localStorage.getItem(LOGIN_TOKEN);
export const saveToken = (token: any) =>
  localStorage.setItem(LOGIN_TOKEN, token);
