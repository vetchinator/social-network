import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { PostType, ProfileType } from "../../types/types";
import { RootState } from "../../redux/redux-store";

type MapStateToPropsType = {
    profile: ProfileType | null,
    status: string,
    isAuthenticated: boolean,
    authorisedUserId: number | null,
    newPostText: string,
    posts: Array<PostType>,
    serverErrorMessage: string
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void, 
    getUserStatus: (userId: number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}

type PathParamsType = {
    userId: string,
}

type PropType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>; 

class ProfileContainer extends React.Component<PropType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
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

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        // if 
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />;
    }
}

const mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuthenticated: state.auth.isAuthenticated,
        authorisedUserId: state.auth.userId,
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.posts,
        serverErrorMessage: state.profilePage.serverErrorMessage
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter
)(ProfileContainer);
