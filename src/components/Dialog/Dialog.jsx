import React from "react";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialog = (props) => {
    let dialogElements = props.dialogsPage.dialogs.map((d) => (
        <DialogItem key={d.id} name={d.name} id={d.id} />
    ));

    let messageElements = props.dialogsPage.messages.map((m) => (
        <Message message={m.message} key={m.id} />
    ));

    let newMessageElement = React.createRef();

    let onAddNewMessage = () => {
        props.sendMessage();
    };

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.updateNewMessageBody(text);
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
                    <button onClick={onAddNewMessage}>Add Post</button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
