import React from 'react';
import './App.css';
import Routes from '../../routes';
import AuthModal from '../AuthModal'
function App() {

    return (
      <div className="App">
        <AuthModal />
      <Routes />
      </div>
    );
}

export default App;
