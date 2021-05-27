import { userAPI } from '../../api/user-api';
import { InferActionsTypes, RootState } from "../redux-store";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { UserType } from "../../types/types";

let initialState = {
    users: [] as Array<UserType>,
    totalCountUsers: 10,
    pageSize: 21,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array users id
    filter: {
        term: '',
        friend: null as null | boolean  
    } 
};

export type FilterType = {
    term: string,
    friend: null | boolean
}

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'TOOGLE_FOLLOW': {
            return {
                ...state,
                users: state.users.map((user: UserType) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: (!user.followed) };
                    }
                    return user;
                }),
            };
        }
        case 'SET_USERS': {
            return { ...state, users: action.users };
        }
        case 'SET_PAGE': {
            return { ...state, currentPage: action.page };
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalCountUsers: action.usersCount };
        }
        case 'SET_FILTER': {
            return { ...state, filter: action.payload };
        }
        case 'TOOGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching };
        }
        case 'TOOGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId),
            };
        }
        default:
            return state;
    }
};

type ActionTypes = InferActionsTypes<typeof actions>;
    
type DispatchType = Dispatch<ActionTypes> & Dispatch<ThunkType>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>;

export const actions = {
    toggleFollow: (userId: number) => ({ type: "TOOGLE_FOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setFilter: (filter: FilterType) => ({ type: "SET_FILTER", payload: filter} as const),
    setCurrentPage: (page: number) => ({ type: "SET_PAGE", page } as const),
    setTotalUsersCount: (usersCount: number) =>
        ({
            type: "SET_TOTAL_USERS_COUNT",
            usersCount,
        } as const),
    toogleIsFetching: (isFetching: boolean) =>
        ({
            type: "TOOGLE_IS_FETCHING",
            isFetching,
        } as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({
            type: "TOOGLE_IS_FOLLOWING_PROGRESS",
            isFetching,
            userId,
        } as const),
};

export const requestUsers = (page: number, pageSize: number, filter: FilterType ): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setUsers([]));
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toogleIsFetching(true));
        dispatch(actions.setFilter(filter));

        let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend);

        dispatch(actions.toogleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any) => {
    dispatch(actions.toogleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actions.toggleFollow(userId));
    }
    dispatch(actions.toogleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI));
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI));
    };
};

export default usersReducer;