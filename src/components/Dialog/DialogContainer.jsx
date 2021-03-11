import React from "react";
import {
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialog from "./Dialog";

const DialogContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let addNewMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    let updateNewMessageBody = (text) => {
        props.store.dispatch(updateNewMessageBodyCreator(text));
    };

    return (
        <Dialog
            addNewMessage={addNewMessage}
            updateNewMessageBody={updateNewMessageBody}
            newMessageText={state.newMessageText}
            messages={state.messages}
            dialogs={state.dialogs}
        />
    );
};

export default DialogContainer;
