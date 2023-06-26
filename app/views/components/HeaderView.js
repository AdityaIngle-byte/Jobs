import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images } from '../../assets/images';
import { showConfirmAlert } from '../../utils/Message';
import { clearUserPrefs, getFKtenant } from '../../utils/UserPrefs';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import generateRandomColor from '../../utils/RandomColor';
import TagButton from './TagButton';
import MenuView from './MenuView';
// import {useSelector} from 'react-redux'

const HeaderView = props => {

    const {
        parentStyle,
        hasProfileIcon,
        hasHigh5Logo,
        hasMenu, onMenuPress,
        hasLogout,
        hasBack, onBackPress,
        title,
        hasSearchBar, onChangeSearch,
        hasNotification, onNotificationPress,
        hasPreferences, onPreferences,
        hasInfo, onInfoPress,
        hasSettings, onSettingsPress,
        hasFaq, onFaq,
        hasTitle,
        hasLogin, onLogin,
        hasHigh5LogoRight,
        hasDrawerIcon,
        hasMenuView,
        route
    } = props;


    const _onLogout = () => {

        showConfirmAlert(
            'Logout',
            'Are you sure you want to log out?',
            async () => {
                clearUserPrefs();
                const tenant = await getFKtenant();
                console.log(props);
                if (route.name == 'JobDescription')
                    props.navigation.goBack();
                props.navigation.replace('CareerPage', { tenant: tenant })
            }
        );
    }

    return (
        <View style={[styles.parent, parentStyle]}>
            {
                hasMenu
                &&
                <TouchableOpacity
                    style={styles.headerView}
                    onPress={onMenuPress}>
                    <Image
                        styles={styles.menuIcon}
                        source={images.menuIcon}
                    // resizeMode='contain'
                    />
                </TouchableOpacity>
            }
            {
                hasDrawerIcon
                &&
                <TouchableOpacity
                    style={styles.headerView}
                    onPress={onMenuPress}>
                    <Icon
                        name={'log-out'}
                        type={'feather'}
                        color={'#fff'}
                        size={20}
                    />
                </TouchableOpacity>
            }
            {
                hasLogout
                &&
                <TouchableOpacity
                    style={styles.headerView}
                    onPress={() => _onLogout()}>
                    <Icon
                        name={'log-out'}
                        type={'feather'}
                        color={'#fff'}
                        size={20}
                    />
                </TouchableOpacity>
            }
            {
                hasHigh5Logo
                &&
                <View
                    style={[styles.headerView, { padding: 0 }]}
                >
                    <View style={styles.profileCircle}>
                        <Image
                            source={images.high5logo}
                            style={styles.logoImage}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            }
            {
                hasBack
                &&
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.backButtonStyle}
                        onPress={onBackPress}>
                        <AntDesign
                            name='arrowleft'
                            color={colors.black}
                            size={25}
                            style={{ margin: 5, padding: 5 }}
                        />
                    </TouchableOpacity>
                </View>
            }
            {
                hasSearchBar
                &&
                // <View style={{position:"absolute",flex:1,justifyContent:"center",paddingRight:40,alignItems:"center",borderWidth:1}}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('SearchView') }} style={{ flexDirection: "row", flex: 1, justifyContent: "center", position: "absolute", zIndex: 300, paddingRight: 40 }}>
                    <Icon
                        name={'search'}
                        type={'fontawesome'}
                        color={'#fff'}
                        size={20}
                        style={{ margin: 10, paddingTop: 5 }}
                    />
                    <TextInput editable={false} placeholder='Search Jobs' placeholderTextColor='white' />
                </TouchableOpacity>
                // </View>

            }
            {
                hasTitle &&
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", position: "absolute", zIndex: 300, top: 20 }}>
                    <Text
                        style={styles.titleStyle}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >{title}</Text>
                </View>

            }

            <View style={styles.rightComponent}>
                {
                    hasFaq
                    &&
                    <TouchableOpacity
                        style={styles.notificationView}
                        onPress={() => props.navigation.navigate('Faqs')}>
                        <View style={styles.iconView}>

                            <Icon
                                name={'life-buoy'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {/* {
                    hasNotification
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={onNotificationPress}>
                        <View style={styles.iconView}>
                            <View style={styles.badge}/>
                            <Icon 
                                name={'bell'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                } */}
                {
                    hasInfo
                    &&
                    <TouchableOpacity
                        style={styles.notificationView}
                        onPress={onInfoPress}>
                        <View style={styles.iconView}>
                            <Icon
                                name={'info'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {
                    hasSettings
                    &&
                    <TouchableOpacity
                        style={styles.notificationView}
                        onPress={onSettingsPress}>
                        <View style={styles.iconView}>
                            <Icon
                                name={'settings'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {
                    hasPreferences
                    &&
                    <TouchableOpacity
                        style={styles.notificationView}
                        onPress={onPreferences}>
                        <View style={styles.iconView}>

                            <Icon
                                name={'sliders'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {
                    hasLogin
                    &&
                    <TagButton
                        title={'Login'}
                        onPress={onLogin}
                        buttonStyle={{ backgroundColor: colors.acceptBtn, borderColor: colors.acceptBtn }}
                        titleStyle={{ color: '#fff' }}
                        size={'large'}
                    // containerStyle={{marginTop:0}}

                    />
                }
                {
                    hasHigh5LogoRight
                    &&
                    <Image
                        source={images.high5logo}
                        style={styles.logoImage}
                        resizeMode='contain'
                    />
                }

                {
                    hasMenuView
                    &&
                    <View style={{ margin: 10, marginTop: 15 }}>
                        <MenuView
                            _onLogout={_onLogout}
                        />
                    </View>
                }

                {

                    props.rightComponent
                }


            </View>
        </View>
    )
}

export default HeaderView

const styles = StyleSheet.create({
    parent: {
        height: 56,
        // backgroundColor: colors.accent,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "center",
        // paddingHorizontal:12,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    headerView: {
        // position: 'absolute',
        paddingTop: 4,
        flex: 1,
    },
    backButtonStyle: {
        alignSelf: "flex-start",
        paddingLeft: 8,
    },
    menuIcon: {
        height: 40,
        width: 40,
        // padding:8
        // tintColor:colors.accent
    },
    titleStyle: {
        flex: 1,
        color: colors.black,
        textAlign: 'center',
        fontSize: 16,
        // fontFamily:fonts.notoSansMedium,
        paddingHorizontal: 24,
        fontWeight: '600'
    },
    badge: {
        position: 'absolute',
        right: 8, top: 8,
        backgroundColor: colors.primary,
        height: 8,
        width: 8,
        borderRadius: 4,
        zIndex: 100,
    },
    rightComponent: {
        // position: 'absolute',
        // padding:12,
        // right:0,
        // flex:1,
        justifyContent: 'flex-end',
        zIndex: 100,
        flexDirection: 'row',
    },
    notificationView: {
    },
    iconView: {
        padding: 12
    },
    profileCircle: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 10,
    },
    logoImage: {
        height: 25,
        width: 80
    },
    roundInitialText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },
    loginButton: {
        backgroundColor: "blue"
    },
})

