import React from "react";
import s from "./Preloader.module.css";

type PropType = {}

const Preloader: React.FC<PropType> = (props) => {
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
