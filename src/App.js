import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialog from "./components/Dialog/Dialog";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Navbar />
        <div className="body__wrapper">
          <Route path="/profile" component={Profile} />
          <Route path="/dialog" component={Dialog} />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
