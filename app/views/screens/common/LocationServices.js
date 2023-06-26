
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { PermissionsAndroid,Platform,Alert } from 'react-native';
import { GOOGLE_API_KEY } from '../../../values/strings';


export const getCurrentLocation = () => new Promise(async(resolve) => {

    if(Platform.OS === 'ios'){
        Geolocation.requestAuthorization()
        getGeoLocation(resolve)
    }else{
        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "App needs access to your phone's location.",
            }
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted!!!!');
            getGeoLocation(resolve)
    
        } else {
    
            console.log('Location permission not granted!!!!');
    
        }
    }
})


export const getGeoLocation = (resolve) => {
    
    Geolocation.getCurrentPosition(
        position => {
            console.log('Location : !!!!',position);
            resolve(position)
        },
        error => {
            Alert.alert('Location Error', JSON.stringify(error.message)+'. Please turn on your GPS.')
        },
        Platform.OS == 'android'?{enableHighAccuracy: false}:{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
}





export const getAddressFromLatLong = (latitude,longitude) => new Promise((resolve,reject) => {
    const google_api = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${GOOGLE_API_KEY}`

    axios.get(google_api)
        .then(response => {
            // console.log('[LocationServices.js] Address : ',response.data.results)
            resolve(response.data.results)
        })
        .catch(error => {
            // console.log('[LocationServices.js] Address Error: ',error)
            reject(error)
        })
})



export const getSearchedLocation = (text) => new Promise((resolve,reject) => {

    const search_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${text}&key=${GOOGLE_API_KEY}`
    // const search_url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${HERE_MAP_API_KEY}&query=${text}`

    axios.get(search_url)
        .then(response => {
            // console.log('[LocationServices.js] Address : ',response.data.results)
            // resolve(response.data)
            resolve(response.data.results)
        })
        .catch(error => {
            console.log('[LocationServices.js] Address Error: ',JSON.stringify(error))
            reject(error)
        })
})



export const getFormattedAddress = (address) => {

    let addressLine2 = ''
    let city = ''
    let state = ''
    let country = ''
    let postalCode = ''
    let county = ''
    address.forEach(item => {
        let types = item.types;
        // console.log('[LocationServices.js] Formatted Address :',item,types,address)

        types.forEach(type => {

            // console.log('[LocationServices.js] Formatted Address Type:',item,types,type)
            if(type === 'locality'){
                city = item.long_name;
            }
            if(type == 'administrative_area_level_1') {
                state = item.long_name;
            }
            if(type === "country"){
                country = item.long_name;
            }
            if(type == 'postal_code') {
                postalCode = item.long_name;
            }
            if(type == 'sublocality' || type === 'neighborhood' || type === 'route') {
                addressLine2 = addressLine2 + ' ' +item.long_name;
            }else {

            }
            if(type === 'administrative_area_level_2'){
                county = item.long_name
            }
        })
   });


   const addressData = {
       addressLine2,
       city,
       state,
       postalCode,
       country,
       county
   }

//    console.log('[LocationServices.js] Formatted Address :',addressData)


   return addressData

}