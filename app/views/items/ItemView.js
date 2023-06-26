import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fonts } from '../../values/fonts'

const ItemView = props => {
    return (
        <View style={[styles.itemView]}>
            <Text style={styles.value}>{props.value}</Text>
        </View>
    )
}

export default ItemView

const styles = StyleSheet.create({
    itemView : {
        height:32,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:16,
        backgroundColor:'#E4ECF7',
        marginTop:16,
        marginRight:12,
        borderRadius:4
    },
    value : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:'#1B1B1B',
        textTransform :'capitalize'
    },
})
