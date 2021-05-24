import { securityAPI } from "./../api/security-api";
import { authAPI } from "./../api/auth-api";
import { InferActionsTypes, RootState } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum, ResultCodeForCapture } from "../api/api";

export type InitialStateType = typeof initialState;

let initialState = {
    userId: null as (null | number),
    login: null as null | string,
    email: null as null | string,
    isAuthenticated: false,
    formServerError: null as null | string,
    captchaUrl: null as null | string,
};

//state.auth
const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            };
        case 'SN/AUTH/SET_SERVER_ERROR':
            return {
                ...state,
                formServerError: action.error,
            };
        default:
            return state;
    }
};

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>;

export const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuthenticated: boolean) =>
        ({ type: 'SN/AUTH/SET_USER_DATA', payload: { userId, login, email, isAuthenticated } } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const),

    setServerError: (error: string) => ({ type: 'SN/AUTH/SET_SERVER_ERROR', error } as const)
}; 

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
    }
};

export const login =
    (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCapture.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            dispatch(actions.setServerError(data.messages[0]));
        }
    };

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(actions.getCaptchaUrlSuccess(data.url));
};

export default authReducer;
