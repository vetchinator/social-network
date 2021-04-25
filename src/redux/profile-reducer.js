import { userAPI, profileAPI } from '../api/api';

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_SERVER_ERROR = "SET_SERVER_ERROR";

let initialState = {
    posts: [
        { id: 1, message: "Hi, are you doing?", likesCount: 15 },
        { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
    profile: null,
    status: "",
    formServerError: null
};

//state.profilePage
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status };
        }
        case SAVE_PHOTO_SUCCESS: {
            return { ...state, profile: {...state.profile, photos: action.filePhoto} };
        }
        case SET_SERVER_ERROR: {
            return {
                ...state,
                formServerError: action.error,
            }
        }
        default:
            return state;
    }
};

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });
export const savePhotoSuccess = (filePhoto) => ({ type: SAVE_PHOTO_SUCCESS, filePhoto });
export const setServerError = (error) => ({ type: SET_SERVER_ERROR, error });

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await userAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
};

export const getUserStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateUserStatus(status);
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};
export const savePhoto = (filePhoto) => async (dispatch) => {
    let response = await profileAPI.savePhoto(filePhoto);

    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);

    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(setServerError(response.messages[0])); 
        return Promise.reject(response.messages[0]); 
    }
};

export default profileReducer;