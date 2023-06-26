import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { AirbnbRating, Icon } from 'react-native-elements'
import { colors } from '../../../values/colors'
import { fonts } from '../../../values/fonts'

const ProfileSkillItem = props => {

    const { item, index, flag } = props;

    return (
        <TouchableOpacity
            disabled={flag === 0}
            onPress={props.onSkillPress}
        >
            <View style={styles.parent}>
                <View style={styles.row}>
                    <Text
                        style={styles.titleText}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >{item.skill}</Text>
                </View>
                <TouchableOpacity
                    onPress={props.onDelete}
                    style={{ paddingLeft: 8 }}
                >
                    <Icon
                        name='trash-2'
                        type='feather'
                        size={20}
                        color={'#97A3AD'}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileSkillItem

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        // marginRight:8,
        marginTop: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center'
    },

    titleText: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 16,
        color: colors.accent,
        flex: 1
    }
})
