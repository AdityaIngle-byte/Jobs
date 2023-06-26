import { USER_PREFS, SESSION } from '../actions/actionTypes';

let initialState = {
    userPrefs: null,
    userSession: null
}


export default loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_PREFS:
            return {
                ...state,
                userPrefs: action.payload
            }
        case SESSION:
            return {
                ...state,
                userSession: action.payload
            }
    }
    return state;

}