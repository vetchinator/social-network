import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <img
                    className={s.logo}
                    src="https://img2.pngio.com/logo-png-images-download-150000-logo-png-resources-with-logo-download-png-360_360.png"
                    alt="logo"
                />
                <div className={s.blockLogin}>
                    {props.isAuthenticated 
                        ? (<div>{props.login} <button onClick={props.logout}>LogOut</button></div>)
                        : (<NavLink to="/login">Login</NavLink>)
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
