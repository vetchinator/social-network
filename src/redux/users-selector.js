import { createSelector } from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user => true);  
})

export const getTotalCountUsers = (state) => {
    return state.usersPage.totalCountUsers;
};
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
};