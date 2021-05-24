import React from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User/User';
import { UserType } from "../../types/types";
import Preloader from "../common/Preloader/Preloader";

type PropType = {
    totalCountUsers: number,
    pageSize: number,
    currentPage: number, 
    users: Array<UserType>,
    followingInProgress: Array<number>,
    isFetching: boolean,
    
    onPageChanged: (page: number) => void,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
}

const Users: React.FC<PropType> = ({totalCountUsers, pageSize, currentPage, onPageChanged, users, followingInProgress, follow, unfollow, isFetching}) => {
    return (
        <div>
            <Paginator
                totalCountItems={totalCountUsers}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {isFetching ? <Preloader /> : null}
            <div className={s.users}>
                {users.map((user) => (
                    <User key={user.id} user={user} unfollow={unfollow} follow={follow}
                    followingInProgress={followingInProgress} />
                ))}
            </div>
        </div>
    );
};

export default Users;
