import { RootState } from '../redux-store';

export const selectIsAuth = (state: RootState) => {
    return state.auth.isAuthenticated;
}

export const selectAuthorisedUserId = (state: RootState) => {
    return state.auth.userId;
}

export const selectAuthorisedLogin = (state: RootState) => {
    return state.auth.login;
}


