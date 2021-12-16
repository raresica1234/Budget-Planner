import { Navigate, Route, Routes } from "react-router";
import ItemsView from "./item-view";
import MainView from "./main-view";

const PageRoutes = () => (
    <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/list/*" element = {<ItemsView/>} />
    </Routes>
);

export default PageRoutes;