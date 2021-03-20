const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuthenticated: false
};

//state.auth
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuthenticated: true
            };
        }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, login, email) => ({
    type: SET_USER_DATA,
    data: { userId, login, email },
});

export default authReducer;
