import React from "react";
import { addPost } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    };
};

export default connect(mapStateToProps, {addPost})(MyPosts);
