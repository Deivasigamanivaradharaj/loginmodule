import { useContext, useEffect, useState } from 'react';
import './App.css';
import Authentication from './Authentication/Authentication'
import AuthContext, { AuthContextProvider } from './Context/AuthContext';
import Home from './Home/Home';

function App() {

  let Context = useContext(AuthContext)

  return (
    <div className='app'>
      {!Context.isLoggedIn && <Authentication ></Authentication>}
      {Context.isLoggedIn && <Home></Home>}
    </div>
  );
}

export default App;
