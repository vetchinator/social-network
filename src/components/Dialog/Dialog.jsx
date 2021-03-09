import React from "react";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialog = (props) => {
  let dialogElements = props.state.dialogs.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));

  let messageElements = props.state.messages.map((m) => (
    <Message message={m.message} />
  ));

  let newPostElement = React.createRef();

  let addNewMessage = () => {
    let text = newPostElement.current.value;
    props.addMessage(text);
    newPostElement.current.value = '';
  };

  return (
    <div className={s.dialog}>
      <div className={s.list}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <div>
          <textarea ref={newPostElement}></textarea>
        </div>
        <div>
          <button onClick={addNewMessage}>Add Post</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
