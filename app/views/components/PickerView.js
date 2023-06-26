import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const PickerView = props => {

    const { parentStyle,
        hasIcon, iconName, iconType, iconColor,
        label, isRequired, requiredColor,
        error, touched, errorColor, onPress, value, fontValueSize } = props;

    return (
        <View style={[styles.parent, parentStyle]}>
            {
                value !== ''
                &&
                <Text style={[styles.label]}>
                    {label}
                    {isRequired ? <Text style={[{ color: requiredColor ? requiredColor : colors.primary, fontSize: 16 }]}> *</Text> : ''}
                </Text>
            }
            <TouchableOpacity
                onPress={onPress}
                style={[props.pickerStyle]}
                disabled={props.disabled}
            >
                <View style={[styles.row, props.rowStyle]}>
                    {
                        hasIcon
                        &&
                        <Icon
                            name={iconName}
                            type={iconType}
                            color={iconColor ? iconColor : colors.accent}
                            size={18}
                        />
                    }
                    <Text style={[styles.value, { fontSize: fontValueSize }]}>{value}</Text>
                    <Icon
                        name='arrow-drop-down'
                        type='material'
                    />
                </View>
            </TouchableOpacity>
            {
                error && touched
                &&
                <Text style={[styles.error, { color: errorColor ? errorColor : colors.primary }]}>{error}</Text>
            }
        </View>
    )
}

export default PickerView

const styles = StyleSheet.create({
    parent: {
        // flex:1,

    },
    row: {
        height: 56,
        // borderColor:'#C4c4c4',
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#888',
        borderRadius: 8,
        backgroundColor: '#fff',
        // marginTop:4
    },
    label: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        color: '#888',
        position: 'absolute',
        paddingLeft: 8,
        zIndex: 100,
        paddingTop: 4
    },
    value: {
        // fontFamily:fonts.poppinsMedium,
        fontSize: 14,
        flex: 1,
        paddingLeft: 6,
        marginTop: 5
    },
    error: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        paddingLeft: 8
    },

})
