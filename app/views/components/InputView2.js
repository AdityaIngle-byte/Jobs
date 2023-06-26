import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import * as Animatable from 'react-native-animatable';


const focusColor = colors.accent
const defaultColor = '#888'

const InputView2 = props => {

    const { parentStyle, label, isRequired, error, touched, errorColor, focusedColor,
        value, onChangeText, textInputViewStyle, editable } = props;

    const [tintColor, setTintColor] = useState(defaultColor)

    const _focusColor = focusedColor ? focusedColor : focusColor

    return (
        <View style={props.style}>
            <View style={[styles.mainParent, { borderColor: tintColor, }, parentStyle]}>

                {
                    value !== ''
                    &&
                    <Animatable.Text
                        style={[styles.label, { color: tintColor }]}
                        animation="fadeIn"
                        easing="ease-in-out"
                        duration={1000}
                    >
                        {label}
                        {isRequired ? <Text style={[{ color: colors.primary }]}> *</Text> : ''}
                    </Animatable.Text>
                }
                <View style={[styles.parent, textInputViewStyle]}>

                    <TextInput
                        style={[styles.textInput, props.textInputStyle]}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={props.placeholder}
                        placeholderTextColor={colors.placeholderTextColor}
                        keyboardType={props.keyboardType}
                        onFocus={() => setTintColor(_focusColor)}
                        onBlur={() => {
                            setTintColor(defaultColor)
                        }}
                        secureTextEntry={props.secureTextEntry}
                        maxLength={props.maxLength}
                        multiline={props.multiline}
                        editable={editable}
                        blurOnSubmit={true}
                    />
                    {
                        props.hasIcon
                        &&
                        <TouchableOpacity
                            style={styles.iconStyle}
                            onPress={props.onIconPress}
                        >
                            <Icon
                                name={props.iconName}
                                type={props.iconType}
                                color={props.iconColor ? props.iconColor : '#888'}
                                size={18}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {
                error && touched
                &&
                <Text style={[styles.error, { color: errorColor ? errorColor : colors.primary }]}>{error}</Text>
            }
        </View>
    )
}

export default InputView2

const styles = StyleSheet.create({
    mainParent: {
        // height:56,
        borderWidth: 0.5,
        borderRadius: 8,
    },
    parent: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    textInput: {
        color: '#000000',
        fontFamily: fonts.notoRegular,
        flex: 1,
        height: 56,
        fontSize: 16,
        paddingLeft: 8,
        marginTop: 5
    },
    iconStyle: {
        // marginTop:16,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    label: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        color: '#888',
        position: 'absolute',
        left: 8,
        zIndex: 100,
        paddingTop: 4,
    },
    error: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        color: '#888',
    }
})
