import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import MainPage from './pages/main';

function App() {
	return (
		<MainPage/>
		/*
		<BrowserRouter>
			<AccountRoutes/>
		</BrowserRouter>
		*/
	);
}

export default App;
