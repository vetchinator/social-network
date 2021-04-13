import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if (userId) {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
        
    }

    render() {
        return <Profile {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuthenticated: state.auth.isAuthenticated,
        authorisedUserId: state.auth.userId
    };
};

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
    withRouter,
)
(ProfileContainer);
