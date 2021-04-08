import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatusWithHook';

const ProfileInfo = (props) => {
    
    if(!props.profile) {
        return <Preloader />;
    }
    return (
        <div className={s.profileInfo}>
            <div><img
                src={props.profile.photos.small}
                alt="small avatar"
            />
            </div>
            <div>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
            </div>
            <div>
                <p>{props.profile.aboutMe}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
