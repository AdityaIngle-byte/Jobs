import {
    PROFILE_PERSONAL_INFO,
    PROFILE_DESCRIPTION,
    PROFILE_SOCIAL_MEDIA,
    PROFILE_EDUCATION,
    PROFILE_EXPERIENCES,
    TENANT_DETAILS,
    CURRENT_BOTTOM_TAB,
    PROFILE_SKILLS,
    PROFILE_PREFERENCES
} from '../actions/actionTypes';

const initialState = {
    profilePersonalInfo: null,
    profileDescription: null,
    profileSocialMedia: null,
    profileSkills: null,
    profileEducation: [],
    profileExperiences: [],
    tenantDetails: [],
    currentBottomTab: 'Home',
    preferences: null,
}

export default homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_PERSONAL_INFO:
            return { ...state, profilePersonalInfo: action.payload }
        case PROFILE_DESCRIPTION:
            return { ...state, profileDescription: action.payload }
        case PROFILE_SOCIAL_MEDIA:
            return { ...state, profileSocialMedia: action.payload }
        case PROFILE_EDUCATION:
            return { ...state, profileEducation: action.payload }
        case PROFILE_EXPERIENCES:
            return { ...state, profileExperiences: action.payload }
        case PROFILE_SKILLS:
            return { ...state, profileSkills: action.payload }
        case TENANT_DETAILS:
            return { ...state, tenantDetails: action.payload }
        case CURRENT_BOTTOM_TAB:
            return { ...state, currentBottomTab: action.payload }
        case PROFILE_PREFERENCES:
            return { ...state, preferences: action.payload }
        default:
            return state;
    }
}

