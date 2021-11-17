import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./register";
import Login from "./login";

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
	  <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
};

export default AccountRoutes;
