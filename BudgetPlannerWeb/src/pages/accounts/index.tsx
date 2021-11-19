import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import useToken from "./useToken";

const AccountRoutes = () => {
  const { setToken } = useToken();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AccountRoutes;
