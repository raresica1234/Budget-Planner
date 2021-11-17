import { useState } from "react";
import { LOGIN_TOKEN } from "../../accessors/constants";


const useToken = () => {
  const getToken = () => {
    return localStorage.getItem(LOGIN_TOKEN);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: string) => {
    localStorage.setItem(LOGIN_TOKEN, token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;