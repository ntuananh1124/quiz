import { combineReducers } from 'redux';
import LoginReducer from "./login";

const allReducers = combineReducers({
    LoginReducer,
});

export default allReducers