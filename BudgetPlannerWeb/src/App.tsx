import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import { useContext, useEffect } from "react";
import { AuthenticateContext, ToastService } from "./infrastructure";
import PageRoutes from "./pages/main";
import { observer } from "mobx-react";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
    const { isUserLogged, initialize } = useContext(AuthenticateContext);

    const theme = createTheme({
		palette: {
            text: {
                primary: "#fff",
                secondary: "#ddd"
            },
            background: { paper: "#000" }
		}
	});

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (isUserLogged === undefined)
        return null;

    return <ThemeProvider theme={theme}>
        <BrowserRouter>
            {isUserLogged ? (
                <PageRoutes />
            ) : (
                <AccountRoutes />
            )}
        </BrowserRouter>
        <ToastService />
    </ThemeProvider>;
};


export default observer(App);
