//import liraries
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { forgotPasswordValidationSchema } from '../../utils/formikValidations';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import ButtonView from '../components/ButtonView';
import HeaderModal from '../components/HeaderModal';
import InputView from '../components/InputView';
import BaseModal from '../hoc/BaseModal';


// create a component
class ApplyNowModal extends Component {

    state = {
        emailId: ''
    }


    // _onBlurEmail = () => {
    //     if(!emailCheck.test(this.state.emailId)){
    //         showAlertMessage('Enter valid Email.')
    //         this.setState({
    //             emailId : ''
    //         })
    //     }
    // }



    //on send reset password link
    _submitEmail = () => {
        this.props.setEmail(this.state.emailId)
        this.baseModal.hideModal()
        this.setState({ emailId: '' })
    }


    render() {
        const { emailId } = this.state;
        return (
            <BaseModal
                ref={ref => this.baseModal = ref}
                animation={"slideInDown"}
                easing="ease-in-out-back"
            >
                <View
                    style={{ borderRadius: 12 }}
                >
                    <HeaderModal
                        title={'Apply With'}
                        onCrossPress={this.props._onCrossPress}
                    />
                    <Formik
                        initialValues={{
                            email: emailId
                        }}
                        validationSchema={forgotPasswordValidationSchema}
                        onSubmit={() => this._submitEmail()}
                        enableReinitialize
                    >
                        {
                            ({ handleSubmit, errors, touched }) => (
                                <View style={styles.container}>
                                    <InputView
                                        value={emailId}
                                        onChangeText={text => this.setState({ emailId: text })}
                                        placeholder='Email'
                                        placeholderTextColor={'#A9A6A6'}
                                        parentStyle={{ marginTop: 20, backgroundColor: colors.white }}
                                        keyboardType={'email-address'}
                                        focusedColor={'#A9A6A6'}
                                        iconName={'email'}
                                        iconColor={'#A9A6A6'}
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                    <ButtonView
                                        title={'Submit'}
                                        onPress={() => handleSubmit()}
                                        buttonStyle={{ borderRadius: 10 }}
                                    />
                                </View>
                            )
                        }
                    </Formik>
                </View>
            </BaseModal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        width: '100%',
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16
    },
    text1: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 14,
        color: '#00000080'
    }
});

export default ApplyNowModal;



