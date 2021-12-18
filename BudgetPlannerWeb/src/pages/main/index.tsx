import { Navigate, Route, Routes } from "react-router";
import ItemsView from "./list-details-view";
import MainView from "./main-view";

const PageRoutes = () => (
    <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/list/:id" element = {<ItemsView/>} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default PageRoutes;