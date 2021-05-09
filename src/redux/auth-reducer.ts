import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_SERVER_ERROR = "auth/SET_SERVER_ERROR";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS";

export type InitialStateType = {
    userId: null | number,
    login: null | string,
    email: null | string,
    isAuthenticated: boolean,
    formServerError: null | string,
    captchaUrl: null | string
};

let initialState: InitialStateType = {
    userId: null,
    login: null,
    email: null,
    isAuthenticated: false,
    formServerError: null,
    captchaUrl: null
};

//state.auth
const authReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuthenticated: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuthenticated: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: { userId, login, email, isAuthenticated },
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
});

type SetServerErrorActionType = {
    type: typeof SET_SERVER_ERROR,
    error: string
}

export const setServerError = (error: string): SetServerErrorActionType => ({
    type: SET_SERVER_ERROR,
    error
});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};
export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(response.data.url));
};

export default authReducer;