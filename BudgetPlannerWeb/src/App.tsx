import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import ListsView from "./components/ListsView";

function App() {
	const lists = [
        {
            id: "1",
            name: "Test1",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            name: "Test2",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "3",
            name: "Test3",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "4",
            name: "Test4",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    return (
        <BrowserRouter>
            {/* <AccountRoutes /> */}
            <ListsView lists={lists} />
        </BrowserRouter>
    );
}

export default App;
