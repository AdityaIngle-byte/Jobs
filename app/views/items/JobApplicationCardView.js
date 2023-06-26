import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import { Icon } from 'react-native-elements'
import Icon_Title from '../components/Icon_Title'
import { getDiffInDaysFromToday } from '../../utils/DateTimeValidations';
import moment from 'moment';



export default function JobApplicationCardView(props) {

    const { item, index, jobApplication } = props

    const statusColor = () => {
        switch (item.statusName === "Pending" ? "Offered" : item.statusName === "Rejected" ? "Disqualified" : item.statusName) {
            case 'Pending':
                return colors.notAttemptColor
            case 'Offered':
            case 'Hired':
                return colors.appliedColor
            case 'Rejected':
                return colors.hotJobColor
            case 'Shortlisted':
                return colors.acceptBtn
            case 'Submitted':
                return colors.newColor
            default:
                return colors.black
        }
    }



    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPressItem}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.cardTitle}>{item.jobTitle}</Text>
                    {/* <Text style={styles.daysAgo}>{`${getDiffInDaysFromToday(item.createdDate)} days ago`}</Text> */}

                    {
                        jobApplication && <Text style={styles.daysAgo}>{moment(new Date(item.updatedDate)).format("MM/DD/YYYY")}</Text>
                    }
                </View>
                <View style={styles.body}>
                    <Icon_Title
                        title={item.jobLocation}
                        iconName='place'
                        iconType='material'
                        titleStyle={{ fontSize: 13, fontWeight: '400' }}
                    />
                    <Icon_Title
                        title={item.jobType}
                        iconName='briefcase'
                        iconType='font-awesome'
                        titleStyle={{ fontSize: 13, fontWeight: '400' }}
                        iconSize={15}
                    />
                </View>
                {
                    jobApplication &&
                    <View style={[styles.body]}>
                        <Icon_Title
                            title={item.statusName === "Pending" ? "Offered" : item.statusName === "Rejected" ? "Disqualified" : item.statusName}
                            iconName='file'
                            iconType='font-awesome'
                            titleStyle={{ fontSize: 13, fontWeight: '500', color: statusColor() }}
                            iconSize={15}
                            iconColor={statusColor()}
                        />
                    </View>
                }
                {
                    !jobApplication &&
                    <View style={[styles.body]}>
                        <Icon_Title
                            title={'14 days ago'}
                            iconName='clock'
                            iconType='feather'
                            titleStyle={{ fontSize: 13, fontWeight: '500' }}
                            iconSize={15}

                        />
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 5,
        marginTop: 30,
        paddingBottom: 10,
        marginHorizontal: 15
    },
    cardTitle: {
        fontSize: 20,
        color: colors.black,
        fontWeight: "bold",
    },
    header: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    daysAgo: {
        fontSize: 13,
        color: colors.black,
        fontWeight: '300'
    },
    body: {
        paddingHorizontal: 10,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10
    },
})