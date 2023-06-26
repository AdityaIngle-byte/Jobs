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
class ForgotPassword extends Component {

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
    _onForgotPress = () => {
        this.props.setEmail(this.state.emailId)
        this.baseModal.hideModal()
        this.setState({ emailId: '' })
    }


    render() {
        const { emailId } = this.state;
        return (
            <BaseModal
                ref={ref => this.baseModal = ref}
            >
                <View
                    style={{ borderRadius: 12 }}
                >
                    <HeaderModal
                        title={'Forgot Password?'}
                        onCrossPress={() => this.baseModal.hideModal()}
                    />
                    <Formik
                        initialValues={{
                            email: emailId
                        }}
                        validationSchema={forgotPasswordValidationSchema}
                        onSubmit={() => this._onForgotPress()}
                        enableReinitialize
                    >
                        {
                            ({ handleSubmit, handleChange, values, errors, touched }) => (
                                <View style={styles.container}>
                                    <Text style={styles.text1}>Enter your registered Email ID to receive a reset password link.</Text>
                                    {/* <InputView 
                            label={'Email Id'}
                            placeholder={'Registered Email ID'}
                            parentStyle={{marginTop:20}}
                            value={emailId}
                            onChangeText={text => this.setState({emailId:text})}
                            keyboardType={'email-address'}
                            // onBlur={() => this._onBlurEmail()}
                            // isRequired
                            error={errors.email}
                            touched={touched.email}
                        /> */}
                                    <InputView
                                        value={emailId}
                                        onChangeText={text => this.setState({ emailId: text })}
                                        placeholder='Registered Email ID'
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
                                        title={'Send reset link'}
                                        onPress={() => handleSubmit()}
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
        // height:290,
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

//make this component available to the app
export default ForgotPassword;



