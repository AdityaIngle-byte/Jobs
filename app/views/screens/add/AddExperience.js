import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypesJson } from '../../../json/jobTypesJson';
import { profileExperienceValidationSchema } from '../../../utils/formikValidations';
import { getYearsList } from '../../../utils/Validations';
import { colors } from '../../../values/colors';
import ButtonView from '../../components/ButtonView';
import InputView2 from '../../components/InputView2';
import PickerView from '../../components/PickerView';
import BaseView from '../../hoc/BaseView';
import SingleSelectModal from '../../modals/SingleSelectModal'
import TitleRow from '../items/TitleRow'
import { showAlert } from '../../../utils/Message';
import {
    editCandidateDetails,
    setProfileExperiences
} from '../../../redux/actions/homeActions';
import DatePickerModal from '../../modals/DatePickerModal';
import CheckBoxView from '../../components/CheckBoxView';
import { profileStyles } from '../profile/profileStyles';

const AddExperience = props => {

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)
    const datePickerModal = useRef(null)
    const profileExperiences = useSelector(state => state.home.profileExperiences);
    const dispatch = useDispatch();
    const { candidateDetails, newCandidateEmail } = props;

    const [employerName, setEmployerName] = useState('')
    const [designation, setDesignation] = useState('')
    const [durationFrom, setDurationFrom] = useState('')
    const [durationTo, setDurationTo] = useState('')
    const [industry, setIndustry] = useState('')
    const [description, setDescription] = useState("")
    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false)

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [flag, setFlag] = useState(0)

    const _onSetItem = item => {
        if (flag === 0) {
            setGraduatedYear(item.name)
        } else if (flag === 1) {
            setEducationType(item.name)
        }
    }

    const _setDate = date => {
        if (flag === 1) {
            setDurationFrom(date)
        } else {
            setDurationTo(date)
        }
    }

    const _onReset = () => {
        setEmployerName('')
        setDesignation('')
        setIndustry('')
        setDurationFrom('')
        setDurationTo('')
        setIsCurrentlyWorking(false)
        setDescription('')
    }

    const _onSave = () => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            const newExperience = {
                employerName: employerName,
                jobTitle: designation,
                startDate: durationFrom,
                endDate: durationTo,
                description,
                industry,
                isSelect: isCurrentlyWorking
            }
            const data = {
                ...candidateDetails,
                experiences: [...profileExperiences, newExperience]
            }

            if (newCandidateEmail) {
                baseViewRef.current.hideLoader();
                dispatch(setProfileExperiences(data.experiences))
                showAlert('success', 'Updated Successfully!')
            } else {
                editCandidateDetails(data)
                    .then(response => {
                        baseViewRef.current.hideLoader()
                        console.log('[Experience.js] on New Experience: ', response)
                        dispatch(setProfileExperiences(data.experiences))
                        baseViewRef.current.hideLoader()
                        showAlert('success', 'Updated Successfully!')
                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader()
                        console.log('[Experience.js] on New Experience Error: ', error)
                        showAlert('error', 'Something went wrong')
                    })
            }
        }
    }

    return (

        <BaseView
            ref={baseViewRef}
            parentStyle={styles.parent}
        >
            <TitleRow
                title={`Add Experience`}
                disabled={0}
                hasIcon
                onTitlePress={() => setIsCollapsed(prevState => !prevState)}
                hasReset={!isCollapsed}
                onReset={() => _onReset()}
            // titleStyle={{fontSize:16,color:colors.textInputTextColor}}
            />

            <Collapsible collapsed={isCollapsed}>
                <Formik
                    initialValues={{
                        employerName,
                        designation
                    }}
                    validationSchema={profileExperienceValidationSchema}
                    onSubmit={() => _onSave()}
                    enableReinitialize
                >
                    {
                        ({ handleSubmit, errors, touched }) => (
                            <View>
                                <View style={styles.row}>
                                    <InputView2
                                        label='Employer Name'
                                        placeholder='Employer Name'
                                        style={styles.rightMargin}
                                        value={employerName}
                                        onChangeText={text => setEmployerName(text)}
                                        // isRequired
                                        error={errors.employerName}
                                        touched={touched.employerName}
                                    />
                                    <InputView2
                                        label='Designation'
                                        placeholder='Designation'
                                        style={styles.leftMargin}
                                        value={designation}
                                        onChangeText={text => setDesignation(text)}
                                        // isRequired
                                        error={errors.designation}
                                        touched={touched.designation}
                                    />
                                </View>

                                <PickerView
                                    label={industry !== '' ? 'Industry' : ''}
                                    value={industry !== '' ? industry : 'Select Industry'}
                                    onPress={() => {
                                        if (singleSelectModal !== null) {
                                            singleSelectModal.current.baseModal.showModal();
                                            singleSelectModal.current.init(jobTypesJson)
                                        }
                                    }}
                                    parentStyle={styles.topMargin}
                                />

                                <View style={[styles.row, styles.topMargin]}>
                                    <PickerView
                                        label={durationFrom === '' ? '' : 'Duration From'}
                                        value={durationFrom === '' ? 'Duration From' : durationFrom}
                                        parentStyle={styles.rightMargin}
                                        pickerStyle={{ height: 56 }}
                                        onPress={() => {
                                            setFlag(1)
                                            if (datePickerModal !== null) {
                                                datePickerModal.current.showModal()
                                            }
                                        }}
                                    />
                                    <PickerView
                                        label={durationTo === '' ? '' : 'Duration To'}
                                        value={durationTo === '' ? 'Duration To' : durationTo}
                                        parentStyle={styles.leftMargin}
                                        pickerStyle={{ height: 56 }}
                                        onPress={() => {
                                            setFlag(2)
                                            if (datePickerModal !== null) {
                                                datePickerModal.current.showModal()
                                            }
                                        }}
                                        disabled={isCurrentlyWorking}
                                    />
                                </View>

                                <CheckBoxView
                                    title='Currently Employer'
                                    checked={isCurrentlyWorking}
                                    onPress={() => setIsCurrentlyWorking(prevState => !prevState)}
                                />

                                <InputView2
                                    label='Description'
                                    placeholder='Write about your experience...'
                                    style={styles.topMargin}
                                    value={description}
                                    onChangeText={text => setDescription(text)}
                                    textInputStyle={[profileStyles.multiLineTextInputStyle, { minHeight: 12, }]}
                                    multiline
                                />

                                <ButtonView
                                    title='Add Experience'
                                    onPress={() => handleSubmit()}
                                    buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                                />




                            </View>
                        )
                    }
                </Formik>
            </Collapsible>

            <DatePickerModal
                ref={datePickerModal}
                setDate={_setDate}
            />

            <SingleSelectModal
                ref={singleSelectModal}
                onSetItem={item => setIndustry(item.name)}
            />

        </BaseView>
        // <BaseView
        //     ref={baseViewRef}
        //     parentStyle={styles.parent}
        // >

        //     <Collapsible collapsed={isCollapsed}>
        //         <Formik
        //         >
        //             {
        //                 ({ handleSubmit, errors, touched }) => (
        //                     <View style={{ flex: 1, marginBottom: -30 }}>
        //                         <View style={styles.row}>
        //                         </View>





        //                     </View>
        //                 )
        //             }
        //         </Formik>
        //     </Collapsible>



        // </BaseView>



    )
}

export default AddExperience

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    topMargin: {
        marginTop: 16
    },
    leftMargin: {
        marginLeft: 8,
        flex: 1
    },
    rightMargin: {
        marginRight: 8,
        flex: 1
    },
})
