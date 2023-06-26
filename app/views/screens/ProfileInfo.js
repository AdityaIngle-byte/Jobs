import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editCandidateDetails } from '../../redux/actions/homeActions'
import { profileInfoValidation } from '../../utils/formikValidations'
import { acceptOnlyCharacters } from '../../utils/Validations'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import SingleSelectModal from '../modals/SingleSelectModal'
import ButtonView from '../components/ButtonView'
import PhoneView from '../components/PhoneView'
import BaseView from '../hoc/BaseView'
import AddAddress from './add/AddAddress'
import { setProfilePersonalInfo } from '../../redux/actions/homeActions'
import { showAlert } from '../../utils/Message'
import parsePhoneNumber from 'libphonenumber-js'
import InputView2 from '../components/InputView2'
import { Icon } from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Switch } from "@rneui/themed";
import PickerView from '../components/PickerView'
import { highestLevelEducationTypeJson } from '../../json/educationTypesList'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { _onUploadResume } from '../../../common'
import { showConfirmAlert } from '../../utils/Message'

const ProfileInfo = props => {

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)

    const dispatch = useDispatch()
    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, candidateData, jobDetails, recruiterData } = params;
    const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo)

    const [currentJobTitle, setCurrentJobTitle] = useState('');
    const [currentEmployer, setCurrentEmployer] = useState('');
    const [address, setAddress] = useState(null);
    const [primaryCountryCode, setPrimaryCountryCode] = useState(null);
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [alternateCountryCode, setAlternateCountryCode] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('')
    const [years, setYears] = useState(0)
    const [months, setMonths] = useState(0)
    const [checked, setChecked] = useState(false);
    const [authToWork, setAuthToWork] = useState(false);
    const [immigration, setImmigration] = useState(false);
    const [highestLevelEducationType, setHighestLevelEducationType] = useState("Bachelor's Degree");
    const [resumeFileName, setResumeFileName] = useState('');
    const [parsedData, setParsedData] = useState('');
    const [monthYearError, setMonthYearError] = useState('');
    const [base64, setBase64] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        console.log('Candidate Email');
        console.log(newCandidateEmail);
        console.log('Candidate Data');
        console.log(candidateData);
        _init();
        return () => {

        };
    }, [])


    const _init = () => {
        if (profilePersonalInfo !== null) {
            // setEmail(data.newCandidateEmail);
            // setDesignation(profilePersonalInfo.designation)
            // _parsePhoneNumber(profilePersonalInfo.primaryPhone, 'Primary');
            // _parsePhoneNumber(profilePersonalInfo.alternatePhone, 'Alternate');
        } else {
            setEmail(newCandidateEmail);
        }
    }

    const _onSave = () => {
        if (newCandidateEmail) {
            let expLevel;
            setMonthYearError('');

            if (years == 0 && months == 0) {
                setMonthYearError('Required');
                return;
            } else {
                expLevel = findRange(years, months);
            }

            if (base64 == '') {
                showAlert('error', 'Please Upload Resume');
                return;
            }

            const data = {
                ...candidateData,
                currentJobTitle,
                currentEmployer,
                experienceYear: years.toString(),
                experienceMonth: months.toString(),
                experienceLevel: "", // How to calculate this.
                highestLevelEducationType, // Remove this field later
                legallyAuthorized: authToWork,
                requireSponsorship: immigration,
                base64: base64,
                fileName: resumeFileName,
                phoneValidation: true,
                phoneValidation2: true,
                experienceLevel: expLevel,
                skillSet: [],
            }
            console.log('Data before in profile info');
            console.log(data);
            props.navigation.navigate('ProfileSkills', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
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
                    "country": address.state,
                    "zipCode": address.postalCode,
                    "workPhoneCode": alternateCountryCode.dial_code,
                    "workPhone": alternatePhone,
                    "homePhone": "",
                    "mobilePhoneCode": primaryCountryCode.dial_code,
                    "mobilePhone": primaryPhone,
                }
                baseViewRef.current.showLoader()
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

    const calculateExperience = [
        { name: "0 years", range: [0] },
        { name: "1-3 years", range: [1, 2, 3] },
        { name: "3-5 years", range: [4, 5] },
        { name: "5-10 years", range: [6, 7, 8, 9, 10] },
        { name: "10+ years", range: [] },
    ];

    const findRange = (years, months) => {
        let month = Number(years) * 12 + Number(months);
        if (month > 120) {
            return "10+ years";
        } else if (month < 12 && month > 0) {
            if (month === 0) {
                return "Less than one year";
            } else {
                return "Intern";
            }
        } else {
            let year = Math.ceil(month / 12);
            let finalValue = calculateExperience.find((i) => i.range.includes(year))
                .name;
            return finalValue;
        }
    };

    const _setAddress = (address) => {
        console.log('[ProfilePersonalInfo.js] on Set Address : ', address)
        setAddress(address)
    }

    if (loader) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={colors.accent} animating />
            </View>
        )

    }



    const _uploadResume = () => {
        if (baseViewRef !== null) {
            // console.log(baseViewRef);
            // baseViewRef.current.showLoader();
            setLoader(true)
            _onUploadResume(null, null, true, email)
                .then(response => {
                    if (response) {
                        // baseViewRef.current.showLoader();
                        setLoader(false)
                        // baseViewRef.current.hideLoader();
                        setResumeFileName(response.fileName);
                        console.log(response);
                        setParsedData(response.parsedData);
                        setBase64(response.base64);
                        showAlert('success', 'Resume Uploaded Successfully!')
                    }
                })
                .catch(error => {
                    // baseViewRef.current.hideLoader();
                    setLoader(false);
                    console.log(error);
                    if (error != 'Cancel') {
                        showAlert('error', error);
                    }
                })
        }
    }

    const onDelete = () => {
        showConfirmAlert(
            'Delete',
            'Are you sure you want to Delete Resume?',
            () => {
                setResumeFileName('');
                setTimeout(() => {
                    showAlert('success', 'Resume Deleted Successfully')
                }, 500)
            }
        );
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasBack
            onBackPress={() => props.navigation.goBack()}
            hasTitle headerTitle='Profile Info'
        >
            <Formik
                initialValues={{
                    currentJobTitle: currentJobTitle,
                    currentEmployer: currentEmployer,
                    months: months,
                    years: years


                    // designation : designation
                }}
                validationSchema={profileInfoValidation}
                onSubmit={_onSave}
                enableReinitialize
            >
                {
                    ({ handleSubmit, errors, touched }) => (
                        <View style={{ flex: 1, margin: 1 }}>
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: 96 }}
                            >
                                <View style={styles.parent}>
                                    <View style={[styles.row, { marginTop: 0 }]}>
                                        <InputView2
                                            label={'Current job title'}
                                            placeholder={'Current job title'}
                                            value={currentJobTitle}
                                            onChangeText={text => setCurrentJobTitle(acceptOnlyCharacters(text))}
                                            error={errors.currentJobTitle}
                                            touched={touched.currentJobTitle}
                                            style={styles.rightMargin}
                                        />
                                        <InputView2
                                            label={'Current employer'}
                                            placeholder={'Current employer'}
                                            style={[styles.leftMargin]}
                                            value={currentEmployer}
                                            onChangeText={text => setCurrentEmployer(acceptOnlyCharacters(text))}
                                        />
                                    </View>

                                    <Text style={{ marginTop: 20, alignSelf: "center" }}>Total Years of Experience</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={[styles.counterParent, { marginRight: 10 }]}>
                                            <InputView2
                                                parentStyle={{ borderWidth: 0, borderRadius: 0 }}
                                                textInputViewStyle={{ backgroundColor: null }}
                                                label={'Years'}
                                                placeholder={'Years'}
                                                style={[styles.leftMargin]}
                                                value={years.toString()}
                                                onChangeText={(text) => { setYears(+text) }}
                                                error={errors.years}
                                                touched={touched.years}
                                            />

                                            <View style={styles.iconBody}>
                                                <FontAwesome
                                                    name={'sort-up'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setYears((prevState) => prevState + 1) }}
                                                />
                                                <FontAwesome
                                                    name={'sort-down'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setYears((prevState) => prevState !== 0 ? prevState - 1 : prevState) }}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.counterParent}>
                                            <InputView2
                                                parentStyle={{ borderWidth: 0, borderRadius: 0 }}
                                                textInputViewStyle={{ backgroundColor: null }}
                                                label={'Months'}
                                                placeholder={'Months'}
                                                style={[styles.leftMargin]}
                                                value={months.toString()}
                                                onChangeText={(text) => { setMonths(+text) }}
                                                error={errors.months}
                                                touched={touched.months}

                                            />

                                            <View style={styles.iconBody}>
                                                <FontAwesome
                                                    name={'sort-up'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setMonths((prevState) => prevState + 1) }}
                                                />
                                                <FontAwesome
                                                    name={'sort-down'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setMonths((prevState) => prevState !== 0 ? prevState - 1 : prevState) }}
                                                />

                                            </View>
                                        </View>
                                    </View>
                                    {
                                        monthYearError != '' ?
                                            <Text style={[styles.error, { color: colors.primary }]}>{monthYearError}</Text> : null
                                    }
                                    <PickerView
                                        fontValueSize={16}
                                        label={highestLevelEducationType === '' ? '' : 'Highest Level of Education'}
                                        value={highestLevelEducationType === '' ? 'Highest Level of Education' : highestLevelEducationType}
                                        parentStyle={{ flex: 1, marginTop: 30 }}
                                        pickerStyle={{ height: 66 }}
                                        onPress={() => {
                                            if (singleSelectModal !== null) {
                                                singleSelectModal.current.baseModal.showModal()
                                                singleSelectModal.current.init(highestLevelEducationTypeJson)
                                            }
                                        }}
                                        error={errors.highestLevelEducationType}
                                        touched={touched.highestLevelEducationType}
                                    />
                                    <View style={{ marginTop: 20, flexDirection: "row", padding: 10 }}>
                                        <View>
                                            <Text>Are you legally authorized to work in the United States? </Text>
                                        </View>
                                        <View>
                                            <Switch
                                                value={authToWork}
                                                onValueChange={(value) => setAuthToWork(value)}
                                                color={authToWork ? colors.newColor : colors.borderColor}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 12, flexDirection: "row", padding: 10 }}>
                                        <View style={{ width: '88%' }}>
                                            <Text>Do you now or in the future require sponsorship for an immigration-related benefit?</Text>
                                        </View>
                                        <View style={{ justifyContent: "center" }}>
                                            <Switch
                                                value={immigration}
                                                onValueChange={(value) => setImmigration(value)}
                                                color={immigration ? colors.newColor : colors.borderColor}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 12, padding: 10 }}>
                                        <View style={{ width: '88%' }}>
                                            <Text>To check your matching score for the job*</Text>
                                        </View>
                                        <View style={{ alignItems: "flex-start", flexDirection: "row" }}>
                                            {
                                                resumeFileName && <Text style={{ margin: 20 }}>{resumeFileName}</Text>
                                            }

                                            <View style={[styles.resumeLineStyle, {
                                                borderWidth: resumeFileName ? 0.1 : 1,
                                                borderColor: resumeFileName ? colors.textInputTextColor : colors.accent,
                                            }]}>
                                                <TouchableOpacity disabled={resumeFileName ? true : false} onPress={_uploadResume} style={{ flexDirection: 'row' }}>
                                                    <AntDesignIcon
                                                        name='clouduploado'
                                                        size={20}
                                                        color={resumeFileName ? 'gray' : colors.accent}
                                                    />
                                                    <Text style={{ color: resumeFileName ? 'gray' : colors.accent, paddingLeft: 2, fontWeight: "bold" }}>Upload Resume</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ marginTop: 22, marginRight: 5 }}>
                                                {
                                                    resumeFileName &&
                                                    <AntDesignIcon
                                                        name='checkcircle'
                                                        size={20}
                                                        color={colors.lightgreen}
                                                    />
                                                }
                                            </View>
                                            <View style={{ marginTop: 22 }}>
                                                {
                                                    resumeFileName &&

                                                    <AntDesignIcon
                                                        name='delete'
                                                        size={22}
                                                        color={colors.accent}
                                                        onPress={() => onDelete()}
                                                    />
                                                }
                                            </View>

                                        </View>
                                    </View>
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
            <SingleSelectModal
                ref={singleSelectModal}
                onSetItem={(item) => setHighestLevelEducationType(item.name)}
            />
        </BaseView>
    )
}

export default ProfileInfo



const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        marginHorizontal: 10
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
    },
    counterParent: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.2,
        marginTop: 20,
        flex: 1,
    },
    iconBody: {
        marginRight: 10,
        paddingVertical: 10,
    },
    textInput: {
        color: '#000000',
        fontFamily: fonts.notoRegular,
        flex: 1,
        height: 56,
        fontSize: 16,
        paddingLeft: 8,
        marginTop: 5
    },
    resumeLineStyle: {
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderColor: colors.accent,
        marginTop: 15,
        alignItems: "center",
        paddingHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        marginRight: 3
    },
    error: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        color: '#888',
        alignSelf: 'flex-start'
    }
});
