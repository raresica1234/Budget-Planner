import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./register";

const AccountRoutes = () => (
	<Routes>
		<Route path="/register" element={<Register />}/>
		<Route path="*" element={<Navigate to="/register"/>}/>
	</Routes>
)

export default AccountRoutes;