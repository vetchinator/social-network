import { InferActionsTypes } from "./redux-store";

let initialState = {};

export type InitialStateType = typeof initialState; 

type ActionTypes = InferActionsTypes<typeof actions>;

export const actions = {};

const sidebarReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    return state;
};

export default sidebarReducer;
