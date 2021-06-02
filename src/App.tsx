import React, { useEffect } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { initializeApp } from "./redux/app-reducer";

//Components
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersPage from "./components/Users/UsersPage";
import Login from "./components/Login/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { Header } from "./components/Header/Header";
import { selectIsInitialized } from "./redux/selectors/app-selector";
import ChatPage from "./Pages/Chat/Chat";

let ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
let DialogContainer = React.lazy(() => import("./components/Dialog/Dialog"));

let SuspensedProfile = withSuspense(ProfileContainer);
let SuspensedDialog = withSuspense(DialogContainer);

const App: React.FC = () => {
    const initialized = useSelector(selectIsInitialized);

    const dispatch = useDispatch();
    const initializeAppHandler = () => {
        dispatch(initializeApp());
    };
    const cacthAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Some error occured");
    };

    useEffect(() => {
        initializeAppHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener("unhandledrejection", cacthAllUnhandledErrors);
        return () => {
            window.removeEventListener("unhandledrejection", cacthAllUnhandledErrors);
        };
    }, []);

    if (!initialized) {
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
                    <Route path="/chat" render={() => <ChatPage />} />
                    <Route path="*" render={() => <ErrorPage />} />
                </Switch>
            </div>
        </div>
    );
};

const MainApp: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    );
};

export default MainApp;
