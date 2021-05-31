import React from "react";
import { HashRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { initializeApp } from "./redux/app-reducer";

//Components
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersPage from "./components/Users/UsersPage";
import Login from "./components/Login/Login";
import { compose } from "redux";
import { connect, Provider } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import store, { RootState } from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
import ErrorPage from './components/ErrorPage/ErrorPage';
import { Header } from "./components/Header/Header";

let ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
let DialogContainer = React.lazy(() => import("./components/Dialog/Dialog"));

let SuspensedProfile =  withSuspense(ProfileContainer);
let SuspensedDialog =  withSuspense(DialogContainer);

type PropType = StatePropType & DispatchPropType;

type StatePropType = {
    initialized: boolean
}

type DispatchPropType = {
    initializeApp: () => void
}

class App extends React.Component<PropType> {

    cacthAllUnhandledErrors(e: PromiseRejectionEvent) {
        alert("Some error occured");
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.cacthAllUnhandledErrors);
    }
    
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.cacthAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (
            <div className="container">
                <Header />
                <Navbar />
                <div className="body__wrapper">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return <Redirect to="/profile" />;
                            }}
                        />
                        <Route path="/profile/:userId?" render={() => <SuspensedProfile />} />
                        <Route path="/dialog" render={() => <SuspensedDialog />} />
                        <Route path="/news" render={() => <News />} />
                        <Route path="/music" render={() => <Music />} />
                        <Route path="/settings" render={() => <Settings />} />
                        <Route path="/users" render={() => <UsersPage />} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="*" render={() => <ErrorPage />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StatePropType => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<StatePropType, DispatchPropType, {}, RootState>(mapStateToProps, { initializeApp })
)(App);

const MainApp: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    );
};

export default MainApp;
