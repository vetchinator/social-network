import React from "react";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/state";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialog = (props) => {
  let dialogElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem id={d.id} name={d.name} />
  ));

  let messageElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} />
  ));

  let newMessageElement = React.createRef();

  let addNewMessage = () => {
    props.dispatch(sendMessageCreator());
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.dispatch(updateNewMessageBodyCreator(text));
  };

  return (
    <div className={s.dialog}>
      <div className={s.list}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <div>
          <textarea
            onChange={onMessageChange}
            ref={newMessageElement}
            value={props.dialogsPage.newMessageText}
          ></textarea>
        </div>
        <div>
          <button onClick={addNewMessage}>Add Post</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
