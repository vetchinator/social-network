import React from "react";
import s from "./User.module.css";
import userPhoto from "./../../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../types/types";

type PropType = {
    user: UserType;
    followingInProgress: Array<number>;
    follow: (id: number) => void;
    unfollow: (id: number) => void;
};



const User: React.FC<PropType> = ({ user, followingInProgress, follow, unfollow }) => {
    return (
        <div className={s.user} key={user.id}>
            <div>
                <NavLink to={"/profile/" + user.id}>
                    <img className={s.avatar} src={user.photos.small ? user.photos.small : userPhoto} alt="avatar" />
                </NavLink>
            </div>
            <div>{user.name}</div>
            {user.followed ? (
                <button
                    disabled={followingInProgress.some((id) => id === user.id)}
                    onClick={() => {
                        unfollow(user.id);
                    }}
                >
                    Unfollow
                </button>
            ) : (
                <button
                    disabled={followingInProgress.some((id) => id === user.id)}
                    onClick={() => {
                        follow(user.id);
                    }}
                >
                    Follow
                </button>
            )}
        </div>
    );
};

export default User;
