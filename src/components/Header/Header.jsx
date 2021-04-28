import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import socialLogo from '../../assets/images/social-logo.png'; 

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <NavLink to={"/"}>
                    <img
                        className={s.logo}
                        src={socialLogo}
                        alt="logo"
                    />
                </NavLink>
                
                <div className={s.blockLogin}>
                    {props.isAuthenticated 
                        ? <div>{props.login} <button onClick={props.logout}>LogOut</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
