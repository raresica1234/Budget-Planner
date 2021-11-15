import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import AccountRoutes from "./pages/accounts";
import LoginForm from './pages/accounts/login';

function App() {
	const { token, setToken } = useToken();

	if(!token) {
	  return <LoginForm setToken={setToken} />
	}
	
	return (
		<BrowserRouter>
			<AccountRoutes/>
		</BrowserRouter>
	);
}

export default App;
