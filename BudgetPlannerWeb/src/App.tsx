import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import MainPage from './components/MainView';
import ListsView from "./components/ListsView";

function App() {
    return (
        <BrowserRouter>
            <AccountRoutes />
        </BrowserRouter>
    );
}

export default App;
