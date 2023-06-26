import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import BaseView from '../hoc/BaseView'
import { colors } from '../../values/colors';
import InputView2 from '../components/InputView2';
import ButtonView from '../components/ButtonView';
import { useDispatch, useSelector } from 'react-redux';
import { editCandidateDetails } from '../../redux/actions/homeActions';
import {
    setProfileDescription
} from '../../redux/actions/homeActions';
import { showAlert } from '../../utils/Message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function ProfileDescription(props) {

    const baseViewRef = useRef(null);
    const [story, setStory] = useState('')
    const profileDescription = useSelector(state => state.home.profileDescription);

    const params = props.route.params || {};
    const { candidateDetails, newCandidateEmail, parsedData, jobDetails, candidateData, recruiterData } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        _init();
        return () => {
            // Cleanup
        };
    }, [])

    const _init = () => {

        if (profileDescription !== null) {
            if (profileDescription !== '') {
                setStory(profileDescription)
            }
        } else {
            if (newCandidateEmail) {
                setStory(parsedData.resume_text)
            }
        }
    }

    const _onSave = () => {
        if (newCandidateEmail) {
            const data = {
                ...candidateData,
                description: story
            }
            console.log('Data before in Profile Description info');
            console.log(data);
            props.navigation.navigate('SocialMedia', { newCandidateEmail: newCandidateEmail, candidateData: data, parsedData: parsedData, jobDetails: jobDetails, recruiterData: recruiterData });
        } else {
            if (baseViewRef !== null) {
                baseViewRef.current.showLoader();
                const data = {
                    ...candidateDetails,
                    description: story
                }
                editCandidateDetails(data)
                    .then((response) => {
                        // dispatch(setProfileDescription(story));
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
            hasTitle headerTitle={'Description'}
            hasBack onBackPress={() => props.navigation.goBack()}
            {...props}
        >
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.parent}>
                    <View style={{ flex: 1, marginTop: 16 }}>
                        <InputView2
                            label='About me'
                            placeholder='Write about yourself...'
                            parentStyle={{ marginHorizontal: 16 }}
                            textInputStyle={[styles.multiLineTextInputStyle, { height: 480 }]}
                            multiline
                            value={story}
                            onChangeText={text => setStory(text)}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <ButtonView
                title={newCandidateEmail ? 'Next' : 'Save'}
                containerStyle={{ justifyContent: "flex-end", margin: 16 }}
                buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                onPress={_onSave}
            />

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