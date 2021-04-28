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
                        <div >
                            {Object.keys(props.profile.contacts).map((key) => {
                                return <Contact key={key} title={key} value={props.profile.contacts[key]}></Contact>;
                            })}
                        </div>
                    </span>
                </div>
                {props.isOwner && <button onClick={props.goToEditMode}>Edit</button> }
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
                <a href={value} target='_blank' rel="noopener noreferrer">{value}</a>    
            </span>
                
        </div>
    );
};

export default ProfileInfo;
