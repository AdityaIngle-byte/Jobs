import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../values/colors'
import ButtonView from '../components/ButtonView'

const JobDetailBottomView = props => {

    const {hasFavIcon, hasShareIcon, style, onShare, onFav, onDiscard, onApply} = props;

    return (
        <View style={[styles.parent,style]}>
            <ButtonView 
                title={'Apply Now'}
                containerStyle={{marginTop:0,flex:1,}}
                buttonStyle={{paddingVertical:0,backgroundColor:colors.lightgreen,borderRadius:4,borderColor:colors.lightgreen}}
                onPress={onApply}
                size='medium'
            />
        </View>
    )
}

export default JobDetailBottomView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:12,
        paddingVertical:0,
        paddingHorizontal:12
    },
    iconView : {
        height:32,
        width:32,
        borderRadius:16,
        backgroundColor: '#EDEDED',
        alignItems:'center',
        justifyContent:'center'
    }
})
