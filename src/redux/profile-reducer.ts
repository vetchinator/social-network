import { userAPI, profileAPI } from '../api/api';
import { PostType, ProfileType } from '../types/types';

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";
const SET_SERVER_ERROR = "profile/SET_SERVER_ERROR";
const CHANGE_LIKE = "profile/CHANGE_LIKE";



export type InitialStateType = typeof initialState;

let initialState = {
    posts: [
        { id: 1, message: `What Are We Building?
        In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React.
        
        You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax.
        
        We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.
        
        You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.`,
        countLike: 15, isLiked: false },
        { id: 2, message: "Hi, i'm learning React", countLike: 20, isLiked: true },
    ] as Array<PostType> ,
    profile: null as ProfileType | null,
    status: "",
    serverErrorMessage: "",
};

//state.profilePage
const profileReducer = (state = initialState, action: any): InitialStateType => {
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
            return { ...state, profile: {...state.profile, photos: action.filePhoto} as ProfileType };
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
                serverErrorMessage: action.error,
            }
        }
        default:
            return state;
    }
};
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText });
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status });
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    filePhoto: any
}
export const savePhotoSuccess = (filePhoto: any): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, filePhoto });
type SetServerErrorActionType = {
    type: typeof SET_SERVER_ERROR,
    error: string
}
export const setServerError = (error: string): SetServerErrorActionType => ({ type: SET_SERVER_ERROR, error });
type SetLiketActionType = {
    type: typeof CHANGE_LIKE,
    id: number,
    isLiked: boolean,
    countLike: number
}
export const setLike = (id: number, isLiked: boolean, countLike: number): SetLiketActionType => ({ type: CHANGE_LIKE, id, isLiked, countLike });

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let data = await userAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(data));
};

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let data = await profileAPI.updateUserStatus(status);
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};
export const savePhoto = (filePhoto: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(filePhoto);

    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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