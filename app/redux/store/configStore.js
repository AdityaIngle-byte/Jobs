import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux'
import thunk from "redux-thunk";
import homeReducer from "../reducers/homeReducer";
import resumeReducer from "../reducers/resumeReducer";
import loginReducer from "../reducers/loginReducer";


const rootReducer = combineReducers({
    home: homeReducer,
    resume: resumeReducer,
    loginReducer: loginReducer


})
const configStore = createStore(rootReducer, applyMiddleware(thunk));

export default configStore;
