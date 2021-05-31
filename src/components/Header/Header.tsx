import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from '../../assets/images/logo.png'; 
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectAuthorisedLogin } from "../../redux/selectors/auth-selector";
import { logout } from "../../redux/auth-reducer";


export const Header: React.FC= () => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectAuthorisedLogin);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };


    return (
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <NavLink to={"/"}>
                    <img
                        className={s.logo}
                        src={logo}
                        alt="logo"
                    />
                </NavLink>
                
                <div className={s.blockLogin}>
                    {isAuth 
                        ? <div>{login} <button onClick={logoutHandler}>LogOut</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};