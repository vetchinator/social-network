import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
    addPost,
    setLike
} from '../../redux/profile-reducer';
import { withRouter } from "react-router-dom";
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

type OwnPropsType = {}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void, 
    getUserStatus: (userId: number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfile: (data: any) => void,
    addPost: (addPostText: string) => void,
    setLike: (postId: number, isliked: boolean, countLike: number) => void
}

type PropType = MapStateToPropsType & OwnPropsType & MapDispatchToPropsType; 


class ProfileContainer extends React.Component<PropType> {
    refreshProfile() {
        // @ts-ignore
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId;
            if (!userId) {
                // @ts-ignore
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
        // @ts-ignore
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        // @ts-ignore
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

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile, addPost, setLike }),
    withRouter
)(ProfileContainer);
