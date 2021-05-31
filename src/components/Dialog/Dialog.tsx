import React from "react";
import s from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectDialogs, selectMessages } from "../../redux/selectors/dialogs-selector";
import { actions } from "../../redux/dialogs-reducer";

type PropFormType = {
    sendMessage: (newMessage: string) => void;
};
type FormValueType = {
    addMessage: string;
};

const AddMessageForm: React.FC<PropFormType> = (props) => {
    const { register, handleSubmit, reset } = useForm<FormValueType>();
    const onSubmit: SubmitHandler<FormValueType> = (data) => {
        props.sendMessage(data.addMessage);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea name="addMessage" ref={register}></textarea>
            </div>
            <div>
                <button type="submit">Send Message</button>
            </div>
        </form>
    );
};

const Dialog: React.FC = () => {
    const dialogs = useSelector(selectDialogs);
    const messages = useSelector(selectMessages);

    const dispatch = useDispatch();

    const sendMessageHandler = (newMessage: string) => {
        dispatch(actions.sendMessage(newMessage));
    };

    let dialogElements = dialogs.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);

    let messageElements = messages.map((m) => <Message message={m.message} key={m.id} />);

    return (
        <div className={s.dialog}>
            <div className={s.list}>{dialogElements}</div>
            <div className={s.messages}>
                {messageElements}
                <div>
                    <AddMessageForm sendMessage={sendMessageHandler} />
                </div>
            </div>
        </div>
    );
};

export default Dialog;