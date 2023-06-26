import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import { Icon } from 'react-native-elements'
import NoDataView from '../components/NoDataView'
import { getFullMonth } from '../../utils/DateTimeValidations'

export default function ProfileCardView(props) {

    const { item, title, onEditProfileEdu_Exp } = props;
    const length_item = item ? (title == 'Education' ? (item?.filter((i) => i.school !== '')).length : (item?.filter((i) => i.employerName !== '')).length) : 0;


    const _renderExperienceItem = (it, index) => {
        console.log(it);
        const startDate = new Date(it.startDate);
        const endDate = new Date(it.endDate);

        // Calculating Start Month and Year from Date
        var getStartMonthTemp = startDate.getMonth();
        var getStartYear = startDate.getFullYear()
        var getStartMonth = getFullMonth(getStartMonthTemp);

        // Calculating End Month and Year from Date

        var getEndMonthTemp = endDate.getMonth();
        var getEndYear = endDate.getFullYear()
        var getEndMonth = getFullMonth(getEndMonthTemp);

        return it.employerName != '' ? (
            <View style={styles.body}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Icon
                        name={'briefcase'}
                        type={'font-awesome'}
                        color={'#949292'}
                        size={20}
                    />
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Text style={styles.cardBodyHeader}>{it.employerName}</Text>
                        <Text style={styles.cardBodySubHeader}>{it.jobTitle}</Text>
                        <Text style={styles.cardBodyText}>
                            {it.startDate ? 'From: ' + getStartMonth + ' ' + getStartYear : null}
                            {it.endDate ? ' To: ' + getEndMonth + ' ' + getEndYear : null}
                        </Text>
                        {
                            it.description &&
                            <Text style={[styles.cardBodyText, { fontSize: 11, fontWeight: '400' }]}>{it.description}</Text>
                        }
                    </View>
                </View>
                <View>
                    <Icon
                        name={'trash'}
                        type={'font-awesome'}
                        color={'#949292'}
                        size={20}
                        onPress={() => onEditProfileEdu_Exp(title == 'Education' ? 'ProfileEducation' : 'ProfileExperience')}
                    />
                </View>
            </View>
        ) : (<></>)
    }

    const _renderEducationItem = (it, index) => {
        return it.school ? (
            <View style={styles.body}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Icon
                        name={'graduation-cap'}
                        type={'font-awesome'}
                        color={'#949292'}
                        size={20}
                    />
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Text style={styles.cardBodyHeader}>{it.school}</Text>
                        <Text style={styles.cardBodySubHeader}>{it.graduatedYear} | {it.educationProgram}</Text>
                    </View>
                </View>
                <View>
                    <Icon
                        name={'trash'}
                        type={'font-awesome'}
                        color={'#949292'}
                        size={20}
                        onPress={() => onEditProfileEdu_Exp(title == 'Education' ? 'ProfileEducation' : 'ProfileExperience')}
                    />
                </View>
            </View>
        ) : (<></>)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Icon
                    name={'edit'}
                    type={'AntDesign'}
                    color={colors.black}
                    size={20}
                    onPress={() => onEditProfileEdu_Exp(title == 'Education' ? 'ProfileEducation' : 'ProfileExperience')}
                />
            </View>
            {
                length_item > 0 ?
                    item.map((it, index) => (
                        title == 'Education'
                            ? _renderEducationItem(it, index)
                            : _renderExperienceItem(it, index)
                    ))
                    :
                    <NoDataView
                        hasImage
                        msg={'No Record Found'}
                        parentStyle={{ marginTop: 20 }}
                    />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        flex: 1
    },
    cardTitle: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
    cardBodyHeader: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
    header: {
        paddingLeft: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    body: {
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        flex: 1
    },
    cardBodySubHeader: {
        fontSize: 13,
        color: colors.black,
        fontWeight: '400',
        marginVertical: 10
    },
    cardBodyText: {
        fontSize: 12,
        color: colors.black,
        fontWeight: '300',
        marginBottom: 15,
    },
})