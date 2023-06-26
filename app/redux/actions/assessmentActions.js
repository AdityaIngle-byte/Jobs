import AxiosBase from "../networkRequests/AxiosBase"
import { getCandidateId } from "../../utils/UserPrefs"

export const fetchCandidateVettingDetails = (email) => new Promise(async (resolve, reject) => {
    const data = {
        high5hireCandidateId: await getCandidateId(),
        email: email
    }

    AxiosBase.post('vetting/candidate/high5hire', data)
        .then((response) => {
            const res = response.data;
            resolve(res);
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message)
            } else {
                reject('Something went wrong.')
            }
        })

})

export const getResultList = (data) => new Promise(async (resolve, reject) => {

    AxiosBase.post('vetting/result/list', data)
        .then((response) => {
            const res = response.data;
            resolve(res);
        })
        .catch((error) => {
            if (error.response.data.message) {
                reject(error.response.data.message)
            } else {
                reject('Something went wrong.')
            }
        })

})






//  testAssign.testName : 'Python'
// jobTitle : 'Selenium Developer'