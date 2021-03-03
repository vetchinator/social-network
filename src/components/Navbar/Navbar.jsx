import React from "react";
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/dialog">Messages</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/music">Music</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
