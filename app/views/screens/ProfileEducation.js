import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { useSelector } from 'react-redux';
import { colors } from '../../values/colors';
import EducationItem from './items/EducationItem';
import AddEducation from './add/AddEducation';
import { showConfirmAlert, showAlert } from '../../utils/Message';
import { editCandidateDetails } from '../../redux/actions/homeActions';
import { useDispatch } from 'react-redux';
import {
    setProfileEducation
} from '../../redux/actions/homeActions';
import NoDataView from '../components/NoDataView';
import TitleRow from './items/TitleRow';
import DatePickerModal from '../modals/DatePickerModal';
import ButtonView from '../components/ButtonView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileEducation(props) {

    const profileEducation = useSelector(state => state.home.profileEducation);
    const baseViewRef = useRef(null);


    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, jobDetails, candidateData, recruiterData } = params;

    const dispatch = useDispatch();

    useEffect(() => {
        init()
        return () => {

        };
    }, [])


    const init = () => {
        if (newCandidateEmail) {
            const newEducationList = [];
            if (parsedData.education !== null) {
                const educationData = parsedData.education[0]
                for (const keys in educationData) {
                    newEducationList.push(educationData[keys]);
                }
            }
            dispatch(setProfileEducation(newEducationList));
        }
    }

    const _renderItem = (item, index) => {
        return (
            <EducationItem
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }

    const _onDelete = (item) => {
        showConfirmAlert(
            'Delete',
            `Are you sure you want to delete "${item.school}"?`,
            () => {
                if (baseViewRef !== null) {
                    baseViewRef.current.showLoader()
                    const list = profileEducation;
                    const filteredList = list.filter(it => it.school !== item.school)
                    const data = {
                        ...candidateDetails,
                        educations: filteredList
                    }
                    if (newCandidateEmail) {
                        baseViewRef.current.hideLoader()
                        dispatch(setProfileEducation(filteredList))
                        showAlert('success', 'Deleted Successfully!')
                    } else {
                        editCandidateDetails(data)
                            .then(response => {
                                baseViewRef.current.hideLoader()
                                console.log('[Education.js] on Delete Education: ', response)
                                dispatch(setProfileEducation(filteredList))
                                // dispatch(setExtraData(!extraData))
                                baseViewRef.current.hideLoader()
                                showAlert('success', 'Deleted Successfully!')
                            })
                            .catch(error => {
                                baseViewRef.current.hideLoader()
                                console.log('[AddEducation.js] on Delete Education Error: ', error)
                                showAlert('error', 'Something went wrong')
                            })
                    }
                }

            }
        )
    }

    const _onSave = () => {
        if (newCandidateEmail) {
            const data = {
                ...candidateData,
                education: profileEducation
            }
            console.log('Data before in Profile  Education info');
            console.log(data);
            props.navigation.navigate('ProfileExperience', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
        }
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Education'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.parent}>
                    <AddEducation candidateDetails={candidateDetails} newCandidateEmail={newCandidateEmail} />
                    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16, marginBottom: 30 }}>
                        <TitleRow
                            title={'My Education'}
                        />
                        {
                            profileEducation.map((it, index) => _renderItem(it, index))
                        }
                        {
                            profileEducation.length < 1
                            &&
                            <NoDataView
                                msg={'No Education Added yet!'}
                                parentStyle={{ marginTop: 48 }}
                            />
                        }
                    </View>
                </View>
                {

                    newCandidateEmail &&
                    <ButtonView
                        title={newCandidateEmail ? 'Next' : 'Save'}
                        containerStyle={{ justifyContent: "flex-end", margin: 16 }}
                        buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                        onPress={_onSave}
                    />

                }
            </ScrollView>
        </BaseView>
    )

}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
    }
})