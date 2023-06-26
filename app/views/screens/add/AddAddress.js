import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { acceptOnlyCharacters, generateRandomString } from '../../../utils/Validations'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'
import HeaderModal from '../../components/HeaderModal'
import InputView2 from '../../components/InputView2'
import BaseModal from '../../hoc/BaseModal'

class AddAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            country: '',
            county: '',
            postalCode: ''
        }
    }


    init = address => {

        // const {address} = this.props.route.params
        console.log('[AddAddress.js] Init : ', address)

        this.setState({
            addressLine1: address.addressLine1 !== undefined ? address.addressLine1 : '',
            addressLine2: address.addressLine2 !== undefined ? address.addressLine2 : '',
            city: address.city,
            state: address.state,
            country: address.country,
            county: address.county,
            postalCode: address.postalCode
        })

    }

    _onSaveAddress = () => {

        const { addressLine1, addressLine2, city, state, country, county, postalCode } = this.state;

        const address = {
            id: `address_${generateRandomString(10)}`,
            addressLine1,
            addressLine2,
            city,
            state,
            country,
            county,
            postalCode
        }

        this.props.onSavePress(address)
        this.baseModal.hideModal()
    }



    render() {

        const { addressLine1, addressLine2, city, state, country, county, postalCode } = this.state;

        return (

            <BaseModal
                ref={ref => this.baseModal = ref}
            >
                <HeaderModal
                    title={'Add Address'}
                    onCrossPress={() => this.baseModal.hideModal()}
                />
                <View style={styles.parent}>

                    <InputView2
                        label='Address Line 1'
                        placeholder={'House no., street name,'}
                        value={addressLine1}
                        onChangeText={text => this.setState({ addressLine1: text })}
                        style={{ marginTop: 16 }}
                    />
                    <View style={styles.row}>

                        <InputView2
                            label='City'
                            placeholder={'City'}
                            value={city}
                            onChangeText={text => this.setState({ city: acceptOnlyCharacters(text) })}
                            style={styles.rightMargin}
                        />
                        <InputView2
                            label='State'
                            placeholder={'State'}
                            value={state}
                            onChangeText={text => this.setState({ state: acceptOnlyCharacters(text) })}
                            style={styles.leftMargin}
                        />
                    </View>
                    <View style={styles.row}>
                        <InputView2
                            label='Country'
                            placeholder={'Country'}
                            value={country}
                            onChangeText={text => this.setState({ country: acceptOnlyCharacters(text) })}
                            style={styles.rightMargin}
                        />
                        <InputView2
                            label='Postal Code'
                            placeholder={'Postal Code'}
                            value={postalCode}
                            onChangeText={text => this.setState({ postalCode: text })}
                            style={styles.leftMargin}
                            maxLength={6}
                            keyboardType={'number-pad'}
                        />
                    </View>

                    <ButtonView
                        title={'Save Address'}
                        onPress={() => this._onSaveAddress()}
                        parentStyle={{ marginTop: 24 }}
                        buttonStyle={{ backgroundColor: colors.accent, borderColor: colors.accent }}
                    />
                </View>

            </BaseModal>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        // flex:1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingBottom: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    rightMargin: {
        flex: 1,
        marginRight: 8
    },
    leftMargin: {
        flex: 1,
        marginLeft: 8
    }

});



export default AddAddress;

