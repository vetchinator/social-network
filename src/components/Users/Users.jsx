import React from "react";
import s from "./Users.module.css";
import userPhoto from "./../../assets/images/user.png";
import { NavLink } from "react-router-dom";

const Users = (props) => {
    let pageCount = Math.ceil(props.totalCountUsers / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page) => (
                    <span
                        key={page}
                        className={
                           props.currentPage === page
                                ? s.selectedPage
                                : ""
                        }
                        onClick={() => props.onPageChanged(page)}
                    >
                        {page}
                    </span>
                ))}
            </div>
            <div className={s.users}>
                {props.users.map((user) => (
                    <div className={s.user} key={user.id}>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img
                                    className={s.avatar}
                                    src={
                                        user.photos.small
                                            ? user.photos.small
                                            : userPhoto
                                    }
                                    alt="avatar"
                                />
                            </NavLink>
                        </div>
                        <div>{user.name}</div>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                        {user.followed ? (
                            <button
                                onClick={() => {
                                    props.unfollow(user.id);
                                }}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    props.follow(user.id);
                                }}
                            >
                                Follow
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
