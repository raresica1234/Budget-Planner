import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./register";
import Login from "./login";

const AccountRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AccountRoutes;
