import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialog.module.css";

const DialogItem = (props) => {
    let path = "/dialog/" + props.id;

    return (
        <NavLink to={path} activeClassName={s.item + " " + s.active}>
            <div className={s.item}>
                <img src="/user.png" alt="avatar" />
                <p>{props.name}</p>
            </div>
        </NavLink>
    );
};

export default DialogItem;
