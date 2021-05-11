import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { DialogItemType, MessageItemType } from "../types/types";

const SEND_MESSAGE = "dialog/SEND-MESSAGE";
const DELETE_MESSAGE = "dialog/DELETE_MESSAGE";



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
const dialogsReducer = (state = initialState, action: any): InitialStateType=> {
    switch (action.type) {
        case SEND_MESSAGE: {
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
        case DELETE_MESSAGE: {
            return { ...state, messages: state.messages.filter(message => message.id !== action.messageId)}
        }

        default:
            return state;
    }
};

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string
}
type DeleteMessageActionType = {
    type: typeof DELETE_MESSAGE,
    messageId: number
}

export const sendMessage = (newMessageText: string): SendMessageActionType => ({ type: SEND_MESSAGE, newMessageText });
export const deleteMessage = (messageId: number): DeleteMessageActionType => ({ type: DELETE_MESSAGE, messageId });

export default dialogsReducer;
