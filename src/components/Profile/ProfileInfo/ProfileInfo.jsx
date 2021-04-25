import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHook";
import logo from "../../../assets/images/user.png";
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onSubmit = (data) => {
        props.saveProfile(data).then(
            () => {
                setEditMode(false);
            }
        );
    };

    if (!props.profile) {
        return <Preloader />;
    }

    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={s.profileInfo}>
            <div>
                <img src={props.profile.photos.large || logo} className={s.mainPhoto} alt="avatar" />
            </div>
            <div>{props.isOwner && <input onChange={onMainPhotoSelected} type={"file"} />}</div>
            <div>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
            </div>
            {editMode ? (<ProfileDataForm onSubmit={onSubmit} saveProfile={props.saveProfile} profile={props.profile} />) 
            : (<ProfileData goToEditMode={goToEditMode} isOwner={props.isOwner} profile={props.profile} />)}
        </div>
    );
};

const ProfileData = (props) => {
    return (
        <div>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button> }
                <div>
                    <span>
                        <span className={s.titleCharacter}>fullName</span>: {props.profile.fullName}
                    </span>
                </div>
                <div>
                    <span>
                        <span className={s.titleCharacter}>lookingForAJob</span>:{" "}
                        {props.profile.lookingForAJob ? "yes" : "no"}
                    </span>
                </div>
                <div>
                    <span>
                        <span className={s.titleCharacter}>about me</span>: {props.profile.aboutMe}
                    </span>
                </div>
                <div>
                    <span>
                        <span className={s.titleCharacter}>lookingForAJobDescription</span>:{" "}
                        {props.profile.lookingForAJobDescription}
                    </span>
                </div>
                <div>
                    <span>
                        <span className={s.titleCharacter}>contacts</span>:
                        {Object.keys(props.profile.contacts).map((key) => {
                            return <Contact key={key} title={key} value={props.profile.contacts[key]}></Contact>;
                        })}
                    </span>
                </div>
            </div>
    );
};

const Contact = ({ title, value }) => {
    if (!value) {
        return null;
    }
    return (
        <div className={s.contact}>
            {title} :  <a href={value} target='_blank' rel="noopener noreferrer">{value}</a>
        </div>
    );
};

export default ProfileInfo;
