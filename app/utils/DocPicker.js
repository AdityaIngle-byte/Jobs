import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export const getDocument = () => new Promise((resolve, reject) => {

    const types = [
        DocumentPicker.types.pdf,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx
    ]

    DocumentPicker.pick({
        type: types
    })
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })

})

export const ConvertToBase64 = (path) => {
    const result = RNFetchBlob.fs.readFile(path, 'base64')
    return result;
}