import React from 'react';
import './App.scss';
import LoginForm from './components/LoginForm';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <div className="App">
      <h2>Application</h2>
    </div>
  );
}

export default App;
