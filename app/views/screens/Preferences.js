import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
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
import { currencyList } from '../../json/currencyList'
import { preferencesCurrencyRateValidationSchema } from '../../utils/formikValidations'

const Preferences = props => {

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)

    const dispatch = useDispatch()

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, candidateData, jobDetails, recruiterData } = params;
    const profilePersonalInfo = useSelector(state => state.home.profilePersonalInfo)


    const [preferredSalary, setPreferredSalary] = useState(0);
    const [comfortableWithLocation, setComfortableWithLocation] = useState(false);
    const [preferredSalaryCurrency, setPreferredSalaryCurrency] = useState('USD');
    const [jobData, setJobData] = useState(null);
    const [isHybrid, setIsHybrid] = useState(false);
    const [isOnsite, setIsOnsite] = useState(false);
    const [isRemote, setIsRemote] = useState(false);
    const [preferedLocationArray, setPreferedLocationArray] = useState([]);

    useEffect(() => {
        _init();
        return () => {
        };
    }, [])

    const _init = () => {
        const location = [];
        location.push(jobDetails.workPlaceType);

        if (jobDetails.workPlaceType == 'Hybrid') {
            setIsHybrid(true);
        } else if (jobDetails.workPlaceType == 'On-Site') {
            setIsOnsite(true);
        } else if (jobDetails.workPlaceType == 'Remote') {
            setIsRemote(true);
        }
        setJobData(jobDetails);
        setPreferedLocationArray(location);
    }


    const _onSave = () => {

        if (newCandidateEmail) {

            const data = {
                ...candidateData,
                preferredSalary: preferredSalary.toString(),
                preferredSalaryCurrency: preferredSalaryCurrency,
                isHybrid: isHybrid,
                isOnsite: isOnsite,
                isRemote: isRemote,
                preferredLocation: preferedLocationArray,
            }

            console.log('Data before in Preferences ');
            console.log(data);
            props.navigation.navigate('ScoreCard', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
        }
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasBack
            onBackPress={() => props.navigation.goBack()}
            hasTitle headerTitle='Preferences'
        >
            <Formik
                initialValues={{
                    preferredSalary: preferredSalary,
                    preferredSalaryCurrency: preferredSalaryCurrency
                }}
                validationSchema={preferencesCurrencyRateValidationSchema}
                onSubmit={_onSave}
                enableReinitialize
            >
                {
                    ({ handleSubmit, errors, touched }) => (
                        <View style={{ flex: 1, }}>
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: 96 }}
                            >
                                <View style={styles.parent}>
                                    <Text style={{ marginTop: 20 }}>Let us know your expected salary</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={[styles.counterParent, { marginRight: 10 }]}>
                                            <InputView2
                                                parentStyle={{ borderWidth: 0, borderRadius: 0 }}
                                                textInputViewStyle={{ backgroundColor: null }}
                                                label={'Expected Annual Salary'}
                                                placeholder={'Expected Annual Salary'}
                                                style={[styles.leftMargin]}
                                                value={preferredSalary.toString()}
                                                onChangeText={(text) => { setPreferredSalary(+text) }}
                                                error={errors.preferredSalary}
                                                touched={touched.preferredSalary}
                                            />

                                            <View style={styles.iconBody}>
                                                <FontAwesome
                                                    name={'sort-up'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setPreferredSalary((prevState) => prevState + 1) }}
                                                />
                                                <FontAwesome
                                                    name={'sort-down'}
                                                    color={'#888'}
                                                    size={20}
                                                    onPress={() => { setPreferredSalary((prevState) => prevState !== 0 ? prevState - 1 : prevState) }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <PickerView
                                        fontValueSize={16}
                                        label={preferredSalaryCurrency === '' ? '' : 'Currency Type'}
                                        value={preferredSalaryCurrency === '' ? 'Currency Type' : preferredSalaryCurrency}
                                        parentStyle={{ flex: 1, marginTop: 30 }}
                                        pickerStyle={{ height: 66 }}
                                        onPress={() => {
                                            if (singleSelectModal !== null) {
                                                singleSelectModal.current.baseModal.showModal()
                                                singleSelectModal.current.init(currencyList)
                                            }
                                        }}
                                    // error={errors.preferredSalaryCurrency}
                                    // touched={touched.preferredSalaryCurrency}
                                    />
                                    <View style={{ marginTop: 20, flexDirection: "row", padding: 10, flexWrap: 'wrap' }}>
                                        <View>

                                            <Text>Required Location for this job is {jobData?.workPlaceType != 'Remote' ? `${jobData?.workPlaceType} - ${jobData?.location?.address}` : jobData?.workPlaceType}. Are you comfortable with this mentioned location. </Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Switch
                                                value={comfortableWithLocation}
                                                onValueChange={(value) => setComfortableWithLocation(value)}
                                                color={comfortableWithLocation ? colors.newColor : colors.borderColor}
                                            />
                                        </View>
                                    </View>
                                    {/* <View style={{ marginTop: 12, flexDirection: "row", padding: 10 }}>
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

                                            <View style={{ marginTop: 22, marginHorizontal: 7 }}>
                                                {
                                                    resumeFileName &&
                                                    <AntDesignIcon
                                                        name='checkcircle'
                                                        size={20}
                                                        color={colors.lightgreen}
                                                    />
                                                }
                                            </View>
                                            <View style={{ marginTop: 22, marginHorizontal: 7, marginLeft: 10 }}>
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
                                    </View> */}
                                </View>
                            </ScrollView>
                            <ButtonView
                                disabled={!comfortableWithLocation}
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
                currencyModal
                onSetItem={(item) => setPreferredSalaryCurrency(item.name)}
            />
        </BaseView>
    )
}

export default Preferences



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
        paddingHorizontal: 20,
        height: 40,
        justifyContent: 'center'
    },
});
