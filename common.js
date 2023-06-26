import { getToken } from "./app/utils/UserPrefs";
import { getDocument, ConvertToBase64 } from "./app/utils/DocPicker";
import { generateRandomString } from "./app/utils/Validations";
import { uploadResumeFile } from "./app/redux/actions/resumeActions";
import { directSourcingResume, parseuploadresume } from "./app/redux/actions/resumeActions";
import { Platform } from "react-native";


export const _checkIsLoggedIn = () => {
    return getToken()
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        })
}

export const _onUploadResume = (tenant, candidateId, uploadNewResume, email) => new Promise((resolve, reject) => {
    getDocument() // Open document Picker
        .then(response => {
            const file = response[0];
            const type = file.type

            let filename = Platform.OS === 'ios' ? file.uri.replace('file:', '') : file.uri
            console.log(filename);
            ConvertToBase64(filename) // Convert the file path to base 64 format.
                .then((response) => {
                    if (type === 'application/pdf' || type === 'application/docx' || type === 'application/msword' || type === 'application/doc' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                        if (uploadNewResume) {
                            const data = {
                                email: email,
                                resumeFile: {
                                    base64: `data:${type};base64,${response}`,
                                    fileName: file.name !== undefined ? file.name : `Resume_${generateRandomString(20)}`,
                                }
                            }

                            directSourcingResume(data)
                                .then(res => {
                                    const parsingPayload = {
                                        base64: data.resumeFile.base64,
                                        filename: data.resumeFile.fileName,
                                    }
                                    console.log(parsingPayload);
                                    parseuploadresume(parsingPayload)
                                        .then(res => {
                                            console.log('[common.js] parse    Resume : ', res)
                                            const newparsedData = {
                                                fileName: file.name,
                                                parsedData: res,
                                                base64: parsingPayload.base64
                                            }
                                            resolve(newparsedData);
                                        })
                                        .catch(err => {
                                            console.log('[common.js] parsing    Resume : ', err)
                                            reject('Something went wrong');
                                        })

                                })
                                .catch(error => {
                                    console.log('[common.js] Upload Resume : ', error)
                                    reject('Something went wrong');
                                })
                        } else {
                            const data = {
                                base64: `data:${type};base64,${response}`,
                                candidateID: candidateId,
                                fileName: file.name !== undefined ? file.name : `Resume_${generateRandomString(20)}`,
                                tenant: tenant
                            }
                            uploadResumeFile(data)
                                .then(res => {
                                    console.log('[common.js] Upload Resume : ', res)
                                    resolve(res);
                                })
                                .catch(error => {
                                    console.log('[common3.js] Upload Resume : ', error)
                                    reject('Something went wrong');
                                })
                        }
                    } else {
                        reject('Wrong Format');
                    }
                })
                .catch((error) => {
                    console.log("Common3.js", error);
                    reject('Something went wrong');
                })
        })
        .catch((error) => {
            console.log('[ResumeView.js] Document : ', error);
            reject('Cancel');
        })
})