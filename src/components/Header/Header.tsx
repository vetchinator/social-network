import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import logo from '../../assets/images/logo.png'; 

type PropType = {
    login: string | null,
    isAuthenticated: boolean,
    logout: () => void
}

const Header: React.FC<PropType>= ({isAuthenticated, login, logout}) => {
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
                    {isAuthenticated 
                        ? <div>{login} <button onClick={logout}>LogOut</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
