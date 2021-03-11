import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogContainer from "./components/Dialog/DialogContainer";

const App = (props) => {
    return (
        <div className="container">
            <Header />
            <Navbar store={props.store} />
            <div className="body__wrapper">
                <Route
                    path="/profile"
                    render={() => <Profile store={props.store} />}
                />
                <Route
                    path="/dialog"
                    render={() => <DialogContainer store={props.store} />}
                />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
            </div>
        </div>
    );
};

export default App;
