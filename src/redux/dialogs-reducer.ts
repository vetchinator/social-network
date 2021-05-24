import { InferActionsTypes } from './redux-store';
import { DialogItemType, MessageItemType } from "../types/types";

let initialState = {
    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Oleg" },
        { id: 3, name: "Aleksej" },
        { id: 4, name: "Svetlana" },
        { id: 5, name: "Nastya" },
    ] as Array<DialogItemType>,
    messages: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "Hi!" },
        { id: 3, message: "How are you?" },
        { id: 4, message: "I'm fine, thank you!" },
    ] as Array<MessageItemType>,
};

export type InitialStateType = typeof initialState;

//state.dialogsPage
const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType=> {
    switch (action.type) {
        case 'SN/DIALOG/SEND_MESSAGE': {
            let numberId = state.messages[state.messages.length-1].id;
            let newMessage = {
                id: (numberId += 1),
                message: action.newMessageText,
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        case 'SN/DIALOG/DELETE_MESSAGE': {
            return { ...state, messages: state.messages.filter(message => message.id !== action.messageId)}
        }

        default:
            return state;
    }
};
type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {
    sendMessage: (newMessageText: string) => ({ type: 'SN/DIALOG/SEND_MESSAGE', newMessageText } as const),
    deleteMessage: (messageId: number) => ({ type: 'SN/DIALOG/DELETE_MESSAGE', messageId } as const)
}

export default dialogsReducer;
