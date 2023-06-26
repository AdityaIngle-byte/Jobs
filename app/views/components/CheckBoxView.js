import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { images } from '../../assets/images';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';

const CheckBoxView = props => {

    const {title,checked,onPress,hasCheckView = true, value} = props;

    return (
        <View style={[styles.checkParent,props.parentStyle]}>
            <Text style={styles.checkText}>{title}</Text>
            {
                hasCheckView
                ?
                <TouchableOpacity onPress={onPress}>
                    <Image
                        source={checked ? images.check : images.unchecked}
                        style={styles.image}
                    />
                </TouchableOpacity>
                :
                <Text>{value}</Text>
            }
        </View>
    )
}

export default CheckBoxView

const styles = StyleSheet.create({

    checkParent : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:12
    },
    checkText : {
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        fontSize:14,
        flex:1,
        marginRight:12
    },
    image : {
        height:20,
        width:28
    }
})
