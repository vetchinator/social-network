import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { userAPI } from "../../api/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        userAPI.getUserProfile(userId).then((data) => {
            this.props.setUserProfile(data);
        });
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} />;
    }
}

let withUrlDataProfileContainer = withRouter(ProfileContainer);

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    };
};

export default connect(mapStateToProps, { setUserProfile })(
    withUrlDataProfileContainer
);
