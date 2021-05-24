import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from '../common/Preloader/Preloader';
import { ProfileType } from "../../types/types";

type PropType = {
    profile: ProfileType | null,
    isOwner: boolean, 
    serverErrorMessage: string, 
    status: string,

    updateUserStatus: (status: string) => void,
    savePhoto: (file: any) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}

const Profile: React.FC<PropType> = (props) => {
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
            <MyPostsContainer photos={props.profile.photos} fullName={props.profile.fullName} isOwner={props.isOwner}/>
        </div>
    );
};

export default Profile;
