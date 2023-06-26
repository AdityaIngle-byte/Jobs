import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';

const TagButton = props => {

    const { title, containerStyle, buttonStyle, titleStyle, onPress, isSelected, hasNotifications = false, size } = props;

    let height = 32;
    let fontSize = 14

    if (size === 'medium') {
        height = 28;
        fontSize = 12;
    } else if (size === 'small') {
        height = 24;
        fontSize = 10;
    } else if (size === 'mini') {
        height = 18;
        fontSize = 10;
    } else if (size === 'large') {
        height = 32;
        fontSize = 12;
    }

    return (
        <View style={[{ marginRight: 12 }, props.parentStyle]}>

            <Button
                title={title}
                titleStyle={[styles.titleStyle, {
                    color: isSelected ? '#fff' : '#1B1B1B',
                    fontSize: fontSize
                }, titleStyle]}
                containerStyle={[styles.containerStyle, { height: height }, containerStyle]}
                buttonStyle={[styles.buttonStyle, {
                    backgroundColor: isSelected ? colors.accent : '#FFFFFF',
                    borderColor: isSelected ? colors.accent : '#EDEDED',
                    height: height
                }, buttonStyle]}
                onPress={onPress}
                disabled={props.disabled}
                disabledStyle={[{
                    backgroundColor: '#fff',
                    borderColor: '#EDEDED',
                    height: height
                },
                props.disabledStyle]}
                disabledTitleStyle={[{
                    color: '#1B1B1B',
                    fontSize: fontSize
                }, props.disabledTitleStyle]}
            />

            {/* {
                hasNotifications
                &&
                <Text style={styles.dot}>•</Text>
            } */}

        </View>
    )
}

export default TagButton

const styles = StyleSheet.create({
    containerStyle: {
        height: 32,
        marginTop: 8,
    },
    buttonStyle: {
        paddingVertical: 0,
        height: 32,
        paddingHorizontal: 12,
        borderWidth: 1,
        // marginTop:0
    },
    titleStyle: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontSize: 14,
        fontWeight: '400',

        // paddingTop:0
        // marginTop:0
    },
    dot: {
        position: 'absolute',
        right: 0, top: -2,
        color: '#3AB549',
        fontSize: 28
    },
})



{/* <Icon 
                    name='dot-single'
                    type='entypo'
                    color={'#3AB549'}
                    containerStyle={styles.iconStyle}
                /> */}