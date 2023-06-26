import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../values/colors'
import DropShadow from 'react-native-drop-shadow'
import CircularProgress from 'react-native-circular-progress-indicator';
import { Icon } from 'react-native-elements';
import { generateRandomColorFromArray } from '../../utils/RandomColor';
import * as Progress from 'react-native-progress';


export default function ProfileCompletionView(props) {

    const { item, _onEditPress, percentage } = props;
    const firstName = item?.firstName ? item?.firstName : 'NA';
    const lastName = item?.lastName;
    const currentJobTitle = item?.currentJobTitle ? item?.currentJobTitle : 'NA'
    const city = item?.address.city ? item?.address.city : 'NA'
    const country = item?.address.country ? item?.address.country : 'NA'
    const initials = firstName?.charAt(0) + lastName?.charAt(0);

    return (
        <DropShadow
            style={styles.dropShadow}
        >
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.profileCompletionCircle}>
                        {/* title={`${progressValue}%`}
                    radius={40}
                    value={progressValue}
                    maxValue={100}
                    initialValue={progressValue} // Change the progres bar 
                    progressValueColor={'#fff'}
                    activeStrokeWidth={3}
                    inActiveStrokeWidth={3}
                    activeStrokeColor={colors.newColor}
                    inActiveStrokeColor={'lightgray'}
                    circleBackgroundColor={colors.white}
                    titleColor={colors.black}
                    titleStyle={{ fontWeight: 'bold', flex: 1, marginTop: 5 }}
                    strokeColorConfig={[
                        { color: colors.hotJobColor, value: 10 },
                        { color: colors.notAttemptColor, value: 40 },
                        { color: colors.newColor, value: 100 },
                    ]} */}
                        <CircularProgress
                            radius={42}
                            maxValue={100}
                            initialValue={percentage}
                            value={percentage}
                            title={initials}
                            titleStyle={styles.nameInitials}
                            circleBackgroundColor={generateRandomColorFromArray()}
                            showProgressValue={false}
                            activeStrokeWidth={4}
                            inActiveStrokeWidth={6}
                            inActiveStrokeColor={colors.white}

                            strokeColorConfig={[
                                { color: colors.hotJobColor, value: 10 },
                                { color: colors.editTextColor, value: 40 },
                                { color: colors.newColor, value: 75 },
                            ]}
                        />

                        <View style={{ marginTop: 6 }}>
                            <Text style={{ color: colors.black, fontSize: 10, fontWeight: "bold" }}>{percentage + '%'}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
                        <Text style={styles.jobTitle}>{currentJobTitle}</Text>
                        <Text style={styles.address}>{city + ', ' + country}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-start", marginTop: 25, marginLeft: 95 }}>
                        <Icon
                            name={'edit'}
                            type={'AntDesign'}
                            color={colors.black}
                            size={20}
                            onPress={() => _onEditPress('ContactInfo')}
                        />
                    </View>
                </View>
            </View>
        </DropShadow>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: 150,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    profileCompletionCircle: {
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        margin: 30,
    },
    nameInitials: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 20
    },
    name: {
        fontWeight: "bold",
        color: colors.black,
        fontSize: 20,
    },
    jobTitle: {
        fontWeight: '400',
        color: colors.black,
        fontSize: 13,
    },
    address: {
        fontSize: 10,
        color: '#383838'
    }
})