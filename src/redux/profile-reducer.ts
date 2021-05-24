import { PhotosType } from './../types/types';
import { profileAPI } from './../api/profile-api';
import { RootState, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum } from "../api/api";
import { PostType, ProfileType } from "../types/types";

export type InitialStateType = typeof initialState;

let initialState = {
    posts: [
        {
            id: 1,
            message: `What Are We Building?
        In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React.
        
        You can see what we’ll be building here: Final Result. If the code doesn’t make sense to you, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax.
        
        We recommend that you check out the tic-tac-toe game before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.
        
        You can close the tic-tac-toe game once you’re familiar with it. We’ll be starting from a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.`,
            countLike: 15,
            isLiked: false,
        },
        { id: 2, message: "Hi, i'm learning React", countLike: 20, isLiked: true },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    serverErrorMessage: "",
    newPostText: "",
};

//state.profilePage
const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            let numberId = state.posts[state.posts.length - 1].id;
            let newPost = {
                id: (numberId += 1),
                message: action.newPostText,
                countLike: 0,
                isLiked: false,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case "SET_USER_PROFILE": {
            return { ...state, profile: action.profile };
        }
        case "SET_USER_STATUS": {
            return { ...state, status: action.status };
        }
        case "SAVE_PHOTO_SUCCESS": {
            return { ...state, profile: { ...state.profile, photos: action.filePhoto } as ProfileType };
        }
        case "CHANGE_LIKE": {
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return { ...post, countLike: action.countLike, isLiked: action.isLiked };
                    }
                    return post;
                }),
            };
        }
        case "SET_SERVER_ERROR": {
            return {
                ...state,
                serverErrorMessage: action.error,
            };
        }
        default:
            return state;
    }
};

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>;

export const actions = {
    addPost: (newPostText: string) => ({ type: "ADD_POST", newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SET_USER_PROFILE", profile } as const),
    setUserStatus: (status: string) => ({ type: "SET_USER_STATUS", status } as const),
    savePhotoSuccess: (filePhoto: PhotosType) => ({ type: "SAVE_PHOTO_SUCCESS", filePhoto } as const),
    setServerError: (error: string) => ({ type: "SET_SERVER_ERROR", error } as const),
    setLike: (id: number, isLiked: boolean, countLike: number) =>
        ({ type: "CHANGE_LIKE", id, isLiked, countLike } as const),
};

export const getUserProfile =
    (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getUserProfile(userId);
        dispatch(actions.setUserProfile(data));
    };

export const getUserStatus =
    (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getUserStatus(userId);
        dispatch(actions.setUserStatus(data));
    };

export const updateUserStatus =
    (status: string): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.updateUserStatus(status);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setUserStatus(status));
        }
    };

export const savePhoto =
    (filePhoto: File): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.savePhoto(filePhoto);

        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    };

export const saveProfile =
    (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let response = await profileAPI.saveProfile(profile);

        if (response.resultCode === ResultCodeEnum.Success) {
            if (userId !==null) {
                dispatch(getUserProfile(userId));
            } else {
                throw new Error("userId can't be null")
            }
        } else {
            dispatch(actions.setServerError(response.messages[0]));
            return Promise.reject(response.messages[0]);
        }
    };

export default profileReducer;
