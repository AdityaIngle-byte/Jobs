import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CountriesWithCode from '../modals/CountriesWithCode';
import PickerView from './PickerView';
import { AsYouType } from 'libphonenumber-js'
import InputView2 from './InputView2';
import { countries } from '../../json/countries';

const PhoneView = props => {
    const { countryCode, label, value, onChangeText, error, touched, editable, setCountry, setSecondaryPhoneValid, setPrimaryPhoneValid } = props;

    const countriesRef = useRef(null)
    const [code, setCode] = useState(null)
    const [phone, setPhone] = useState('')
    const [countryName, setCountryName] = useState('')


    useEffect(() => {
        if (countryCode !== null) {
            setCode(countryCode);
        }
    })


    const _onChangeText = (text) => {
        const asYouType = new AsYouType(countryName)
        const formattedNumber = asYouType.input(text)
        const isValid = asYouType.isValid()
        console.log('[PhoneNumberView.js] onChangeText :', formattedNumber, isValid)
        setPrimaryPhoneValid ? setPrimaryPhoneValid(isValid) : null;
        setSecondaryPhoneValid ? setSecondaryPhoneValid(isValid) : null;
        setPhone(formattedNumber);
        onChangeText(formattedNumber);
    }



    const _onSetCountryCode = (data) => {
        setCode(data.dial_code)
        setCountry(data.dial_code)
        setCountryName(data.code)
    }

    // const _checkCountryCodeFromFlagName = (countryCode) => {
    //     const country_code = countries.filter(it=>it.name == countryCode.name);
    //     return country_code[0];
    // }


    return (
        <View style={styles.parent}>
            <View style={styles.row}>
                <PickerView
                    label={code === null ? '' : 'Country'}
                    value={code === null ? 'Country' : `+ ${code}`}
                    parentStyle={{ marginRight: 8 }}
                    pickerStyle={{ height: 60, width: 108 }}
                    onPress={() => countriesRef.current.baseModal.showModal()}
                />
                <InputView2
                    // {...props}
                    style={{ flex: 1, marginLeft: 8 }}
                    label={label}
                    onChangeText={text => _onChangeText(text)}
                    placeholder={props.placeholder ? props.placeholder : '1234567890'}
                    value={value}
                    editable={code === null ? false : true}
                    error={error}
                    touched={touched}
                    maxLength={15}
                    keyboardType={'phone-pad'}
                />
            </View>

            <CountriesWithCode
                ref={countriesRef}
                onItemPress={_onSetCountryCode}
            />

        </View>
    )
}

export default PhoneView

const styles = StyleSheet.create({
    parent: {
        marginTop: 16,
    },
    row: {
        flexDirection: 'row',

    }
})

