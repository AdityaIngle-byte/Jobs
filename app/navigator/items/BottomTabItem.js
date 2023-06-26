import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import { images } from '../../assets/images'


export const BottomTabItem = props => {
console.log(props)
    const isFocused = props.isFocused

    return(
        <TouchableOpacity 
            style={{flex:1}}
            onPress={props.onPress}
        >
            <View>
                {
                   isFocused
                   &&
                   <Image 
                        source={images.arcImage}
                        style={styles.arcImage}
                        resizeMode='center'
                    />
                }
                <View style={[styles.itemView]}>
                    {
                        props.hasBadge
                        &&
                        <View style={[styles.badgeView,{top:10,backgroundColor:isFocused ? colors.primary : colors.accent }]}>
                            <Text style={styles.badgeText}>9+</Text>
                        </View>
                    }
                    <Icon 
                        name={props.iconName}
                        type={props.iconType ? props.iconType : 'FontAwesome'}
                        color={isFocused ? colors.primary : '#626262'}
                        size={props.iconSize ? props.iconSize : 20}
                    />
                    <Text style={[styles.itemText,{
                            fontSize:12,
                            color:isFocused ? colors.primary : '#626262'
                        }]}>{props.title}
                    </Text>
                    {
                        isFocused
                        &&
                        <View style={[styles.bottomItemView]}/>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
   
    itemView : {
        height:Platform.OS === 'ios' ? 84 : 64,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:Platform.OS === 'ios' ? 16 : 0,
        
    },
    itemText : {
        fontFamily:fonts.poppinsMedium,
        fontSize:12,
        color:'#888'
    },
    badgeView : {
        height:16,
        width:16,
        position:'absolute',
        top:2,right: 16,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.primary,
        borderRadius:10

    },
    badgeText : {
        fontFamily:fonts.poppinsSemiBold,
        fontSize:8,
        color:'#fff'
    },
    bottomItemView : {
        height:4,
        width:28,
        backgroundColor: colors.primary,
        marginTop:8,
        borderTopRightRadius:4,
        borderTopLeftRadius:4
    },
    arcImage : {
        height:12,
        width:84,
        overflow:'hidden',
        backgroundColor: 'transparent',
    }
})

