import React from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import "./App.css";
import { initializeApp } from "./redux/app-reducer";

//Components
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
// import DialogContainer from "./components/Dialog/DialogContainer";
import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";

let ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
let DialogContainer = React.lazy(() => import("./components/Dialog/DialogContainer"));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (
            <div className="container">
                <HeaderContainer />
                <Navbar />
                <div className="body__wrapper">
                    <Route
                        path="/profile/:userId?"
                        render={withSuspense(ProfileContainer)}
                    />
                    <Route
                        path="/dialog"
                        render={withSuspense(DialogContainer)}
                    />
                    <Route path="/news" render={() => <News />} />
                    <Route path="/music" render={() => <Music />} />
                    <Route path="/settings" render={() => <Settings />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Route path="/login" render={() => <Login />} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default MainApp;
