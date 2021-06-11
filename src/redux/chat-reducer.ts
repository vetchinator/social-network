import { ChatMessageAPIType, chatAPI, StatusType } from './../api/chat-api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import { InferActionsTypes, RootState } from './redux-store';
import {v1} from 'uuid';

type ActionTypes = InferActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionTypes> & Dispatch<ThunkType>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionTypes>;
export type ChatMessageType = ChatMessageAPIType &  {id: string} ;

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'sn/chat/MESSAGES_RECEIVED': {
            return { ...state, messages: [...state.messages, ...action.payload.messages.map((m) => ({...m, id: v1()}))]
                .filter((m,idx ,arr) => () => arr.length - 100) };
        }
        case 'sn/chat/STATUS_CHANGED': {
            return { ...state, status: action.payload.status };
        }
        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: "sn/chat/MESSAGES_RECEIVED", payload: { messages} } as const),
    statusChanged: (status: StatusType) => ({ type: "sn/chat/STATUS_CHANGED", payload: { status} } as const),
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
let newMessageHandlerCreator = (dispatch: DispatchType) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
       }
    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
let statusChangedHandlerCreator = (dispatch: DispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
       }
    }
    return _statusChangedHandler
}

export const startMessageListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const stopMessageListening = (): ThunkType => async (dispatch) => {
    chatAPI.stop();
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
};

export default chatReducer;