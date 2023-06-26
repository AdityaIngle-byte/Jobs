import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../../values/colors'
import { fonts } from '../../../values/fonts'

const ExperienceItem = props => {

    const { item, index } = props;

    return item.employerName ? (
        <View style={styles.parent}>
            <View style={styles.row}>
                <Text style={styles.titleText}>{item.employerName}</Text>
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
            <Text style={styles.text2}>{item.jobTitle}</Text>
            <Text style={styles.text2}>Duration
                <Text style={styles.titleText}> {item.startDate} {item.endDate ? '-' : null} {item.isSelect ? 'Present' : (item.endDate ? item.endDate : null)} </Text>
            </Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    ) : (<></>)
}

export default ExperienceItem

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        marginTop: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: fonts.notoSansBold,
        fontSize: 16,
        color: colors.accent,
        flex: 1
    },
    text2: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 14,
        color: colors.accent,
        marginTop: 4
    },
    description: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 10,
        color: '#888',
        marginTop: 4
    }
})
