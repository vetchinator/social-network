import Dialog from "./Dialog";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { RootState } from "../../redux/redux-store";
import { DialogItemType, MessageItemType } from "../../types/types";
import { actions } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import React from "react";

type MapStateToPropsType = {
    dialogs: Array<DialogItemType>;
    messages: Array<MessageItemType>;
};

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    };
};

export default compose<React.ComponentType>(connect(mapStateToProps, { ...actions }), withAuthRedirect)(Dialog);
