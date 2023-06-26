
import React, { useEffect } from 'react'
import { StyleSheet, Image, ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux'
import { images } from '../../assets/images'
import { getUserPref } from '../../utils/UserPrefs'
import { setUserPrefs } from '../../redux/actions/loginActions'

const Splash = props => {

    const dispatch = useDispatch()

    useEffect(() => {
        _navigateTo()
        return () => {

        }
    }, [])


    const _navigateTo = () => {
        // clearUserPrefs()

        setTimeout(async () => {
            const userData = await getUserPref()
            // console.log('[Splash.js]Prefs: ',userData)
            if (userData !== null) {
                const userPrefs = JSON.parse(userData)
                dispatch(setUserPrefs(userPrefs))
                props.navigation.replace('Home')
            } else {
                props.navigation.replace('Login')
            }
        }, 1000)
    }

    return (
        <ImageBackground
            source={images.splash}
            style={[styles.parent]}
            resizeMode='stretch'
        >
            <Image
                source={images.logo}
                style={styles.logoImage}
                resizeMode='contain'
            />
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        height: 172,
        width: '60%',
        marginLeft: 32,
    },
})

