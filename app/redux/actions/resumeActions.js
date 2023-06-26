import AxiosBase from "../networkRequests/AxiosBase";
import { RESUME_DETAILS } from "./actionTypes";

const config = {
    headers: {
        Authorization:
            `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6Im9saXZlckRAeW9wbWFpbC5jb20iLCJyb2xlIjoiUmVjcnVpdGVyIiwidGVuYW50IjoxLCJ0ZW5hbnROYW1lIjoiSHVic3BvdCIsImNhbmRpZGF0ZUlkIjoiMTI3ODA0MzA1MSIsImxhc3RMb2dJblRpbWUiOiIyMDIyLTExLTI4VDA3OjI1OjI0LjcxMFoiLCJjb25maWdUZW5hbnROYW1lIjoiSGlnaDUiLCJGS19UZW5hbnQiOjIsImNhbmRpZGF0ZU5hbWUiOiJPbGl2ZXIgRGF2aXMiLCJGS19Sb2xlIjozfSwiaWF0IjoxNjY5NjI5NjgyLCJleHAiOjE2NzIyMjE2ODI3NTF9.MWymzIjfp8Co0JGkZd5Aw3AQZuYxyEcnWFZYgvihOgk`
    }
};

export const uploadResumeFile = (data) => new Promise((resolve, reject) => {
    AxiosBase.post('career/uploadResumeDS', data)
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

export const setResumeDetails = (data) => {
    return async dispatch => {
        dispatch({
            type: RESUME_DETAILS,
            payload: data
        })
    }
}

export const deleteResumeFile = (resumeDetails, candidateId, tenant) => new Promise((resolve, reject) => {
    console.log(resumeDetails);
    const data = {
        fileName: resumeDetails[0].fileName,
        fileURL: resumeDetails[0].fileURL,
        uploadedDate: resumeDetails[0].uploadedDate,
        candidateID: candidateId,
        tenant: tenant
    }

    AxiosBase.post('mapCanData/resumeDeleteDs', data)
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

export const directSourcingResume = (data) => new Promise((resolve, reject) => {

    AxiosBase.post("career/directSourcingResume", data)
        .then((response) => {
            const res = response.data
            console.log(res);
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})

export const parseuploadresume = (data) => new Promise((resolve, reject) => {

    AxiosBase.post("talent/parseuploadresume", data, config)
        .then((response) => {
            const res = response.data
            console.log(res);
            resolve(res);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
})