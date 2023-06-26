import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getDocument } from '../../utils/DocPicker'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function UploadResumeCard(props) {
    const { item, onUpload, onDelete } = props;
    const fileName = item[0]?.fileName;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cardTitle}>Resume Details</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.subbody}>
                    {
                        item.length > 0 ?
                            <>
                                <View style={styles.resumeLineStyle}>
                                    <Text style={styles.uploadHereText}>My Resume</Text>
                                </View>
                                <View style={styles.innerBackground}>

                                    <View style={styles.resumeBodyStyle}>
                                        <AntDesignIcon
                                            name='checkcircle'
                                            size={25}
                                            color={colors.lightgreen}
                                        />
                                        <Text style={{ marginLeft: 10, color: colors.black, flex: 1 }}>{fileName}</Text>
                                    </View>

                                    <View style={styles.deleteResume}>
                                        <AntDesignIcon
                                            name='delete'
                                            size={22}
                                            color={'#949292'}
                                            onPress={() => onDelete(fileName)}
                                        />
                                    </View>
                                </View>
                            </>
                            :
                            <>
                                <View style={styles.resumeLineStyle}>
                                    <View>
                                        <Text style={styles.uploadResumeText}>Upload Resume </Text>
                                    </View>
                                    <TouchableOpacity onPress={onUpload} style={{ flexDirection: 'row' }}>
                                        <AntDesignIcon
                                            name='clouduploado'
                                            size={20}
                                            color='#484848'
                                        />
                                        <Text style={{ color: '#484848', paddingLeft: 2 }}>Upload</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
                                    <Icon
                                        name='users-slash'
                                        size={25}
                                        color={'#949292'}
                                    />
                                    <Text>No Resume Found</Text>
                                </View>
                            </>
                    }
                </View>
                {/* <View style={{flexDirection:"row"}}>
                <Icon 
                    name={'envelope'}
                    type={'font-awesome'}
                    color={'#949292'}
                    size={18}
                />
                <View style={{marginLeft:15}}>
                    <Text style={styles.cardBodyHeader}>adityaingle39@gmail.com</Text>
                </View>
            </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginTop: 20,
        padding: 10,
        borderRadius: 5
    },
    header: {
        paddingLeft: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    cardTitle: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
    body: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 10,
    },
    cardBodyHeader: {
        fontSize: 15,
        color: colors.black,
    },
    resumeLineStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#BEB9B9',
        paddingBottom: 6,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    subbody: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10
    },
    uploadHereText: {
        color: '#151515',
        fontWeight: '500',
    },
    uploadResumeText: {
        color: '#484848',
        marginLeft: 5,
        fontSize: 14
    },
    innerBackground: {
        backgroundColor: '#F6F6F6',
        marginHorizontal: 5,
        marginVertical: 10,
        flexDirection: "row",
        padding: 5,
        // flexWrap: 'wrap'
    },
    resumeBodyStyle: {
        flexDirection: "row",
        flex: 1,
        // justifyContent:"center",
        alignItems: "center",
    },
    deleteResume: {
        flexDirection: "row",
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    }

})