import React from "react";
import s from "./../Dialog.module.css";

type PropType = {
    message: string;
};

const Message: React.FC<PropType> = ({message}) => {
    return (
        <div className={s.message}>
            <p>{message}</p>
        </div>
    );
};

export default Message;