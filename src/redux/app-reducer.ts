import { RootState, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer';

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void> , RootState, unknown, ActionTypes >;

export const actions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData());
    await dispatch(actions.initializedSuccess());
}

export default appReducer;