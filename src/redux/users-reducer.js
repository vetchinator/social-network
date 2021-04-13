import { userAPI } from '../api/api';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    totalCountUsers: 10,
    pageSize: 21,
    currentPage: 1, 
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true };
                    }
                    return user;
                }),
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false };
                    }
                    return user;
                }),
            };
        }
        case SET_USERS: {
            return { ...state, users: action.users };
        }
        case SET_PAGE: {
            return { ...state, currentPage: action.page };
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalCountUsers: action.usersCount };
        }
        case TOOGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching };
        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            };
        }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (page) => ({ type: SET_PAGE, page });
export const setTotalUsersCount = (usersCount) => ({ type: SET_TOTAL_USERS_COUNT, usersCount });
export const toogleIsFetching = (isFetching) => ({ type: TOOGLE_IS_FETCHING, isFetching });
export const toogleFollowingProgress = (isFetching, userId) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(toogleIsFetching(true));

        let data = await userAPI.getUsers(page, pageSize);

        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

export const follow = (userId) => {
    return async (dispatch) => {
        dispatch(toogleFollowingProgress(true, userId));
        let data = await userAPI.followUser(userId);
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
            dispatch(toogleFollowingProgress(false, userId));
        }
    };
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        dispatch(toogleFollowingProgress(true, userId));
        let data = await userAPI.unfollowUser(userId);
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
            dispatch(toogleFollowingProgress(false, userId));
        }
    };
};

export default usersReducer;