import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />;
    }
    return (
        <div className={s.profile}>
            <ProfileInfo
                saveProfile={props.saveProfile}
                savePhoto={props.savePhoto}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
                serverErrorMessage={props.serverErrorMessage}
            />
            <MyPosts setLike={props.setLike} addPost={props.addPost} posts={props.posts} newPostText={props.newPostText} photo={props.profile.photos.small} fullName={props.profile.fullName}  />
        </div>
    );
};

export default Profile;
