import React, { useEffect } from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User/User';
import Preloader from "../common/Preloader/Preloader";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users/users-reducer";
import SearchUserForm from "./SearchUserForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalCountUsers, getUsers, getUsersFilter } from "../../redux/users-selector";



const UsersPage: React.FC = () => {

    const users = useSelector(getUsers);
    const totalCountUsers= useSelector(getTotalCountUsers);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFetching = useSelector(getIsFetching);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const followUser = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }

    return (
        <div>
            <Paginator
                totalCountItems={totalCountUsers}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />
            {isFetching ? <Preloader /> : null}
            <SearchUserForm onFilterChanged={onFilterChanged}/>
            <div className={s.users}>
                {users.map((user) => (
                    <User
                        key={user.id}
                        user={user}
                        unfollow={unfollowUser}
                        follow={followUser}
                        followingInProgress={followingInProgress}
                    />
                ))}
            </div>
        </div>
    );
};

export default UsersPage;
