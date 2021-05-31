import { RootState } from '../redux-store';

export const selectDialogs = (state: RootState) => {
    return state.dialogsPage.dialogs;
};

export const selectMessages = (state: RootState) => {
    return state.dialogsPage.messages;
};
