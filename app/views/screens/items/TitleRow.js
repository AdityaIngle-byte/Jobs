import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {profileStyles} from '../profile/profileStyles'

const TitleRow = props => {
    return (
        <View style={[profileStyles.headingRow,props.parentStyle]}>
            <TouchableOpacity
                onPress={props.onTitlePress}
                disabled={props.disabled === 0 ? false : true}
            >

                <View style={{flexDirection:'row',alignItems:'center',paddingBottom:4}}>
                    {
                        props.hasIcon
                        &&
                        <Icon 
                            name={!props.hasReset ? 'plus' : 'minus'}
                            type='entypo'
                            size={16}
                        />
                    }
                    <Text style={[profileStyles.heading,props.titleStyle]}>{props.title}</Text>
                </View>
            </TouchableOpacity>
            {
                props.hasReset
                &&
                <TouchableOpacity
                    onPress={props.onReset}
                >
                    <Text style={[profileStyles.headingReset]}>Reset</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default TitleRow

