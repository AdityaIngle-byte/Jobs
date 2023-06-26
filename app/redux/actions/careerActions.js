import AxiosBase from "../networkRequests/AxiosBase";

export const getJobs = (tenant) => new Promise((resolve, reject) => {

    const data = {
        tenantId: tenant
    }

    AxiosBase.post("career/getjobs", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const setJobs = (data) => {
    return async (dispatch) => {
        dispatch({
            type: CAREER_JOBS,
            payload: data
        })
    }
}

export const isEmailExist = (email, tenantId) => new Promise((resolve, reject) => {

    const data = {
        tenantId: tenantId,
        email: email
    }

    AxiosBase.post("checkEmail/isEmailExist", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})


export const fetchNewTalentDetails = (email, jobId) => new Promise((resolve, reject) => {

    const data = {
        email: email,
        jobId: jobId
    }

    AxiosBase.post("dsTalent/fetchNewTalentDetails", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const fetchExistingTalentFromUserIndex = (email) => new Promise((resolve, reject) => {

    const data = {
        email: email,
    }

    AxiosBase.post("dsTalent/fetchExistingTalentFromUserIndex", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const fetchRecruiterDetails = (id) => new Promise((resolve, reject) => {
    const data = {
        recruiterid: id,
    }

    AxiosBase.post("career/getrecruiterbyid", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const addDsTalent = (data) => new Promise((resolve, reject) => {

    AxiosBase.post("dsTalent/addDsTalent", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const invitedUser = (data) => new Promise((resolve, reject) => {

    AxiosBase.post("applyJob/invitedUser", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const invitedMail = (data) => new Promise((resolve, reject) => {
    AxiosBase.post("vetting/candidate/add", data)
        .then((response) => {
            const res = response.data
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})
