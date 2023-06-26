

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const JobTypeItem = props => {
    return (
        <View style={[styles.jobTypeView,props.parentStyle]}>
            <Text style={styles.jobTypeText}>{props.name}</Text>
        </View>
    )
}

export default JobTypeItem

const styles = StyleSheet.create({
    jobTypeView : {
        height:28,
        // borderWidth:1,
        backgroundColor:'#dcedff',
        borderColor:'dcedff',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        paddingHorizontal:8,
        marginRight:12
        
    },
    jobTypeText : {
        color:'#1B1B1B',
        fontFamily:fonts.notoSansMedium,
        fontSize:10,
        textTransform:'capitalize'
    },
})
