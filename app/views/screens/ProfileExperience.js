import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import React, { useRef, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { useSelector } from 'react-redux';
import { colors } from '../../values/colors';
import AddExperience from './add/AddExperience';
import { showConfirmAlert, showAlert } from '../../utils/Message';
import { useDispatch } from 'react-redux';
import {
    setProfileExperiences,
    editCandidateDetails
} from '../../redux/actions/homeActions';
import NoDataView from '../components/NoDataView';
import TitleRow from './items/TitleRow';
import ExperienceItem from './items/ExperienceItem';
import ButtonView from '../components/ButtonView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AddEducation from './add/AddEducation';

export default function ProfileExperience(props) {

    const profileExperiences = useSelector(state => state.home.profileExperiences);
    console.log('Profile experiences');
    console.log(profileExperiences);
    const baseViewRef = useRef(null);
    // const candidateDetails = props.route.params.candidateDetails;

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, candidateData, jobDetails, recruiterData } = params;

    const dispatch = useDispatch();

    useEffect(() => {
        init()
        return () => {

        };
    }, [])

    const init = () => {
        if (newCandidateEmail) {
            const newExperienceList = [];
            if (parsedData.experience !== null) {
                const experienceData = parsedData.experience[0]
                for (const keys in experienceData) {
                    newExperienceList.push(experienceData[keys]);
                }
            }
            dispatch(setProfileExperiences(newExperienceList));
        }
    }

    const _renderItem = (item, index) => {
        return (
            <ExperienceItem
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }

    const _onSave = () => {
        const data = {
            ...candidateData,
            experience: profileExperiences,
        }

        console.log('Data before in Profile  Education info');
        console.log(data);
        props.navigation.navigate('Preferences', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
    }

    const _onDelete = (item) => {
        showConfirmAlert(
            'Delete',
            `Are you sure you want to delete "${item.employerName}"?`,
            () => {
                if (baseViewRef !== null) {
                    baseViewRef.current.showLoader()
                    const list = profileExperiences;
                    const filteredList = list.filter(it => it.employerName !== item.employerName)
                    const data = {
                        ...candidateDetails,
                        experiences: filteredList
                    }
                    if (newCandidateEmail) {
                        baseViewRef.current.hideLoader()
                        dispatch(setProfileExperiences(filteredList))
                        showAlert('success', 'Deleted Successfully!')
                    } else {
                        editCandidateDetails(data)
                            .then(response => {
                                baseViewRef.current.hideLoader()
                                console.log('[Education.js] on Delete Education: ', response)
                                dispatch(setProfileExperiences(filteredList))
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

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Experience'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.parent}>
                    {/* <View style={{ marginBottom: Platform.OS === 'ios' ? -50 : null }}>
                        {/* <AddExperience candidateDetails={candidateDetails} /> */}

                    <AddExperience candidateDetails={candidateDetails} newCandidateEmail={newCandidateEmail} />
                    <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 30 }}>
                        <TitleRow
                            title={'My Experience'}
                        />
                        {
                            profileExperiences.map((it, index) => _renderItem(it, index))
                        }
                        {
                            profileExperiences.length < 1
                            &&
                            <NoDataView
                                msg={'No Experience Added yet!'}
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
        flex: 1
    }
})