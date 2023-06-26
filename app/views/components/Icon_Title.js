import React  from 'react'
import {Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors } from '../../values/colors';

const Icon_Title = props => {

    const {iconName,iconType,title,iconColor,titleStyle,onIconPress,iconSize} = props;

    return (
        <View style={styles.container}> 
             <Icon 
                name={iconName}
                type={iconType}
                color={iconColor?iconColor:'#565555'}
                size={iconSize?iconSize:20}
                onPress={() => onIconPress()} 
            />
            <Text style={[styles.daysAgo,titleStyle]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    daysAgo:{
        fontSize:14,
        color:colors.black,
        fontWeight:'300',
        marginLeft:5
    },
    container:{
        flexDirection:"row",
        paddingHorizontal:10,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Icon_Title
