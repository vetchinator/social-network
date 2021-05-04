import { userAPI, profileAPI } from '../api/api';

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_SERVER_ERROR = "SET_SERVER_ERROR";
const CHANGE_LIKE = "CHANGE_LIKE";

let initialState = {
    posts: [
        { id: 1, message: `What Are We Building?
        In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React.
        
        You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax.
        
        We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.
        
        You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.`,
        countLike: 15, isLiked: false },
        { id: 2, message: "Hi, i'm learning React", countLike: 20, isLiked: true },
    ],
    profile: null,
    status: "",
    formServerError: null
};

//state.profilePage
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let numberId = state.posts[state.posts.length-1].id;
            let newPost = {
                id: numberId+=1,
                message: action.newPostText,
                countLike: 0,
                isLiked: false
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
        case CHANGE_LIKE: {
            return { ...state, 
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return { ...post, countLike: action.countLike, isLiked: action.isLiked };
                    }
                    return post;
                }),
            };
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
export const setLike = (id, isLiked, countLike) => ({ type: CHANGE_LIKE, id, isLiked, countLike });

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