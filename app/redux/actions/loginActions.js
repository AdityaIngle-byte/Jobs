import AxiosBase from "../networkRequests/AxiosBase";
import { saveToken, saveUserPref, saveFKtenant } from "../../utils/UserPrefs";
import { USER_PREFS, SESSION } from "./actionTypes";

export const loginUser = (userName, password) => new Promise((resolve, reject) => {

    const data = {
        userName: userName,
        password: password
    }

    AxiosBase.post("candidateLogin/", data)
        .then((response) => {
            const res = response.data;
            console.log('Login Response');
            console.log(res);
            saveUserPref(res);
            saveToken(res.token);
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

export const findTenantid = (email) => new Promise((resolve, reject) => {

    const data = {
        userName: email,
    }

    AxiosBase.post('login/findTenantid/', data)
        .then(response => {
            const res = response.data;
            saveFKtenant(res.fk_tenant);  //{fk_tenant: 1} This will be saved
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

export const forgotPassword = (email, tenantId, tenantName) => new Promise((resolve, reject) => {

    const data = {
        email,
        tenantId,
        tenantName
    }

    AxiosBase.post('forgotpassword/candidate', data)
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

export const setUserPrefs = (data) => {
    return async dispatch => {
        dispatch({
            type: USER_PREFS,
            payload: data
        })
    }
}

export const setSessionDetails = (data) => {
    return async dispatch => {
        dispatch({
            type: SESSION,
            payload: data
        })
    }
}