import { userAPI } from '../api/api';
import { UserType } from '../types/types';

const TOOGLE_FOLLOW = "users/TOOGLE_FOLLOW";
const SET_USERS = "users/SET-USERS";
const SET_PAGE = "users/SET_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "users/TOOGLE_IS_FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS = "users/TOOGLE_IS_FOLLOWING_PROGRESS";



let initialState = {
    users: [] as Array<UserType>,
    totalCountUsers: 10,
    pageSize: 21,
    currentPage: 1, 
    isFetching: true,
    followingInProgress: [] as Array<number> // array users id
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOOGLE_FOLLOW: {
            return {
                ...state,
                users: state.users.map((user: UserType) => {
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
type ToggleFollowActionType = {
    type: typeof TOOGLE_FOLLOW,
    userId: number
}
export const toggleFollow = (userId: number): ToggleFollowActionType => ({ type: TOOGLE_FOLLOW, userId });
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
type SetCurrentPageActionType = {
    type: typeof SET_PAGE,
    page: number
}
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_PAGE, page });
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    usersCount: number
}
export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, usersCount });
type ToogleIsFetchingActionType = {
    type: typeof TOOGLE_IS_FETCHING,
    isFetching: boolean
}
export const toogleIsFetching = (isFetching: boolean): ToogleIsFetchingActionType => ({ type: TOOGLE_IS_FETCHING, isFetching });
type ToogleFollowingProgressActionType = {
    type: typeof TOOGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toogleFollowingProgress = (isFetching: boolean, userId: number): ToogleFollowingProgressActionType => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(setCurrentPage(page));
        dispatch(toogleIsFetching(true));

        let data = await userAPI.getUsers(page, pageSize);

        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any) => {
    dispatch(toogleFollowingProgress(true, userId));
        let data = await apiMethod(userId);
        if (data.resultCode === 0) {
            dispatch(toggleFollow(userId));
            dispatch(toogleFollowingProgress(false, userId));
        }
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI))
    };
};

export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI))
    };
};

export default usersReducer;