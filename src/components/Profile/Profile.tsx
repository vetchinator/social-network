import React from "react";
import { MyPosts } from "./MyPosts/MyPosts";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from '../common/Preloader/Preloader';
import { useSelector } from "react-redux";
import { getUserProfile } from "../../redux/selectors/profile-selector";

type PropType = {
    isOwner: boolean, 
}

const Profile: React.FC<PropType> = (props) => {

    const profile = useSelector(getUserProfile);

    if (!profile) {
        return <Preloader />;
    } 
    return (
        <div className={s.profile}>
            <ProfileInfo
                profile={profile}
                isOwner={props.isOwner}
            />
            <MyPosts isOwner={props.isOwner}/>
        </div>
    );
};

export default Profile;
