import React from "react";
import { actions } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { RootState } from "../../../redux/redux-store";
import { PhotosType, PostType } from "../../../types/types";

type MapStateToPropsType = {
    posts: Array<PostType>,
    newPostText: string,
    
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void,
    setLike: (id: number, isLiked: boolean, countLike: number) => void
}  

type OwnPropsType = {
    photos: PhotosType ,
    fullName: string | null,
    isOwner: boolean,
}


const mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(mapStateToProps, {
    addPost: actions.addPost,
    setLike: actions.setLike,
})(MyPosts);
