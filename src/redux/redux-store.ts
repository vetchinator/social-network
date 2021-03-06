import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile/profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from './users/users-reducer';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';
import chatReducer from "./chat-reducer";


let rootReducer = combineReducers({ 
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store;

export default store;