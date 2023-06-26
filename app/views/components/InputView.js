import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { IconButton } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { fonts } from '../../values/fonts';
import { colors } from '../../values/colors';


export default function InputView(props) {

    const { label, isRequired, error, touched, errorColor, focusedColor,
        value, onChangeText, textInputViewStyle, editable, iconName, iconType, placeholder, hasRightIcon, parentStyle, iconColor, placeholderTextColor, outlineStyle, noIcon, activeOutlineColor, outlineColor } = props;

    if (noIcon) {
        return (
            <>
                <TextInput
                    label={label}
                    activeOutlineColor={activeOutlineColor}
                    outlineColor={outlineColor}
                    style={[styles.mainParent, parentStyle]}
                    mode="outlined"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={onChangeText}
                    outlineStyle={outlineStyle}
                />
                {
                    error && touched
                    &&
                    <Text style={[styles.error, { color: errorColor ? errorColor : colors.primary }]}>{error}</Text>
                }
            </>
        )
    }
    return (
        hasRightIcon ?
            <>
                <TextInput
                    label={label}
                    activeOutlineColor={focusedColor}
                    style={[styles.mainParent, parentStyle]}
                    mode="outlined"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    right={
                        <TextInput.Icon
                            icon={iconName}
                            onPress={() => alert()}
                            iconColor={iconColor}
                        />
                    }
                    onChangeText={onChangeText}
                    outlineStyle={outlineStyle}
                />
                {
                    error && touched
                    &&
                    <Text style={[styles.error, { color: errorColor ? errorColor : colors.primary }]}>{error}</Text>
                }
            </>
            :
            <>
                <TextInput
                    label={label}
                    activeOutlineColor={focusedColor}
                    style={[styles.mainParent, parentStyle]}
                    mode="outlined"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    left={
                        <TextInput.Icon
                            icon={iconName}
                            onPress={() => alert()}
                            iconColor={iconColor}
                        />
                    }
                    onChangeText={onChangeText}
                    outlineStyle={outlineStyle}
                />
                {
                    error && touched
                    &&
                    <Text style={[styles.error, { color: errorColor ? errorColor : colors.primary }]}>{error}</Text>
                }
            </>
    )
}

const styles = StyleSheet.create({
    mainParent: {
        margin: 2,
    },
    error: {
        fontFamily: fonts.notoRegular,
        fontSize: 12,
        color: '#888',
    }
})