import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatusWithHook";
import logo from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = (props) => {
    let [fileName, setfileName] = useState("Add image");
    let [editMode, setEditMode] = useState(false);

    const goToEditMode = () => {
        setEditMode(true);
    };

    const onSubmit = (data) => {
        props.saveProfile(data).then(() => {
            setEditMode(false);
        });
    };

    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
            setfileName(e.target.files[0].name);
        } else {
            setfileName("Add image");
        }
    };

    return (
        <div className={s.profileInfo}>
            <div>
                <img src={props.profile.photos.large || logo} className={s.mainPhoto} alt="avatar" />
            </div>
            {props.isOwner && (
                <div className={s.uploadFileWrapper}>
                    <input
                        type="file"
                        id="uploadFileInput"
                        className={s.uploadFileInput}
                        accept=".jpg, .jpeg, .png, .gif, .bmp"
                        onChange={onMainPhotoSelected}
                    />
                    <label className={s.uploadFileLabel} htmlFor="uploadFileInput">
                        <svg className={s.uploadFileIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M286 384h-80c-14.2 1-23-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c11.6 11.6 3.7 33.1-13.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-23-23V366c0-13.3 10.7-24 24-24h136v8c0 31 24.3 56 56 56h80c30.9 0 55-26.1 57-55v-8h135c13.3 0 24 10.6 24 24zm-124 88c0-11-9-20-19-20s-19 9-20 20 9 19 20 20 21-9 20-20zm64 0c0-12-9-20-20-20s-20 9-19 20 9 20 20 20 21-9 20-20z"></path>
                        </svg>
                        <span className={s.uploadFileText}>{fileName}</span>
                    </label>
                </div>
            )}
            <div>
                <ProfileStatus
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                    isOwner={props.isOwner}
                />
            </div>
            {editMode ? (
                <ProfileDataForm onSubmit={onSubmit} saveProfile={props.saveProfile} profile={props.profile} />
            ) : (
                <ProfileData goToEditMode={goToEditMode} isOwner={props.isOwner} profile={props.profile} />
            )}
        </div>
    );
};

const ProfileData = (props) => {
    return (
        <div className={s.profileData}>
            <div className={s.titleBlock + " " + s.lntxt}>Main information</div>
            <div>
                <span className={s.characterRow}>
                    <span className={s.titleCharacter}>Full name:</span> {props.profile.fullName}
                </span>
            </div>
            <div>
                <span className={s.characterRow}>
                    <span className={s.titleCharacter}>Looking for a job:</span>{" "}
                    {props.profile.lookingForAJob ? "yes" : "no"}
                </span>
            </div>
            <div>
                <span className={s.characterRow}>
                    <span className={s.titleCharacter}>About me:</span> {props.profile.aboutMe}
                </span>
            </div>
            <div>
                <span className={s.characterRow}>
                    <span className={s.titleCharacter}>Looking for a job description:</span>
                    {props.profile.lookingForAJobDescription}
                </span>
            </div>
            <div className={s.titleBlock + " " + s.lntxt}>Contacts</div>
            <div>
                <span className={s.characterCol}>
                    <div>
                        {Object.keys(props.profile.contacts).map((key) => {
                            return <Contact key={key} title={key} value={props.profile.contacts[key]}></Contact>;
                        })}
                    </div>
                </span>
            </div>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
        </div>
    );
};

const Contact = ({ title, value }) => {
    if (!value) {
        return null;
    }
    return (
        <div>
            <span className={s.characterRow}>
                <span className={s.titleCharacter}>{title}:</span>
                <a href={value} target="_blank" rel="noopener noreferrer">
                    {value}
                </a>
            </span>
        </div>
    );
};

export default ProfileInfo;
