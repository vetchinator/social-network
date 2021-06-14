import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from '../../assets/images/logo.png';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectAuthorisedLogin } from "../../redux/selectors/auth-selector";
import { logout } from "../../redux/auth-reducer";
import { Button, Col, Layout, Row } from 'antd';

import 'antd/dist/antd.css';

export const Header: React.FC = () => {

    const { Header } = Layout;
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectAuthorisedLogin);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };


    return (
        <Header className='header'>
            <Row justify="space-between">
                <Col span={4}>
                    <NavLink to={"/"}>
                        <img
                            className={s.logo}
                            src={logo}
                            alt="logo"
                        />
                    </NavLink>
                </Col>
                <Col span={5}>
                    {isAuth
                        ? <Row justify="space-around" align="middle"><span style={{ color: 'white' }}>{login}</span> <Button onClick={logoutHandler}>LogOut</Button></Row>
                        : <NavLink to={'/login'}>Login</NavLink>
                    }
                </Col>
            </Row>

        </Header>
    );
};