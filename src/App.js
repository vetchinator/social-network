import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogContainer from "./components/Dialog/DialogContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';

const App = (props) => {
    return (
        <div className="container">
            <HeaderContainer />
            <Navbar store={props.store} />
            <div className="body__wrapper">
                <Route
                    path="/profile/:userId?"
                    render={() => <ProfileContainer />}
                />
                <Route
                    path="/dialog"
                    render={() => <DialogContainer />}
                />
                <Route path="/news" render={() => <News />} />
                <Route path="/music" render={() => <Music />} />
                <Route path="/settings" render={() => <Settings />} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/login" render={() => <Login />} />
            </div>
        </div>
    );
};

export default App;
