import React, { useEffect } from "react";
import { HashRouter, NavLink, Redirect, Route, Switch, useLocation } from "react-router-dom";
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
import { UserOutlined, LaptopOutlined, ProfileOutlined, MessageOutlined, SoundOutlined, SettingOutlined, WechatOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css';
import './index.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import Sider from "antd/lib/layout/Sider";
const { Content, Footer } = Layout;

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
    const location = useLocation();

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
       
        <Layout>
            <Header />
            
            <Content style={{ padding: '0 50px' }}>
           
                <Layout className="site-layout-background" style={{ padding: '24px 0', flexDirection:'row' }}>
                    <Sider width={200} theme='light'>
                        <Menu activeKey={location.pathname} selectedKeys={[location.pathname]} defaultSelectedKeys={['/']} mode="inline">
                            <Menu.Item key="/profile" icon={<ProfileOutlined />}>
                                <NavLink to="/profile">Profile</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/dialog" icon={<MessageOutlined />}>
                                <NavLink to="/dialog">Messages</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/news" icon={<LaptopOutlined />}>
                                <NavLink to="/news">News</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/music" icon={<SoundOutlined />}>
                                <NavLink to="/music">Music</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/settings" icon={<SettingOutlined />}>
                                <NavLink to="/settings">Settings</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/users" icon={<UserOutlined />}>
                                <NavLink to="/users">Find Users</NavLink>
                            </Menu.Item>
                            <Menu.Item key="/chat" icon={<WechatOutlined />}>
                                <NavLink to="/chat">Chat</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: '280', textAlign: 'center' }}>
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
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2021 Created by Vetchinov Vlad</Footer>
        </Layout>
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
