import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AccountRoutes from "./pages/accounts";

function App() {
	return (
		<BrowserRouter>
			<AccountRoutes/>
		</BrowserRouter>
	);
}

export default App;
