import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../../values/colors'
import { fonts } from '../../../values/fonts'

const EducationItem = props => {

    const { item, index } = props;

    return item.school ? (
        <View style={styles.parent}>
            <View style={styles.row}>

                <Text style={styles.titleText}>{item.school}</Text>
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
            <Text style={styles.text2}>{item?.graduatedYear ? item?.graduatedYear : item?.year} {((item?.graduatedYear || item?.year) && (item?.educationProgram || item?.program)) ? ' | ' : null}{item?.educationProgram ? item?.educationProgram : item?.program}</Text>
            {
                item?.educationType ? <Text style={[styles.text2, { color: colors.defaultTextColor }]}>{item.educationType}</Text> : null
            }
            {
                item?.major ? <Text style={[styles.text2, { color: colors.defaultTextColor }]}>{item?.major}</Text> : null
            }

        </View>
    ) : (<></>)
}

export default EducationItem

const styles = StyleSheet.create({
    parent: {
        backgroundColor: '#fff',
        // marginRight:8,
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
    // trashIcon : {
    //     height:24,
    //     width:24,
    //     borderRadius:12,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     backgroundColor:'#fff'
    // },
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
})
