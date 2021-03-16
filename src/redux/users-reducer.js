const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_PAGE = 'SET_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
    users: [ ],
    totalCountUsers: 10,
    pageSize: 4,
    currentPage: 1
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
            return { ...state, users: action.users }
        }
        case SET_PAGE: {
            return { ...state, currentPage: action.pageNumber }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalCountUsers: action.usersCount }
        }
        default:
            return state;
    }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (pageNumber) => ({ type: SET_PAGE, pageNumber });
export const setTotalUsersCountAC = (usersCount) => ({ type: SET_TOTAL_USERS_COUNT, usersCount });

export default usersReducer;
