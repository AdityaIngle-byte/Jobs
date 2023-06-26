import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const JobDetailItem = props => {
    return (
        <View style={styles.itemView}>
            <Icon 
                name={props.iconName}
                type={props.iconType}
                color={colors.accent}
                size={props.iconSize ? props.iconSize : 18}
            />
            <View>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Text style={styles.itemValue}>{props.value}</Text>
            </View>
        </View>
    )
}

export default JobDetailItem

const styles = StyleSheet.create({
    itemView : {
        flexDirection:'row',
        // marginBottom:16,
        alignItems:'center',
        borderBottomWidth:0.5,borderBottomColor:'#e0e0e0',
        paddingVertical:12
    },
    itemTitle : {
        fontSize:10,
        fontFamily:fonts.notoSansRegular,
        color:'#888',
        paddingLeft:12,
        textTransform:'capitalize'
    },
    itemValue : {
        fontSize:14,
        fontFamily:fonts.notoSansMedium,
        color:colors.accent,
        paddingLeft:12,
        textTransform:'capitalize'
    },
})
