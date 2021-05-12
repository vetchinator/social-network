import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialog.module.css";
import userLogo from "../../../assets/images/user.png";

type PropType = {
    name: string,
    id: number
}

const DialogItem: React.FC<PropType> = ({name, id}) => {
    let path = "/dialog/" + id;

    return (
        <NavLink to={path} activeClassName={s.item + " " + s.active}>
            <div className={s.item}>
                <img src={userLogo} alt="user logo" />
                <p>{name}</p>
            </div>
        </NavLink>
    );
};

export default DialogItem;
