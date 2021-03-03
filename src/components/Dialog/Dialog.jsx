import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialog.module.css";

const DialogItem = (props) => {
  let path = "/dialog/" + props.id;

  return (
    <NavLink to={path} activeClassName={s.item + " " + s.active}>
      <div className={s.item}>
        <img
          src="https://www.iconsdb.com/icons/preview/orange/user-xxl.png"
          alt="avatar"
        />
        <p>{props.name}</p>
      </div>
    </NavLink>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>;
};

const Dialog = () => {
  return (
    <div className={s.dialog}>
      <div className={s.list}>
        <DialogItem id="1" name="Sasha" />
        <DialogItem id="2" name="Oleg" />
        <DialogItem id="3" name="Aleksej" />
        <DialogItem id="4" name="Svetlana" />
        <DialogItem id="5" name="Nastya" />
      </div>
      <div className={s.messages}>
        <Message message="Hi!" />
        <Message message="Hi!" />
        <Message message="How are you?" />
        <Message message="I'm fine, thank you!" />
      </div>
    </div>
  );
};

export default Dialog;
