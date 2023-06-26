import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import { Icon } from 'react-native-elements'
import NoRecordFound from '../components/NoRecordFound'


export default function Email_SocialMediaCard(props) {

    const { socialMedia, email, id, onEditSocialMedia } = props;

    // if(!email || !socialMedia){
    //     return(
    //         <NoRecordFound id={id}/>
    //     )
    // }

    if (id == 'Email') {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.cardTitle}>Email</Text>
                    {/* <Icon 
                        name={'edit'}
                        type={'AntDesign'}
                        color={colors.black}
                        size={20}
                        onPress={() => alert()} 
                    /> */}
                </View>
                <View style={styles.body}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            name={'envelope'}
                            type={'font-awesome'}
                            color={'#949292'}
                            size={18}
                        />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.cardBodyHeader}>{email}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    (id == 'Email' && !email) &&
        <NoRecordFound id={id} />

    (id == 'Social Media' && !socialMedia) &&
        <NoRecordFound id={id} />

    if (id == 'Social Media') {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.cardTitle}>Social Media</Text>
                    <Icon
                        name={'edit'}
                        type={'AntDesign'}
                        color={colors.black}
                        size={20}
                        onPress={() => onEditSocialMedia('SocialMedia')}
                    />
                </View>
                <View style={styles.body}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            name={'link'}
                            type={'font-awesome'}
                            color={'#949292'}
                            size={18}
                        />
                        <View style={{ marginLeft: 15 }}>
                            {
                                socialMedia?.facebook != '' &&
                                <Text style={styles.cardBodyHeader}>{socialMedia?.facebook}</Text>
                            }

                            {
                                socialMedia?.twitter != '' &&
                                <Text style={styles.cardBodyHeader}>{socialMedia?.twitter}</Text>
                            }

                            {
                                socialMedia?.website != '' &&
                                <Text style={styles.cardBodyHeader}>{socialMedia?.website}</Text>
                            }

                            {
                                socialMedia?.linkedIn != '' &&
                                <Text style={styles.cardBodyHeader}>{socialMedia?.linkedIn}</Text>
                            }

                            {
                                (socialMedia?.facebook == '' && socialMedia?.twitter == '' && socialMedia?.website == '' && socialMedia?.linkedIn == '')
                                &&
                                <Text style={styles.cardBodyHeader}>{'eg. LinkedIn ID'}</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return null;
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
        paddingHorizontal: 13,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 10
    },
    cardBodyHeader: {
        fontSize: 15,
        color: colors.black,
    },
})