import React, { ChangeEvent, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
    status: string,
    isOwner: boolean,

    updateUserStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        props.isOwner &&
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div className={s.statusWrapper}>
            {editMode ? (
                <div className={s.statusInputBlock}>
                    <input className={s.statusInput}
                        onChange={ onStatusChange }
                        autoFocus={true}
                        type="text"
                        value={ status }
                    />
                    <button onClick={ deactivateEditMode}>Save</button>
                </div>
            ) : (
                <div className={s.statusContainer} onClick={activateEditMode}>
                    <span  className={s.status} >
                        { status ? status : "status" }
                       {props.isOwner && <span className={s.helpMsg}>Click to Edit</span> } 
                    </span>
                    
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
