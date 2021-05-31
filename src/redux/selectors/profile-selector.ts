import { RootState } from '../redux-store';

export const getUserProfile = (state: RootState) => {
    return state.profilePage.profile;
}

export const getUserStatus = (state: RootState) => {
    return state.profilePage.status;
}

export const getUserPosts = (state: RootState) => {
    return state.profilePage.posts;
}

export const getServerErrorMessage = (state: RootState) => {
    return state.profilePage.serverErrorMessage;
}

export const selectPosts = (state: RootState) => {
    return state.profilePage.posts;
}

export const selectPhotoSmall = (state: RootState) => {
    if(state.profilePage.profile) {
        return state.profilePage.profile.photos.small
    }
    return null
}

export const selectFullName = (state: RootState) => {
    if(state.profilePage.profile) {
        return state.profilePage.profile.fullName
    }
    return null
}