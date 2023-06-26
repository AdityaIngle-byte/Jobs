import { RESUME_DETAILS } from "../actions/actionTypes";

let initialState = {
    resumeDetails : [],
}

export default resumeReducer = (state=initialState,action) => {
    switch(action.type){
        case RESUME_DETAILS:
            return{
                ...state,
                resumeDetails:action.payload
            }
        default:
            return state;
    }
}