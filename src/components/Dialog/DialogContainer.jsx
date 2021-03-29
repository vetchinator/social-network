import { sendMessage } from "../../redux/dialogs-reducer";
import Dialog from "./Dialog";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

export default compose(connect(mapStateToProps, { sendMessage }), withAuthRedirect)(Dialog);
