import { RootState } from '../redux-store';

export const selectMessages = (state: RootState) => {
    return state.chat.messages;
}

export const selectStatusChat = (state: RootState) => {
    return state.chat.status;
}

