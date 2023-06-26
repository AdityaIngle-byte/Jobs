import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../values/colors'
import SingleSelectModal from '../modals/SingleSelectModal'
import ButtonView from '../components/ButtonView'
import BaseView from '../hoc/BaseView'
import { setProfilePersonalInfo } from '../../redux/actions/homeActions'
import { showAlert, showConfirmAlert } from '../../utils/Message'
import InputView from '../components/InputView'
import { Icon } from 'react-native-elements'
import { jobTypesJson } from '../../json/jobTypesJson'
import { profileSkillsValidationSchema } from '../../utils/formikValidations'
import { generateRandomString } from '../../utils/Validations'
import { fonts } from '../../values/fonts'
import PickerView from '../components/PickerView'
import ProfileSkillItem from './items/ProfileSkillItem'
import InputView2 from '../components/InputView2'

const ProfileSkills = props => {

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, candidateData, jobDetails, recruiterData } = params;

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)
    const dispatch = useDispatch()

    const profileSkills = useSelector(state => state.home.profileSkills);


    const [skillName, setSkillName] = useState('')
    // const [industry, setIndustry] = useState('')
    const [skillsList, setSkillsList] = useState([])
    const [flag, setFlag] = useState(0)


    useEffect(() => {
        init()
        return () => {

        };
    }, [])


    const init = () => {
        if (profileSkills !== null) {
            // const industry = profileSkills.skillSet.length > 0 ? profileSkills.skillSet[0] : ''
            // setIndustry(industry)

            const list = []
            profileSkills.primarySkills.forEach(it => {
                const data = {
                    id: `skill_${generateRandomString(20)}`,
                    skill: it,
                }
                list.push(data)
            })

            setSkillsList(list)
        } else {
            if (newCandidateEmail) {
                const list = []
                if (parsedData.primary_skills.length > 0) {
                    parsedData.primary_skills.forEach(it => {
                        const data = {
                            id: `skill_${generateRandomString(20)}`,
                            skill: it,
                        }
                        list.push(data)
                    })
                }
                setSkillsList(list)
            }
        }
    }



    const _renderItem = (item, index) => {
        return (
            <ProfileSkillItem
                item={item}
                index={index}
                onDelete={() => _onDeleteSkill(item)}
                flag={flag}
                onSkillPress={() => {
                    props.route.params.onGoBack(item)
                    props.navigation.goBack()
                }}
            />
        )
    }

    const _onDeleteSkill = (item) => {
        const list = skillsList;
        const filteredList = list.filter(it => it.id !== item.id)
        showAlert('success', `${item.skill} Deleted Successfully!`)
        setSkillsList(filteredList)
    }

    const _onAddSkill = () => {

        const filteredList = skillsList.filter(it => it.skill.replace(' ', "").toLowerCase() === skillName.replace(' ', "").toLowerCase())
        console.log('[Skills.js] Filtered List : ', skillsList, skillName, filteredList)
        // alert('Hi')
        if (filteredList.length < 1) {
            const item = {
                id: `skill_${generateRandomString(20)}`,
                skill: skillName,
                // rating : rating
            }
            showAlert('success', `${item.skill} Added Successfully!`)
            const list = [...skillsList, item]
            setSkillsList(list);
            setSkillName('')
        } else {
            showAlert('error', 'Skill ALready Added!')
        }
    }

    const _onReset = () => {
        showConfirmAlert(
            'Reset',
            'All Skills will be reset.Are you sure?',
            () => {
                setSkillsList([])
                setSkillName('')
                // setIndustry('')
                // dispatch(setProfileSkills(null))
            }

        )
    }


    const _onSave = () => {
        if (newCandidateEmail) {
            const primarySkills = [];
            skillsList.map(it => primarySkills.push(it.skill));

            const data = {
                ...candidateData,
                primarySkills: primarySkills,
                skillSet: []
            }
            console.log('Data before in Skills info');
            console.log(data);
            props.navigation.navigate('ProfileDescription', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
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


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasBack
            onBackPress={() => props.navigation.goBack()}
            hasTitle headerTitle='Profile Skills'
            rightComponent={
                <TouchableOpacity
                    style={{ padding: 8 }}
                    onPress={() => _onReset()}
                >
                    <Text style={{ color: colors.primary, fontFamily: fonts.notoSansMedium }}>Reset</Text>
                </TouchableOpacity>
            }
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ flex: 1 }}
            >
                <Formik
                    initialValues={{
                        skill: skillName
                    }}
                    validationSchema={profileSkillsValidationSchema}
                    onSubmit={() => _onAddSkill()}
                    enableReinitialize
                >
                    {
                        ({ handleSubmit, values, errors, touched }) => (
                            <View style={styles.parent}>
                                <View style={{ flexDirection: "row", flex: 1 }}>

                                    <InputView2
                                        style={{ flex: 1 }}
                                        label={'Skill Name'}
                                        placeholder={'Skill Name'}
                                        value={skillName}
                                        onChangeText={text => setSkillName(text)}
                                        error={errors.skill}
                                        touched={touched.skill}
                                    />
                                    <View style={{ justifyContent: "center", backgroundColor: colors.accent, borderRadius: 4, margin: 3, width: 90, height: 60, marginLeft: 10 }}>
                                        <TouchableOpacity
                                            // style={{ alignItems: 'center' }}
                                            onPress={() => handleSubmit()}
                                        >
                                            <Text style={styles.addSkill}>+ Add Skill</Text>
                                        </TouchableOpacity>
                                    </View>



                                </View>


                                {
                                    skillsList.map((item, index) => _renderItem(item, index))
                                }

                                {/* <PickerView
                                    label={industry !== '' ? 'Industry' : ''}
                                    value={industry !== '' ? industry : 'Select Industry'}
                                    onPress={() => {
                                        if (singleSelectModal !== null) {
                                            singleSelectModal.current.baseModal.showModal();
                                            singleSelectModal.current.init(jobTypesJson)
                                        }
                                    }}
                                    parentStyle={{ marginTop: 32 }}
                                /> */}
                            </View>
                        )}
                </Formik>
            </ScrollView>

            <ButtonView
                title={newCandidateEmail ? 'Next' : 'Save'}
                containerStyle={[styles.topMargin, { position: 'absolute', bottom: 24, left: 24, right: 24 }]}
                parentStyle={{ backgroundColor: colors.accent }}
                onPress={() => _onSave()}
                buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
            />


            {/* <SingleSelectModal
                ref={singleSelectModal}
                onSetItem={item => setIndustry(item.name)}
            /> */}

        </BaseView>
    )
}

export default ProfileSkills



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
    addSkill: {
        color: colors.white,
        paddingHorizontal: 10
    }
});
