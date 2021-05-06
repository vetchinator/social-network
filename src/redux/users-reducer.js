import { userAPI } from '../api/api';

const TOOGLE_FOLLOW = "users/TOOGLE_FOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_PAGE = "users/SET_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "users/TOOGLE_IS_FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS = "users/TOOGLE_IS_FOLLOWING_PROGRESS";

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
        case TOOGLE_FOLLOW: {
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: !user.followed };
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

export const toggleFollow = (userId) => ({ type: TOOGLE_FOLLOW, userId });
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

const followUnfollowFlow = async (dispatch, userId, apiMethod) => {
    dispatch(toogleFollowingProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(toggleFollow(userId));
            dispatch(toogleFollowingProgress(false, userId));
        }
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI))
    };
};

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI))
    };
};

export default usersReducer;