import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
    
    if(!props.profile) {
        return <Preloader />;
    }

    return (
        <div className={s.profileInfo}>
            <img
                src="https://icocnews.ru/wp-content/uploads/2015/09/priroda.jpg"
                alt=""
            />
            <div><img
                src={props.profile.photos.small}
                alt=""
            />
            </div>
            <div>
                <p>{props.profile.aboutMe}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
