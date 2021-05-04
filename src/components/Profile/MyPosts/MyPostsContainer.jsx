import React from "react";
import { addPost } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    if (!state.profilePage.profile) {
        return {
            posts: state.profilePage.posts,
            newPostText: state.profilePage.newPostText,   
        }
    } 
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        photo: state.profilePage.profile.photos.small,
        fullName: state.profilePage.profile.fullName
    };
};

export default connect(mapStateToProps, {addPost})(MyPosts);
