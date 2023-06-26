import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { educationTypeJson } from '../../../json/educationTypesList';
// import { setProfileEducation, updateEducation } from '../../../../../redux/actions/profileActions';
import { profileEducationValidationSchema } from '../../../utils/formikValidations';
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
    setProfileEducation
} from '../../../redux/actions/homeActions';


const AddEducation = props => {

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)
    const profileEducation = useSelector(state => state.home.profileEducation);
    const dispatch = useDispatch();
    const { candidateDetails, newCandidateEmail } = props;

    const [graduatedYear, setGraduatedYear] = useState('');
    const [educationType, setEducationType] = useState('')
    const [educationProgram, setEducationProgram] = useState('')
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [flag, setFlag] = useState(0)

    const _onSetItem = item => {
        if (flag === 0) {
            setGraduatedYear(item.name)
        } else if (flag === 1) {
            setEducationType(item.name)
        }
    }

    const _onReset = () => {
        setEducationProgram('')
        setEducationType('')
        setGraduatedYear('')
        setSchool('')
        setMajor('')
    }

    const _onSave = () => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            const newEducation = {
                graduatedYear,
                educationType,
                educationProgram,
                school,
                major
            }
            const data = {
                ...candidateDetails,
                educations: [...profileEducation, newEducation]
            }
            if (newCandidateEmail) {
                baseViewRef.current.hideLoader();
                dispatch(setProfileEducation(data.educations))
                showAlert('success', 'Updated Successfully!')
            } else {
                editCandidateDetails(data)
                    .then(response => {
                        baseViewRef.current.hideLoader()
                        console.log('[Education.js] on New Education: ', response)
                        dispatch(setProfileEducation(data.educations))
                        baseViewRef.current.hideLoader()
                        showAlert('success', 'Updated Successfully!')
                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader()
                        console.log('[AddEducation.js] on New Education Error: ', error)
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
                title={`Add Education`}
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
                        graduatedYear,
                        educationType,
                        educationProgram,
                        school,
                        major,
                    }}
                    validationSchema={profileEducationValidationSchema}
                    onSubmit={_onSave}
                    enableReinitialize
                >
                    {
                        ({ handleSubmit, errors, touched }) => (
                            <View>
                                <View style={styles.row}>
                                    <PickerView
                                        label={graduatedYear === '' ? '' : 'Graduated Year'}
                                        value={graduatedYear === '' ? 'Graduated Year' : graduatedYear}
                                        parentStyle={{ marginRight: 8, width: 132 }}
                                        pickerStyle={{ height: 56 }}
                                        onPress={() => {
                                            setFlag(0)
                                            if (singleSelectModal !== null) {
                                                singleSelectModal.current.baseModal.showModal()
                                                singleSelectModal.current.init(getYearsList())
                                            }
                                        }}
                                        error={errors.graduatedYear}
                                        touched={touched.graduatedYear}
                                    />

                                    <PickerView
                                        label={educationType === '' ? '' : 'Education Type'}
                                        value={educationType === '' ? 'Education Type' : educationType}
                                        parentStyle={{ marginLeft: 8, flex: 1 }}
                                        pickerStyle={{ height: 56 }}
                                        onPress={() => {
                                            setFlag(1)
                                            if (singleSelectModal !== null) {
                                                singleSelectModal.current.baseModal.showModal()
                                                singleSelectModal.current.init(educationTypeJson)
                                            }
                                        }}
                                        error={errors.educationType}
                                        touched={touched.educationType}
                                    />
                                </View>

                                <InputView2
                                    style={styles.topMargin}
                                    label='Education Program'
                                    placeholder='Education Program'
                                    value={educationProgram}
                                    onChangeText={text => setEducationProgram(text)}
                                    error={errors.educationProgram}
                                    touched={touched.educationProgram}
                                />

                                <InputView2
                                    style={styles.topMargin}
                                    label='School'
                                    placeholder='School'
                                    value={school}
                                    onChangeText={text => setSchool(text)}
                                    error={errors.school}
                                    touched={touched.school}
                                />

                                <InputView2
                                    label='Major'
                                    placeholder='Major'
                                    value={major}
                                    onChangeText={text => setMajor(text)}
                                    style={styles.topMargin}
                                    error={errors.major}
                                    touched={touched.major}
                                />


                                <ButtonView
                                    title='Add Education'
                                    onPress={handleSubmit}
                                    buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                                />

                            </View>
                        )
                    }
                </Formik>
            </Collapsible>

            <SingleSelectModal
                ref={singleSelectModal}
                onSetItem={_onSetItem}
            />

        </BaseView>
    )
}

export default AddEducation

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topMargin: {
        marginTop: 16
    }
})
