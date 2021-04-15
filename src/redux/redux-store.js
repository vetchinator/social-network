import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from './users-reducer';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';


let reducers = combineReducers({ 
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;