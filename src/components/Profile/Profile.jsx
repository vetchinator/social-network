import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
