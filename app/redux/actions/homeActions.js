
import AxiosBase from "../networkRequests/AxiosBase"
import { getCandidateId, getFKtenant } from "../../utils/UserPrefs"
import {
    PROFILE_PERSONAL_INFO,
    PROFILE_DESCRIPTION,
    PROFILE_SOCIAL_MEDIA,
    PROFILE_EXPERIENCES,
    PROFILE_EDUCATION,
    TENANT_DETAILS,
    CURRENT_BOTTOM_TAB,
    PROFILE_SKILLS,
    PROFILE_PREFERENCES,
} from "./actionTypes"

export const fetchCandidateDetails = () => new Promise(async (resolve, reject) => {

    const data = {
        candidateID: await getCandidateId()
    }

    AxiosBase.post("dsTalent/fetchDetailsDS", data)
        .then((response) => {
            const res = response.data;
            resolve(res);
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message);
            } else {
                reject('Something went wrong.');
            }
        })

})

export const editCandidateDetails = (data) => new Promise(async (resolve, reject) => {

    AxiosBase.post("dsTalent/editTalentDS", data)
        .then((response) => {
            const res = response.data;
            resolve(res);
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message);
            } else {
                reject('Something went wrong.');
            }
        })

})

export const setProfilePersonalInfo = (data) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_PERSONAL_INFO,
            payload: data
        })
    }
}

export const setProfileDescription = (data) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_DESCRIPTION,
            payload: data
        })
    }
}

export const setProfileSocialMedia = (data) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_SOCIAL_MEDIA,
            payload: data
        })
    }
}

export const setProfileEducation = (list) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_EDUCATION,
            payload: list
        })
    }
}


export const setProfileExperiences = (list) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_EXPERIENCES,
            payload: list
        })
    }
}

export const setProfileSkills = (data) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_SKILLS,
            payload: data
        })
    }
}

export const gettenant = (tenantId) => new Promise(async (resolve, reject) => {

    const fkId = await getFKtenant();

    const data = {
        tenantId: tenantId ? tenantId : fkId
    }

    AxiosBase.post('career/gettenant', data)
        .then(response => {
            const res = response.data;
            resolve(res)
        })
        .catch(error => {
            if (error.response.data.message) {
                reject(error.response.data.message);
            } else {
                reject('Something went wrong.');
            }
        })
})

export const setTenantDetails = (data) => {
    return async (dispatch) => {
        dispatch({
            type: TENANT_DETAILS,
            payload: data
        })
    }
}

export const getResumeTC = (candidateID, tenant) => new Promise(async (resolve, reject) => {

    const data = {
        candidateID,
        tenant
    }

    AxiosBase.post("dsTalent/getResumeTC", data)
        .then((response) => {
            const res = response.data;
            resolve(res);
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message);
            } else {
                reject('Something went wrong.');
            }
        })

})

export const setBottomTab = (data) => {
    return async dispatch => {
        dispatch({
            type: CURRENT_BOTTOM_TAB,
            payload: data
        })
    }
}

export const setPreferences = (data) => {
    return async dispatch => {
        dispatch({
            type: PROFILE_PREFERENCES,
            payload: data
        })
    }
}