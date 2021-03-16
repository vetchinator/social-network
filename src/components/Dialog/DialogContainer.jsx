import React from "react";
import { sendMessage, updateNewMessageBody } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

const DialogContainer = connect(mapStateToProps, {
    sendMessage,
    updateNewMessageBody,
})(Dialog);

export default DialogContainer;
