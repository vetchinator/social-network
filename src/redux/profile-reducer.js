const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    posts: [
        { id: 1, message: "Hi, are you doing?", likesCount: 15 },
        { id: 2, message: "Hi, i'm learning React", likesCount: 20 },
    ],
    newPostText: "",
};

//state.profilePage
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0,
            };
            state.posts.push(newPost);
            state.newPostText = "";
            return state;

        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;

        default:
            return state;
    }
};

export const addPostCreator = () => ({ type: ADD_POST });
export const updateNewPostTextCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});

export default profileReducer;