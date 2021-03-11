import React from "react";
import {
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../redux/dialogs-reducer";
import Dialog from "./Dialog";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        addNewMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (text) => {
            dispatch(updateNewMessageBodyCreator(text));
        },
    };
};

const DialogContainer = connect(mapStateToProps, mapDispatchToProps)(Dialog);

export default DialogContainer;
