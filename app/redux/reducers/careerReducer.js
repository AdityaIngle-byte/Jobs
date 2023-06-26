import { CAREER_JOBS } from "../actions/actionTypes";

const initialState = {
    careerJobsList : []
}

export default careerReducer = (state=initialState,action) => {
    switch (action.type) {
        case CAREER_JOBS:
            return {...state,careerJobsList:action.payload}
        default:
            return state;
    }
}