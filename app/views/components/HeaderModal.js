import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const HeaderModal = props => {
    return (
        <View style={[styles.parent, props.parentStyle]}>
            <Text style={styles.title}>{props.title}</Text>
            {
                !props.noCross
                &&
                <TouchableOpacity
                    style={styles.iconView}
                    onPress={props.onCrossPress}
                >
                    <Icon
                        name='close'
                        type='ant-design'
                        size={28}
                        color={'#000'}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default HeaderModal

const styles = StyleSheet.create({
    parent: {
        height: 56,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        fontFamily: fonts.notoSansBold,
        color: '#000',
        fontSize: 20,
        paddingLeft: 16,
        flex: 1
    },
    iconView: {
        padding: 8,
        marginRight: 8
    }
})
