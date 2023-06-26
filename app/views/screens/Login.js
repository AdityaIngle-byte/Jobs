import React, { useState, useRef } from 'react'
import {
    View, Text,
    ScrollView, StyleSheet,
    Image, TouchableOpacity
} from 'react-native'
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import { images } from '../../assets/images';
import { Formik } from 'formik';
import InputView from '../components/InputView';
import { Icon } from 'react-native-elements';
import { findTenantid, loginUser, forgotPassword } from '../../redux/actions/loginActions';
import { showAlert } from '../../utils/Message';
import BaseView from '../hoc/BaseView';
import ForgotPassword from '../modals/ForgotPasswordModal'
import { gettenant } from '../../redux/actions/homeActions';


export default function Login({ navigation }) {

    const baseViewRef = useRef(null);
    const forgotPasswordModalRef = useRef(null);
    const [email, setEmail] = useState('');  // hsmith999@yopmail.com   davidwarner@yopmail.com JhonJeffry@yopmail.com
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setIsRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const onLogin = () => {
        var error = false;
        setEmailError(null);
        setPasswordError(null);

        if (email == '' || password == '') {
            error = true;
            showAlert('error', 'Please fill out all the mandatory fields');
            return;
        }

        if (!ValidateEmail(email)) {
            showAlert('error', 'You have entered an invalid email address!');
            error = true;
            return
        }

        if (!error) {
            if (baseViewRef !== null) {
                baseViewRef.current.showLoader();
                loginUser(email, password)
                    .then((response) => {
                        console.log(response);
                        findTenantid(email)
                            .then((response) => {
                                baseViewRef.current.hideLoader();
                                navigation.replace('Home');
                            })
                            .catch((error) => {
                                baseViewRef.current.hideLoader();
                                showAlert('error', error);
                            })
                    })
                    .catch((error) => {
                        baseViewRef.current.hideLoader()
                        showAlert('error', error);
                    })
            }
        }

    }

    const _onForgotPassword = email => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            findTenantid(email)
                .then(response => {                     // Find Tentant Id from email.
                    baseViewRef.current.hideLoader();
                    if (response) {
                        var tenant_Id_check = response.fk_tenant;
                        gettenant(response.fk_tenant)    // Find Tentant Details from Tenant Id.
                            .then(response => {
                                console.log(response[0]);
                                var tenantName = response[0].tenantname;
                                forgotPassword(email, tenant_Id_check, tenantName)  // Forgot Password reset link .
                                    .then(response => {
                                        console.log('Success');
                                        console.log(response);
                                    })
                                    .catch(error => {
                                        console.log('Error');
                                        console.log(error);
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        alert('Error');
                    }
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log(error);
                })
        }
    }

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            return (true)
        return (false)
    }



    return (
        <BaseView ref={baseViewRef}>
            <ScrollView>
                <View style={styles.parent}>
                    <Image
                        source={images.cornerImage}
                        style={styles.cornerImage}
                        resizeMode='stretch'
                    />
                    <View style={styles.topView}>
                        <Image
                            source={images.logo}
                            style={styles.logoImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.loginView}>
                        <View style={styles.parentSignInStyle}>
                            <Text style={styles.SignInStyleText}>Sign In.</Text>
                            {/* <Text>{__DEV__.toString()}</Text> */}
                            <Text style={styles.subSignInStyleText}>Welcome! Sign in to get started.</Text>
                        </View>

                        <View>
                            {/* <Formik
                            initialValues={{
                                email : email,
                                password : password
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={() =>_onLogin()}
                            enableReinitialize
                        >
                            {
                                ({handleSubmit,errors,touched}) => ( */}

                            <ScrollView style={{ marginTop: 20 }}>
                                <InputView
                                    noIcon
                                    label='Email Address'
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    // autoCaptialize={false}
                                    parentStyle={styles.parentStyle}
                                    focusedColor={colors.accent}
                                    outlineColor={'#E2E1E5'}
                                    activeOutlineColor={colors.accent}
                                    outlineStyle={styles.outlineStyle} // changes the borderColor and and borderRadius when set to outline mode 
                                    keyboardType='email-address'
                                // error={errors.email}
                                // touched={touched.email}
                                />
                                {
                                    emailError ?
                                        <View>
                                            <Text>{emailError}</Text>
                                        </View> : null
                                }
                                <InputView
                                    noIcon
                                    label='Password'
                                    value={password}
                                    secureTextEntry={showPassword ? false : true}
                                    onChangeText={text => setPassword(text)}
                                    parentStyle={styles.parentStyle}
                                    focusedColor={colors.accent}
                                    maxLength={24}
                                    outlineColor={'#E2E1E5'}
                                    activeOutlineColor={colors.accent}
                                    outlineStyle={styles.outlineStyle} // changes the borderColor and and borderRadius when set to outline mode 
                                    onIconPress={() => setShowPassword(prevState => !prevState)}
                                // isRequired
                                // error={errors.password}
                                // touched={touched.password}
                                />
                                {
                                    passwordError ?
                                        <View>
                                            <Text>{passwordError}</Text>
                                        </View> : null
                                }
                                <View style={styles.row2}>
                                    <TouchableOpacity
                                        style={{}}
                                        onPress={() => setIsRememberMe(prevState => !prevState)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon
                                                name={rememberMe ? 'check-square' : 'square'}
                                                type='feather'
                                                color={rememberMe ? colors.primary : '#888'}
                                                size={18}
                                                containerStyle={{ marginRight: 8 }}
                                            />
                                            <Text style={[styles.forgotPassword, { color: rememberMe ? colors.primary : '#888' }]}>Remember</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{}}
                                        onPress={() => {
                                            if (forgotPasswordModalRef !== null) {
                                                forgotPasswordModalRef.current.baseModal.showModal()
                                            }
                                        }}
                                    >
                                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={onLogin}
                                >
                                    <Text style={styles.loginButtonText}>Login</Text>
                                </TouchableOpacity>
                            </ScrollView>

                            {/* )
                            }
                        </Formik> */}
                        </View>
                    </View>
                    {/* </BaseView> */}

                    <ForgotPassword
                        ref={forgotPasswordModalRef}
                        setEmail={_onForgotPassword}
                    />
                </View>
            </ScrollView>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: colors.accent,
    },
    SignInStyleText: {
        color: colors.black,
        fontSize: 32,
        fontWeight: 'bold',
    },
    parentSignInStyle: {
        marginTop: 30,
        marginLeft: 10,

    },
    subSignInStyleText: {
        marginTop: 6,
        color: colors.black,
        fontSize: 13,
        fontFamily: fonts.notoSansMedium,
    },
    loginButton: {
        backgroundColor: colors.accent,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 30
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 14
    },
    topView: {
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description2: {
        fontSize: 14,
        color: colors.accent,
        fontFamily: fonts.notoSans700,
        paddingHorizontal: 16,
        textAlign: 'center',
        // marginVertical: 16,
    },
    logoImage: {
        height: 80,
        width: 200
    },
    cornerImage: {
        position: 'absolute',
        height: 320,
        width: 360,
        top: 0, right: 0,
        // bottom:0
    },
    bar: {
        width: '40%',
        height: 1,
        backgroundColor: colors.gray,
    },
    loginView: {
        flex: 1,
        backgroundColor: '#fff',
        // height:'100%',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        paddingHorizontal: 20,
        // paddingTop:16
    },
    loginText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 8,
        fontFamily: fonts.notoSansBold,
        fontWeight: '900',
        color: '#000'
    },
    forgotPassword: {
        fontFamily: fonts.notoSansBold,
        fontSize: 14,
        color: colors.primary
    },
    interview: {
        fontFamily: fonts.notoSansBold,
        fontSize: 14,
        color: colors.accent,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        // marginTop:16
    },
    socialView: {
        height: 48,
        width: 84,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 36,
        // marginBottom:16
    },
    divider: {
        height: 2,
        backgroundColor: '#e0e0e0',
        flex: 1
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '93%',
        alignSelf: "center",
        marginTop: 10
    },
    linkedIN_logo: {
        height: 30,
        width: 80,
        borderColor: colors.linkedInColor
    },
    linkedInbutton: {
        backgroundColor: colors.linkedInColor,
        marginHorizontal: 5,
        borderColor: colors.linkedInColor,
        borderRadius: 6
    },
    linkedInText: {
        color: '#fff'
    },
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 14,
    },
    parentStyle: {
        width: '93%',
        alignSelf: "center",
        backgroundColor: colors.white,
    },
});