import React, { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {editMode ? (
                <div>
                    <input
                        onChange={ onStatusChange }
                        autoFocus={true}
                        onMouseLeave={ deactivateEditMode }
                        type="text"
                        value={ status }
                    />
                </div>
            ) : (
                <div>
                    <span onClick={activateEditMode}>
                        { status ? status : "changeStatus" }
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
