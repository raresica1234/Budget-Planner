import { Navigate, Route, Routes } from "react-router";
import MainView from "./main-view";

const PageRoutes = () => (
    <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default PageRoutes;