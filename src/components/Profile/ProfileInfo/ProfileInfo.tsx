import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatusWithHook";
import logo from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import { ProfileType } from "../../../types/types";
import ProfileData from "./profileData/ProfileData";
import { useDispatch, useSelector } from "react-redux";
import { savePhoto, saveProfile, updateUserStatus } from "../../../redux/profile/profile-reducer";
import { getServerErrorMessage, getUserStatus } from "../../../redux/selectors/profile-selector";

type PropType = {
    profile: ProfileType,
    isOwner: boolean
};

const ProfileInfo: React.FC<PropType> = (props) => {

    let [fileName, setfileName] = useState("Add image");
    let [editMode, setEditMode] = useState(false);

    const status = useSelector(getUserStatus);
    const serverErrorMessage = useSelector(getServerErrorMessage);


    const dispatch = useDispatch();

    const saveProfileUser = (profile: ProfileType) => {
        dispatch(saveProfile(profile));
    }  
    const savePhotoUser = (file: File) => {
        dispatch(savePhoto(file));
    }
    
    const updateUserStatusHandler = (status: string) => {
        dispatch(updateUserStatus(status));
    }

    const goToEditMode = () => {
        setEditMode(true);
    };

    const onSubmit = async (data: ProfileType) => {
        await saveProfileUser(data);
        setEditMode(false);
    };

    let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhotoUser(e.target.files[0]);
            setfileName(e.target.files[0].name);
        } else {
            setfileName("Add image");
        }
    };

    const imgSrc: string = (props.profile === null) ? logo : (props.profile.photos.large === null) ? logo : props.profile.photos.large;
    
    return (
        <div className={s.profileInfo}>
            <div>
                <img src={ imgSrc } className={s.mainPhoto} alt="avatar" />
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
                    status={status}
                    updateUserStatus={updateUserStatusHandler}
                    isOwner={props.isOwner}
                />
            </div>
            {editMode ? (
                <ProfileDataForm
                    serverErrorMessage={serverErrorMessage}
                    onSubmit={onSubmit}
                    profile={props.profile}
                />
            ) : (
                <ProfileData goToEditMode={goToEditMode} isOwner={props.isOwner} profile={props.profile} />
            )}
        </div>
    );
};

export default ProfileInfo;
