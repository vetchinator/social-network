import React from "react";
import s from "./Header.module.css";

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header__wrapper}>
                <img
                    className={s.logo}
                    src="https://img2.pngio.com/logo-png-images-download-150000-logo-png-resources-with-logo-download-png-360_360.png"
                    alt="logo"
                />
            </div>
        </header>
    );
};

export default Header;
