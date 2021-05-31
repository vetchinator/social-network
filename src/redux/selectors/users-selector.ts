import { RootState } from '../redux-store';
import { createSelector } from "reselect";

const getUsersSelector = (state: RootState) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user => true);  
})

export const getTotalCountUsers = (state: RootState) => {
    return state.usersPage.totalCountUsers;
};
export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize;
};
export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage;
};
export const getFollowingInProgress = (state: RootState) => {
    return state.usersPage.followingInProgress;
};
export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching;
}
export const getUsersFilter = (state: RootState) => {
    return state.usersPage.filter;
}