import { sendMessage } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { RootState } from "../../redux/redux-store";
import { DialogItemType, MessageItemType } from "../../types/types";

type MapStateToPropsType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageItemType>,
}

type OwnPropsType = {}

type MapDispatchToPropsType = {
    sendMessage: (newMessage: string) => void
}

let mapStateToProps = (state: RootState) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>
    (mapStateToProps, { sendMessage }), withAuthRedirect)(Dialog);
