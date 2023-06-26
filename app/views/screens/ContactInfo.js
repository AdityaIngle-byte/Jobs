import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, BackHandler, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editCandidateDetails } from '../../redux/actions/homeActions'
import { profilePersonalInfoValidationSchema } from '../../utils/formikValidations'
import { acceptOnlyCharacters } from '../../utils/Validations'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import AddAddressView from '../components/AddAddressView'
import ButtonView from '../components/ButtonView'
import InputView2 from '../components/InputView2'
import PhoneView from '../components/PhoneView'
import BaseView from '../hoc/BaseView'
import AddAddress from './add/AddAddress'
import { setProfilePersonalInfo } from '../../redux/actions/homeActions'
import { showAlert } from '../../utils/Message'
import parsePhoneNumber from 'libphonenumber-js'

const ContactInfo = props => {

    const baseViewRef = useRef(null)
    const addAddressModalRef = useRef(null)
    const dispatch = useDispatch()
    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, jobDetails, candidateData, recruiterData } = params;
    const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo)


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState(null);
    const [primaryCountryCode, setPrimaryCountryCode] = useState(null);
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [alternateCountryCode, setAlternateCountryCode] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('')
    const [primaryPhoneValid, setPrimaryPhoneValid] = useState(false);
    const [secondaryPhoneValid, setSecondaryPhoneValid] = useState(false);
    useEffect(() => {
        _init();

        BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            BackHandler.removeEventListener('hardwareBackPress',
                backAction)
        }

    }, [])

    const backAction = () => {
        props.navigation.goBack();
        return true;
    };

    const _init = () => {
        if (newCandidateEmail) {
            console.log(newCandidateEmail)
            setEmail(newCandidateEmail);
        } else {
            if (profilePersonalInfo !== null) {
                console.log('Checking personal info');
                console.log(profilePersonalInfo);
                setFirstName(profilePersonalInfo.firstName)
                setLastName(profilePersonalInfo.lastName)
                setAddress(profilePersonalInfo.address)
                setEmail(profilePersonalInfo.email)
                setDesignation(profilePersonalInfo.designation)
                _parsePhoneNumber(profilePersonalInfo.primaryPhone, 'Primary');
                _parsePhoneNumber(profilePersonalInfo.alternatePhone, 'Alternate');
            }
        }
    }

    const _parsePhoneNumber = (number, field) => {
        console.log("phone number");
        console.log(number);
        const phoneNumber = parsePhoneNumber(`+${number}`)
        console.log("Parsed phone number");
        console.log(phoneNumber)
        if (phoneNumber != null || phoneNumber != undefined) {
            switch (field) {
                case 'Primary':
                    setPrimaryPhone(phoneNumber.nationalNumber)
                    setPrimaryCountryCode(phoneNumber.countryCallingCode)
                    break;
                case 'Alternate':
                    setAlternatePhone(phoneNumber.nationalNumber)
                    setAlternateCountryCode(phoneNumber.countryCallingCode)
                    break;
                default:
                    break;
            }
        }
    }
    // const _parsePhoneNumber = (number, field) => {
    //     switch (field) {
    //         case 'Primary':
    //             const dialCode = phoneNumber.splice(2);
    //             setPrimaryPhone(phoneNumber.nationalNumber)
    //             setPrimaryCountryCode(phoneNumber.countryCallingCode)
    //             break;
    //         case 'Alternate':
    //             setAlternatePhone(phoneNumber.nationalNumber)
    //             setAlternateCountryCode(phoneNumber.countryCallingCode)
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const _onSave = () => {
        let standardizedPrimaryPhone;
        let standardizedAlternatePhone;
        if (newCandidateEmail) {
            if (!primaryPhoneValid) {
                showAlert('error', 'Invalid Primary Phone Number');
                return;
            }
            if (alternatePhone) {
                if (!secondaryPhoneValid) {
                    showAlert('error', 'Invalid Alternate Phone Number');
                    return;
                }

            }

            if (primaryPhone && primaryCountryCode) {
                standardizedPrimaryPhone = '+' + primaryCountryCode + primaryPhone
            }
            if (alternatePhone && alternateCountryCode) {
                standardizedAlternatePhone = '+' + alternateCountryCode + alternatePhone
            }

            const data = {
                ...candidateData,
                firstName,
                lastName,
                middleName: "",
                "address": address.addressLine1 ? address.addressLine1 : 'NA',
                "addressCity": address.city ? address.city : 'NA',
                "addressState": address.state ? address.state : 'NA',
                "stateName": address.state ? address.state : 'NA',
                "country": address.country ? address.country : 'NA',
                "zipCode": address.postalCode ? address.postalCode : 'NA',
                "email": newCandidateEmail,
                "mobilePhone": primaryCountryCode ? `+${primaryCountryCode} ${primaryPhone}` : "",
                "mobilePhoneCode": primaryCountryCode ? primaryCountryCode : '',
                "workPhone": alternateCountryCode ? `+${alternateCountryCode} ${alternatePhone}` : "",
                "workPhoneCode": alternateCountryCode ? alternateCountryCode : '',
                "homePhone": "",
                "homePhoneCode": "",
            }
            // console.log('Data before sending');
            // console.log(data);
            props.navigation.navigate('ProfileInfo', { candidateData: data, newCandidateEmail: newCandidateEmail, jobDetails: jobDetails, recruiterData: recruiterData });
        } else {
            if (baseViewRef !== null) {
                const data = {
                    ...candidateDetails,
                    firstName,
                    lastName,
                    "address": address.addressLine1,
                    "addressCity": address.city,
                    "addressState": address.state,
                    "stateName": address.state,
                    "country": address.country,
                    "zipCode": address.postalCode,
                    "workPhoneCode": alternateCountryCode,
                    "workPhone": standardizedAlternatePhone,
                    "homePhone": "",
                    "mobilePhoneCode": primaryCountryCode,
                    "mobilePhone": standardizedPrimaryPhone,
                }
                baseViewRef.current.showLoader()
                console.log("Check this data");
                console.log(data);
                editCandidateDetails(data)
                    .then(response => {
                        baseViewRef.current.hideLoader()
                        dispatch(setProfilePersonalInfo(data));
                        showAlert('success', 'Updated!, Contact Info Successfully!')
                        props.navigation.goBack()

                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader()
                    })
            }
        }
    }

    const _onChooseLocationFromMap = () => {
        props.navigation.navigate('SelectAddress', {
            onGoBack: _setAddress
        })
    }

    const _setAddress = (address) => {
        // console.log('[ProfilePersonalInfo.js] on Set Address : ', address)
        setAddress(address)
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasBack
            onBackPress={() => props.navigation.goBack()}
            hasTitle headerTitle='Contact Info'
        >
            <Formik
                initialValues={{
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    mobile: primaryPhone,
                    email: email,
                    // designation : designation
                }}
                validationSchema={profilePersonalInfoValidationSchema}
                onSubmit={_onSave}
                enableReinitialize
            >
                {
                    ({ handleSubmit, errors, touched }) => (
                        <View style={{ flex: 1 }}>
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: 96 }}
                            >
                                <View style={styles.parent}>
                                    <View style={[styles.row, { marginTop: 0 }]}>
                                        <InputView2
                                            label={'First Name'}
                                            placeholder={'First Name'}
                                            value={firstName}
                                            onChangeText={text => setFirstName(acceptOnlyCharacters(text))}
                                            error={errors.firstName}
                                            touched={touched.firstName}
                                            style={styles.rightMargin}
                                        />
                                        <InputView2
                                            label={'Last Name'}
                                            placeholder={'Last Name'}
                                            style={[styles.leftMargin]}
                                            value={lastName}
                                            onChangeText={text => setLastName(acceptOnlyCharacters(text))}
                                            error={errors.lastName}
                                            touched={touched.lastName}
                                        />
                                    </View>

                                    <PhoneView
                                        countryCode={primaryCountryCode}
                                        label={primaryPhone === '' ? '' : 'Primary Phone'}
                                        placeholder={'Primary Phone'}
                                        setCountry={code => setPrimaryCountryCode(code)}
                                        value={primaryPhone}
                                        onChangeText={text => setPrimaryPhone(text)}
                                        error={errors.mobile}
                                        touched={touched.mobile}
                                        setPrimaryPhoneValid={(value) => setPrimaryPhoneValid(value)}

                                    />

                                    <PhoneView
                                        countryCode={alternateCountryCode}
                                        label={alternatePhone === '' ? '' : 'Alternate Phone'}
                                        placeholder={'Alternate Phone'}
                                        setCountry={code => setAlternateCountryCode(code)}
                                        value={alternatePhone}
                                        onChangeText={text => setAlternatePhone(text)}
                                        setSecondaryPhoneValid={(value) => setSecondaryPhoneValid(value)}
                                    />

                                    <InputView2
                                        label={'Email'}
                                        placeholder={'Email'}
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        keyboardType='email-address'
                                        error={errors.email}
                                        touched={touched.email}
                                        style={styles.topMargin}
                                        editable={false}
                                    />

                                    <AddAddressView
                                        address={address}
                                        error={errors.address}
                                        touched={touched.address}
                                        onAddAddress={() => _onChooseLocationFromMap()}
                                        onEdit={() => {
                                            if (addAddressModalRef !== null) {
                                                addAddressModalRef.current.baseModal.showModal();
                                                addAddressModalRef.current.init(address)
                                            }
                                        }}
                                    />
                                </View>
                            </ScrollView>
                            <ButtonView
                                title={newCandidateEmail ? 'Next' : 'Save'}
                                containerStyle={[styles.topMargin, { position: 'absolute', bottom: 24, left: 24, right: 24 }]}
                                parentStyle={{ backgroundColor: colors.accent }}
                                onPress={() => handleSubmit()}
                                buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                            />
                        </View>
                    )
                }
            </Formik>
            <AddAddress
                ref={addAddressModalRef}
                onSavePress={address => setAddress(address)}
            />
        </BaseView>
    )
}

export default ContactInfo



const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16
    },
    row: {
        flexDirection: 'row',
        marginTop: 16
    },
    topMargin: {
        marginTop: 16
    },
    rightMargin: {
        marginRight: 8,
        flex: 1
    },
    leftMargin: {
        marginLeft: 8,
        flex: 1
    },
    addAddressText: {
        fontSize: 16,
        fontFamily: fonts.notoSansMedium,
        color: colors.darkBlueColor,
        paddingLeft: 8
    },
    addAddressView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        alignSelf: 'flex-end'
    },
    uploadImageView: {
        height: 164,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e7e7e7',
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.notoSansRegular,
        paddingBottom: 4,
        color: '#3C4043'
    },
    image: {
        height: 164,
        width: '100%',
        borderRadius: 4
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 8
    },
    imageView: {
        width: '30%',
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        padding: 4
    }
});
