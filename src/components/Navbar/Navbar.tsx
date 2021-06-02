import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const Navbar: React.FC= (props) => {
    return (
        <nav className={s.nav}>
            <ul>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/dialog">Messages</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/news">News</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/music">Music</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/settings">Settings</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/users">Find Users</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={s.activeLink} to="/chat">Chat</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
