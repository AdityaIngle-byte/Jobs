import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors';
import InputView2 from '../components/InputView2';
import ButtonView from '../components/ButtonView';
import { useSelector, useDispatch } from 'react-redux';
import { editCandidateDetails } from '../../redux/actions/homeActions';
import {
    setProfileSocialMedia
} from '../../redux/actions/homeActions';
import { showAlert } from '../../utils/Message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { socialMediaValidationSchema } from '../../utils/formikValidations';
import { Formik } from 'formik';

export default function SocialMedia(props) {

    const baseViewRef = useRef(null);
    const dispatch = useDispatch();
    const [linkedIn, setLinkedIn] = useState('')
    const profileSocialMedia = useSelector(state => state.home.profileSocialMedia);

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, candidateData, jobDetails, recruiterData } = params;

    useEffect(() => {
        _init();
        return () => {
            // Cleanup
        };
    }, [])

    const _init = () => {
        if (!newCandidateEmail) {
            if (profileSocialMedia !== null) {
                setLinkedIn(profileSocialMedia.linkedIn)
            }
        }
    }

    const _onSave = () => {
        if (newCandidateEmail) {
            const data = {
                ...candidateData,
                linkedIn: linkedIn
            }
            console.log('Data before in Social Media info');
            console.log(data);
            props.navigation.navigate('ProfileEducation', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });

        } else {
            if (baseViewRef !== null) {
                baseViewRef.current.showLoader();
                const data = {
                    ...candidateDetails,
                    linkedIn: linkedIn
                }
                const socialMedia = {
                    ...profileSocialMedia,
                    linkedIn: linkedIn,

                }
                editCandidateDetails(data)
                    .then((response) => {
                        // dispatch(setProfileSocialMedia(socialMedia));
                        baseViewRef.current.hideLoader();
                        showAlert('success', 'Updated successfully');
                        // props.navigation.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                        showAlert('error', 'Something went wrong');
                        baseViewRef.current.hideLoader();
                    })
            }
        }
    }



    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            statusBarColor={colors.black}
            hasHeader headerParentStyle={{ backgroundColor: colors.white }}
            hasTitle headerTitle={'Social Media Link'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <View style={styles.parent}>
                <Formik
                    initialValues={{
                        linkedIn: linkedIn,
                    }}
                    validationSchema={socialMediaValidationSchema}
                    onSubmit={() => _onSave()}
                    enableReinitialize
                >
                    {({ handleSubmit, errors, touched }) => (
                        <View style={{ flex: 1, marginHorizontal: 16 }}>
                            <InputView2
                                label={'Social Media Link'}
                                placeholder={'eg. Linkedin Id'}
                                value={linkedIn}
                                onChangeText={text => setLinkedIn(text)}
                                style={styles.topMargin}
                                error={errors.linkedIn}
                                touched={touched.linkedIn}
                            />
                            <ButtonView
                                title={newCandidateEmail ? 'Next' : 'Save'}
                                containerStyle={{ justifyContent: "flex-end", margin: 16, flex: 1 }}
                                buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                                onPress={() => handleSubmit()}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        backgroundColor: "#EEEEEE",
        flex: 1,
    },
    topMargin: {
        marginTop: 16
    },
    multiLineTextInputStyle: {
        minHeight: 172,
        paddingTop: 24,
        borderColor: '#d4d4d4',
        padding: 12,
        borderRadius: 4,
        borderBottomColor: '#d4d4d4',
        backgroundColor: '#fff',
        textAlignVertical: 'top'
    }
})