import { RootState } from '../redux-store';

export const selectIsInitialized = (state: RootState) => {
    return state.app.initialized;
}