import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = "SET_USER_DATA";
const SET_SERVER_ERROR = "SET_SERVER_ERROR";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuthenticated: false,
    formServerError: null,
    captchaUrl: null
};

//state.auth
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAPTCHA_URL_SUCCESS:
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload,
            };
        case SET_SERVER_ERROR: 
            return {
                ...state,
                formServerError: action.error,
            };
        default:
            return state;
    }
};

export const setAuthUserData = (userId, login, email, isAuthenticated) => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuthenticated },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

export const setServerError = (error) => ({
    type: SET_SERVER_ERROR,
    error
});

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        dispatch(setServerError(response.data.messages[0]));
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(response.data.url));
};

export default authReducer;