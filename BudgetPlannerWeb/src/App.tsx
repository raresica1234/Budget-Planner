import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import MainPage from './components/MainView';
import ListsView from "./components/ListsView";

const App = () => (
    <BrowserRouter>
        <AccountRoutes />
    </BrowserRouter>
);


export default App;
