import React from "react";
import s from "./Preloader.module.css";

const Preloader: React.FC = (props) => {
    return (
        <div className={s.ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Preloader;
