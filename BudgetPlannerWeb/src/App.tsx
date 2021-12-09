import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import { useContext, useEffect } from "react";
import { AuthenticateContext } from "./infrastructure";
import PageRoutes from "./pages/main";
import { observer } from "mobx-react";

const App = () => {
    const { isUserLogged, initialize } = useContext(AuthenticateContext);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <BrowserRouter>
            {isUserLogged ? (
                <PageRoutes />
            ) : (
                <AccountRoutes />
            )}
        </BrowserRouter>
    );
};


export default observer(App);
