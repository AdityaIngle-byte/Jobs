import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const SingleSelectItem = props => {

    const {hasIcon,iconName,iconType,iconColor} = props

    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.itemView,props.parentStyle]}>
            {
                hasIcon
                &&
                <Icon 
                     name={iconName}
                     type={iconType}
                     color={iconColor ? iconColor : colors.accent}
                     size={18}
                     containerStyle={{marginRight:12}}
                 />
            }
            <Text style={[styles.itemTitle,props.titleStyle]}>{props.title}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default SingleSelectItem

const styles = StyleSheet.create({
    itemView : {
        flexDirection:'row',
        height:48,
        alignItems:'center',
        paddingHorizontal:8,
        borderBottomWidth:1,
        borderBottomColor:'#f5f5f5'
    },
    itemTitle : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        flex:1
    },
})
