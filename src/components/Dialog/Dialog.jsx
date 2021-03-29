import React from "react";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { useForm } from "react-hook-form";

const AddMessageForm = (props) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        props.sendMessage(data.addMessage);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea type="text" name="addMessage"  ref={register}></textarea>
            </div>
            <div>
                <button type="submit">Send Message</button>
            </div>
        </form>
    );
};

const Dialog = (props) => {
    let dialogElements = props.dialogsPage.dialogs.map((d) => (
        <DialogItem key={d.id} name={d.name} id={d.id} />
    ));

    let messageElements = props.dialogsPage.messages.map((m) => (
        <Message message={m.message} key={m.id} />
    ));

    return (
        <div className={s.dialog}>
            <div className={s.list}>{dialogElements}</div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <AddMessageForm sendMessage={props.sendMessage}/>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
