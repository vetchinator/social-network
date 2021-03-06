import React from "react";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialog = (props) => {
  let dialogElements = props.dialogs.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));
  let messageElements = props.messages.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={s.dialog}>
      <div className={s.list}>{dialogElements}</div>
      <div className={s.messages}>{messageElements}</div>
    </div>
  );
};

export default Dialog;
