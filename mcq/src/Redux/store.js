import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './AuthReducer/authReducer';
import { AppReducer } from './AppReducer/appReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer=combineReducers({
  AuthReducer,
  AppReducer
})


export const store=createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));