import React from "react";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="body__wrapper">
        <Profile />
      </div>
    </div>
  );
};

export default App;
