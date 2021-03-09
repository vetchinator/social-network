import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialog from "./components/Dialog/Dialog";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const App = (props) => {

  return (
    <div className="container">
      <Header />
      <Navbar state={props.state.sidebar} />
      <div className="body__wrapper">
        <Route
          path="/profile"
          render={() => (
            <Profile
              profilePage={props.state.profilePage}
              addPost={props.addPost}
              updateNewPostText={props.updateNewPostText}
            />
          )}
        />
        <Route
          path="/dialog"
          render={() => (
            <Dialog
              dialogsPage={props.state.dialogsPage}
              addMessage={props.addMessage}
              updateNewMessageText={props.updateNewMessageText}
              
            />
          )}
        />
        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
      </div>
    </div>
  );
};

export default App;
