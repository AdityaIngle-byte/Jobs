import React from 'react'
import {Image,StyleSheet,Text,View} from 'react-native'
import { images } from '../../assets/images'
import { fonts } from '../../values/fonts'
// import TagButton from './TagButton'

const NoJobsAvailable = props => {
    return (
        <View style={[styles.parent,props.parentStyle]}>
            {
                props.hasImage
                &&
                <Image 
                    source={images.noJobsImage}
                    style={[styles.image,props.imageStyle]}
                    resizeMode='contain'
                />
            }
            <Text style={styles.msg}>{props.msg}</Text>
        </View>
    )
}

export default NoJobsAvailable

const styles = StyleSheet.create({
    parent : {

    },
    msg : {
        textAlign : 'center',
        fontSize:14,
        color:'#888',
        fontFamily:fonts.notoSansMedium
    },
    image : {
        height:144,
        width:144,
        alignSelf:'center'
    }
})
