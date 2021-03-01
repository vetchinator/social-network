import React from "react";
import "./App.css";

//Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="body__wrapper">
        
        <Profile />
      </div>
      <div className="body__wrapper">
        <Profile />
      </div>
      <div className="body__wrapper">
        <Profile />
      </div>
    </div>
  );
};

export default App;
