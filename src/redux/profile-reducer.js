import { userAPI } from '../api/api';

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        { id: 1, message: "Hi, are you doing?", likesCount: 15 },
        { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
    newPostText: "",
    profile: null,
};

//state.profilePage
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };
        }

        case UPDATE_NEW_POST_TEXT: {
            return { ...state, newPostText: action.newText };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }

        default:
            return state;
    }
};

export const addPost = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const updateNewPostText = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        userAPI.getUserProfile(userId).then((data) => {
            dispatch(setUserProfile(data));
        }); 
    }
}

export default profileReducer;
