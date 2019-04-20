import React from "react";
import "./App.css";
import Routes from "../../routes";
import AuthModal from "../AuthModal";
import AddModal from "../AddModal";
function App() {
  return (
    <div className="App">
      <AuthModal />
      <AddModal />
      <Routes />
    </div>
  );
}

export default App;
