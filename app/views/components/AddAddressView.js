import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import InputView2 from './InputView2';


const AddAddressView = props => {

    const { onAddAddress, address, error, touched } = props;

    return (
        <View>
            <TouchableOpacity

                onPress={onAddAddress}
            >
                <View style={styles.addAddressView}>
                    <Icon
                        name='map-search'
                        type='material-community'
                        size={20}
                        color={colors.darkBlueColor}
                    />
                    <Text style={styles.addAddressText}>{address === null ? 'Add' : 'Update'} Location</Text>
                </View>
            </TouchableOpacity>
            {
                error && touched
                &&
                <Text style={[styles.label, { color: colors.primary }]}>{error}</Text>
            }

            {
                address !== undefined && address !== null
                &&
                <View>
                    <InputView2
                        hasLabel
                        label={'Address'}
                        style={{ marginTop: 16 }}
                        textInputStyle={{ height: 144, marginTop: 16 }}
                        multiline
                        // value={address !== undefined && address !== null ? `${address.addressLine1}\nCity : ${address.city}\nState : ${address.state}\nPostal Code : ${address.postalCode}\nCountry : ${address.country},` : ''}
                        value={address !== undefined && address !== null ? `${address.addressLine1}\nCity : ${address.city}\nCountry : ${address.country},` : ''}
                        editable={false}
                    />

                    <TouchableOpacity
                        style={styles.iconPosition}
                        onPress={props.onEdit}
                    >
                        <View style={styles.iconView}>
                            <Icon
                                name="edit-3"
                                type='feather'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default AddAddressView

const styles = StyleSheet.create({
    addAddressView: {
        height: 48,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        borderRadius: 8,
        borderColor: '#C4c4c4',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    addAddressText: {
        fontSize: 14,
        fontFamily: fonts.notoSansMedium,
        paddingLeft: 8,
        color: colors.darkBlueColor
    },
    iconView: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#888',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconPosition: {
        position: 'absolute',
        right: 8,
        bottom: 8
    }
})
