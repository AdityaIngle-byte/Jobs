import { getCandidateId } from "../../utils/UserPrefs"
import AxiosBase from "../networkRequests/AxiosBase"
import { domain } from "../networkRequests/networkConstants"

const config = {
    headers: {
        Authorization:
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6Im9saXZlckRAeW9wbWFpbC5jb20iLCJyb2xlIjoiUmVjcnVpdGVyIiwidGVuYW50IjoxLCJ0ZW5hbnROYW1lIjoiSHVic3BvdCIsImNhbmRpZGF0ZUlkIjoiMTI3ODA0MzA1MSIsImxhc3RMb2dJblRpbWUiOiIyMDIyLTExLTI4VDA3OjI1OjI0LjcxMFoiLCJjb25maWdUZW5hbnROYW1lIjoiSGlnaDUiLCJGS19UZW5hbnQiOjIsImNhbmRpZGF0ZU5hbWUiOiJPbGl2ZXIgRGF2aXMiLCJGS19Sb2xlIjozfSwiaWF0IjoxNjY5NjI5NjgyLCJleHAiOjE2NzIyMjE2ODI3NTF9.MWymzIjfp8Co0JGkZd5Aw3AQZuYxyEcnWFZYgvihOgk`
    }
};


export const fetchJobApplications = () => new Promise(async (resolve, reject) => {

    const data = {
        candidateId: await getCandidateId()
    }

    AxiosBase.post("mapCanData/searchJobbyCanId", data)
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

export const fetchJobDescription = (jobId) => new Promise((resolve, reject) => {

    const data = {
        "domain": domain,
        "jobId": jobId
    }

    AxiosBase.post('career/getrequestdetailsbyIdDS', data)
        .then((response) => {
            const res = response.data;
            resolve(res)
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message)
            } else {
                reject('Something went wrong.')
            }
        })
})

export const getJobsForCandidate = (email) => new Promise((resolve, reject) => {

    const data = {
        email: email
    }

    AxiosBase.post("career/getJobsForCandidate", data)
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

export const getAutomatchedJobs = (email) => new Promise(async (resolve, reject) => {
    const data = {
        candidateId: await getCandidateId(),
        email: email
    }

    AxiosBase.post("requestlist/getrequestslistbycandidateid", data, config)
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



