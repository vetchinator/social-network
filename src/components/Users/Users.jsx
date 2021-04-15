import React from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User/User';

const Users = (props) => {
    return (
        <div>
            <Paginator
                totalCountUsers={props.totalCountUsers}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
            />
            <div className={s.users}>
                {props.users.map((user) => (
                    <User key={user.id} user={user} unfollow={props.unfollow} follow={props.follow}
                    followingInProgress={props.followingInProgress} />
                ))}
            </div>
        </div>
    );
};

export default Users;
