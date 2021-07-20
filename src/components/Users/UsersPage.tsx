import React, { useEffect } from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from './User/User';
import Preloader from "../common/Preloader/Preloader";
import { FilterType, follow, requestUsers, unfollow } from "../../redux/users/users-reducer";
import SearchUserForm from "./SearchUserForm";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalCountUsers, getUsers, getUsersFilter } from "../../redux/selectors/users-selector";
import { useHistory } from "react-router";
import * as queryString from 'querystring';

const UsersPage: React.FC = () => {

    const users = useSelector(getUsers);
    const totalCountUsers= useSelector(getTotalCountUsers);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFetching = useSelector(getIsFetching);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();
    const history = useHistory();

    type SearchType = {
        term?: string,
        friend?: string,
        page?: string
    }
    
    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as SearchType;
        
        let actualPage = currentPage;
        let actualFilter = filter;

        if(!!parsed.page) {actualPage = Number(parsed.page)};
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term };
        if(!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false};

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        const query: SearchType = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);
        history.push({
            pathname: '/users',
            search: queryString.stringify(query),
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };

    const followHandler = (userId: number) => {
        dispatch(follow(userId));
    }
    const unfollowHandler = (userId: number) => {
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
            
            <SearchUserForm onFilterChanged={onFilterChanged}/>
            <div className={s.users}>
                {users.map((user) => (
                    <User
                        key={user.id}
                        user={user}
                        unfollow={unfollowHandler}
                        follow={followHandler}
                        followingInProgress={followingInProgress}
                    />
                ))}
            </div>
            {isFetching ? <Preloader /> : null}
        </div>
    );
};

export default UsersPage;
