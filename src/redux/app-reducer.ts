import { RootState } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean,
};

let initialState: InitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            };
        }
        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

type ActionTypes = InitializedSuccessActionType; 
type DispatchType = Dispatch<ActionTypes> & Dispatch<ThunkType>;
type ThunkType = ThunkAction<Promise<void> , RootState, unknown, ActionTypes >;

export const initializeApp = (): ThunkType => async (dispatch: DispatchType) => {
    await dispatch(getAuthUserData());
    await dispatch(initializedSuccess());
}

export default appReducer;