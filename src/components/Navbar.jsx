import React from "react";
import s from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <a href="#a">Profile</a>
        </li>
        <li>
          <a href="#a">Messages</a>
        </li>
        <li>
          <a href="#a">News</a>
        </li>
        <li>
          <a href="#a">Music</a>
        </li>
        <li>
          <a href="#a">Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
