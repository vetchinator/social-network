import React from "react";
import { ProfileType, ContactsType } from "../../../../types/types";
import s from "./../ProfileInfo.module.css";

type PropsType = {
    profile: ProfileType,
    isOwner: boolean, 

    goToEditMode: () => void
}

const ProfileData: React.FC<PropsType> = (props) => {
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
                            return <Contact key={key} title={key} value={props.profile.contacts[key as keyof ContactsType]}></Contact>;
                        })}
                    </div>
                </span>
            </div>
            {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
        </div>
    );
};

type ContactPropType = {
    title: string,
    value: string | null,
}

const Contact: React.FC<ContactPropType>= ({ title, value }) => {
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

export default ProfileData;