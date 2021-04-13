import { userAPI, profileAPI } from '../api/api';

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

let initialState = {
    posts: [
        { id: 1, message: "Hi, are you doing?", likesCount: 15 },
        { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
    profile: null,
    status: "",
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

        default:
            return state;
    }
};

export const addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status });

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

export default profileReducer;