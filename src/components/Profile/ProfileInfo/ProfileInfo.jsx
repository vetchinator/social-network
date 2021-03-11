import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div className={s.profileInfo}>
            <img
                src="https://icocnews.ru/wp-content/uploads/2015/09/priroda.jpg"
                alt=""
            />
            <div>ava + description</div>
        </div>
    );
};

export default ProfileInfo;
