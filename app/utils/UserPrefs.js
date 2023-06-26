
import AsyncStorage from '@react-native-community/async-storage';

const REMEMBER_ME = 'REMEMBER_ME'
const USER_PREFS = 'USER_PREFS'
const TOKEN = 'TOKEN'
const FKTENANT = 'FKTENANT'


export const saveUserPref = (data) => {
  try {
    AsyncStorage.setItem(USER_PREFS, JSON.stringify(data))
    // console.log('[UserPrefs.js] save User prefs :',data)
  } catch (error) {
    console.log('Error while saving user : ', error)
  }
}

export const getUserPref = () => {
  try {
    const value = AsyncStorage.getItem(USER_PREFS)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log('Error while Get User : ', e)
  }
}

export const getCandidateId = async () => {
  try {
    const value = await AsyncStorage.getItem(USER_PREFS)
    if (value !== null) {
      const user = JSON.parse(value)
      return user.userId
    }
  } catch (e) {
    console.log('Error while Get User : ', e)
  }
}


export const saveToken = (token) => {
  try {
    AsyncStorage.setItem(TOKEN, token)
  } catch (error) {
    console.log('Error while saving token : ', error)
  }
}


export const getToken = () => {
  try {
    const value = AsyncStorage.getItem(TOKEN)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log('Error while Get token : ', e)
  }
}

export const saveFKtenant = (id) => {
  try {
    AsyncStorage.setItem(FKTENANT, JSON.stringify(id))
  } catch (error) {
    console.log('Error while saving FKTENANT : ', error)
  }
}

export const getFKtenant = async () => {
  try {
    const value = await AsyncStorage.getItem(FKTENANT)
    if (value !== null) {
      const fk = JSON.parse(value)
      return fk
    }
  } catch (e) {
    console.log('Error while Get FKTENANT : ', e)
  }
}


export const setRememberMe = (data) => {
  try {
    AsyncStorage.setItem(REMEMBER_ME, data)
    console.log('Saved Remember Done.')
  } catch (error) {
    console.log('Error while set Remember Me : ', error)
  }
}

export const clearRememberMe = () => {
  try {
    AsyncStorage.removeItem(REMEMBER_ME)
    console.log('Clear Remember Done.')
  } catch (e) {
    console.log('Error while Remove Remember Me : ', e)
  }
}


export const getRememberMe = () => {
  try {
    const value = AsyncStorage.getItem(REMEMBER_ME)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.log('Error while Get Remember Me : ', e)
  }
}


export const clearUserPrefs = async () => {
  try {
    // await AsyncStorage.clear()
    await AsyncStorage.removeItem(USER_PREFS)
    await AsyncStorage.removeItem(TOKEN)
  } catch (e) {
    console.log('[user Prefs] Clear Prefs Error', e)
  }
  console.log('[user Prefs] Clear Prefs Done')
}

