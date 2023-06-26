
import { Platform, PermissionsAndroid } from 'react-native';
import {check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions';

export const checkCameraPermissions = () => {

    if(Platform.OS === 'ios'){
        checkIOSCameraPermission()
    }else if(Platform.OS === 'android'){

    }

}


export const checkCameraPermission = () => new Promise((resolve,reject) => {

    const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    check(permission)
      .then(result => {
          switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                resolve(0)
                break;
              case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                resolve(2)
                break;
              case RESULTS.LIMITED:
                console.log('The permission is limited: some actions are possible');
                resolve(3)
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                  resolve(1)
                  break;
              case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                resolve(4)
                break;
            }
      })
    
})



export const requestCameraPermission = () => new Promise((resolve,reject) => {

  const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

    request(permission)
        .then(result => {
            console.log('[PermissionsCheck.js] Request IOS Camera Permission : ',result)
            if(result === 'granted'){
                resolve(result)
            }else {
                reject('Error')
            }
        })
        .catch(error => {
            console.log('[PermissionsCheck.js] Request IOS Camera Permission Error : ',error)
            reject(error)
        })
})


export const checkMicrophonePermission = () => new Promise((resolve,reject) => {
  const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE
    // if(Platform.OS === 'ios'){
      check(permission)
        .then(result => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.log('This feature is not available (on this device / in this context)');
                  resolve(0)
                  break;
                case RESULTS.DENIED:
                  console.log('The permission has not been requested / is denied but requestable');
                  resolve(2)
                  break;
                case RESULTS.LIMITED:
                  console.log('The permission is limited: some actions are possible');
                  resolve(3)
                  break;
                case RESULTS.GRANTED:
                  console.log('The permission is granted');
                    resolve(1)
                    break;
                case RESULTS.BLOCKED:
                  console.log('The permission is denied and not requestable anymore');
                  resolve(4)
                  break;
              }
        })
})



export const requestMicrophonePermission = () => new Promise((resolve,reject) => {

  const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.RECORD_AUDIO : PERMISSIONS.IOS.MICROPHONE

    request(permission)
        .then(result => {
            console.log('[PermissionsCheck.js] Request IOS Microphone Permission : ',result)
            if(result === 'granted'){
                resolve(result)
            }else {
                reject('Error')
            }
            
        })
        .catch(error => {
            console.log('[PermissionsCheck.js] Request IOS Microphone Permission Error : ',error)
            reject(error)
        })
})


export const checkCameraAndMicrophonePermissions = () => new Promise((resolve,reject) => {

  const permissions = Platform.OS === 'ios' 
          ?
          [PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.MICROPHONE]
          :
          [PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.RECORD_AUDIO]


  checkMultiple(permissions)
    .then((statuses) => {
      // console.log('Camera', statuses[permissions[0]]);
      // console.log('Audio', statuses[permissions[1]]);
      // resolve(status)
      const data = {
        camera : statuses[permissions[0]] === 'granted' ? true : false,
        audio : statuses[permissions[1]] === 'granted' ? true : false,
      }

      if(data.camera && data.audio){
        resolve()
      }else{
        requestMultiple(permissions).then((statuses) => {
          resolve()
        });
      }
    })
    .catch(error => {
      reject(data)
    })
})




export const checkLocationPermissions = () => new Promise((resolve,reject) => {

  const permissions = Platform.OS === 'ios' 
          ?
          [PERMISSIONS.IOS.LOCATION_ALWAYS,PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
          :
          [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]


  checkMultiple(permissions)
    .then((statuses) => {
      const data = {
        location : statuses[permissions[0]] === 'granted' ? true : false,
        // location1 : statuses[permissions[1]] === 'granted' ? true : false,
      }

      if(data.location){
        resolve()
      }else{
        requestMultiple(permissions)
          .then((statuses) => {
            resolve()
          });
      }
    })
    .catch(error => {
      console.log('[PermissionsCheck.js] Error: ', error)
      reject(error)
    })
})



export const checkStoragePermissions = () => new Promise((resolve,reject) => {

  
  if(Platform.OS === 'android' ){
    const permissions = [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]
    checkMultiple(permissions)
      .then((statuses) => {
        const data = {
          write : statuses[permissions[0]] === 'granted' ? true : false,
        }

        if(data.write){
          resolve()
        }else{
          requestMultiple(permissions).then((statuses) => {
            resolve()
          });
        }
      })
      .catch(error => {
        reject(data)
      })
  }
  
})