import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'react-native-elements'


export default function NoRecordFound({id}) {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.cardTitle}>{id}</Text>
        <Icon 
            name={'edit'}
            type={'AntDesign'}
            color={colors.black}
            size={20}
            onPress={() => alert()} 
        />
    </View>
    <View style={styles.body}>
        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
            <MaterialCommunityIcons 
                name={'message-off'}
                color={colors.accent}
                size={30}
                style={{marginBottom:10}}
            />
            <Text>No Record Found</Text>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        marginTop:20,
        padding:10,
        borderRadius:5
    },
    header:{
        paddingLeft:15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    cardTitle:{
        fontSize:16,
        color:colors.black,
        fontWeight:"bold",
    },
    body:{
        paddingHorizontal:13,
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:15,
        marginBottom:10
    },
    cardBodyHeader:{
        fontSize:15,
        color:colors.black,
    },
})