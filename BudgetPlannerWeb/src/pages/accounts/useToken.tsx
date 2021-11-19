import { LOGIN_TOKEN } from "../../accessors/constants";


const useToken = () => {
  const getToken = localStorage.getItem(LOGIN_TOKEN);

  const saveToken = (token: string) => 
    localStorage.setItem(LOGIN_TOKEN, token);

  return {
    setToken: saveToken,
    token: getToken
  }
}

export default useToken;