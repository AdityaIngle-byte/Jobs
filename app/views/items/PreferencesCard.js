import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../values/colors'
import { Icon } from 'react-native-elements'
import { fonts } from '../../values/fonts'


export default function PreferencesCard(props) {

    const { preference, onEditPreferences } = props;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cardTitle}>Preferences</Text>
                <Icon
                    name={'edit'}
                    type={'AntDesign'}
                    color={colors.black}
                    size={20}
                    onPress={() => onEditPreferences('EditPreferences')}
                />
            </View>
            <View style={styles.body}>
                <View style={{ justifyContent: "space-between", flexDirection: "row", flex: 1 }}>
                    <View>
                        <View style={[styles.preferencesLineStyle, styles.preferencesWrapperContent, { marginBottom: 6 }]}>
                            <Text style={styles.preferencesTextStyle}>Minimum annual salary</Text>
                        </View>
                        <View style={[styles.preferencesLineStyle, styles.preferencesWrapperContent, { marginBottom: 6 }]}>
                            <Text style={styles.preferencesTextStyle}>Minimum annual salary</Text>
                        </View>
                        <View style={[styles.preferencesLineStyle, styles.preferencesWrapperContent, { marginBottom: 6 }]}>
                            <Text style={styles.preferencesTextStyle}>Open for hybrid ?</Text>
                        </View>
                        <View style={[styles.preferencesLineStyle, styles.preferencesWrapperContent, { marginBottom: 6 }]}>
                            <Text style={styles.preferencesTextStyle}>Open for remote ?</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.preferencesTextStyleValues}>
                                {preference?.preferredSalary ? new Intl.NumberFormat("en-US", { style: "currency", currency: preference?.preferredSalaryCurrency ? `${preference?.preferredSalaryCurrency.slice(0, 3)}` : "USD", maximumSignificantDigits: 3, }).format(preference?.preferredSalary) : "NA"}{" "}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.preferencesTextStyleValues}>
                                {preference?.minContractRate ? new Intl.NumberFormat("en-US", { style: "currency", currency: preference?.minContractRateCurrency ? `${preference?.minContractRateCurrency.slice(0, 3)}` : "USD", maximumSignificantDigits: 3, }).format(preference?.minContractRate) : "NA"}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.preferencesTextStyleValues}>
                                {preference?.preferedLocations.includes("Hybrid") ? "Yes" : "No"}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.preferencesTextStyleValues}>
                                {preference?.preferedLocations.includes("Remote") ? "Yes" : "No"}
                            </Text>
                        </View>
                    </View>
                </View>


                {/* <View style={{flexDirection:"row",justifyContent:'space-between',flex:1,paddingHorizontal:20,borderWidth:2}}>
                <View style={[styles.preferencesLineStyle,styles.preferencesWrapperContent]}>
                    <Text style={styles.preferencesTextStyle}>Minimum annual salary</Text>
                </View>
                <View>
                    <Text style={styles.preferencesTextStyle}>$90,000</Text>
                </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:'space-between',flex:1,paddingHorizontal:20,borderWidth:2}}>
                <View style={[styles.preferencesLineStyle,styles.preferencesWrapperContent]}>
                    <Text style={styles.preferencesTextStyle}>Minimum annual salary</Text>
                </View>
                <View>
                    <Text style={styles.preferencesTextStyle}>$90,000</Text>
                </View>
            </View> */}


            </View>
        </View >
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
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 10,
    },
    cardBodyHeader: {
        fontSize: 15,
        color: colors.black,
    },
    preferencesTextStyle: {
        color: colors.black,
        fontWeight: '300',
        marginTop: 2,
        fontSize: 13
    },
    preferencesTextStyleValues: {
        color: colors.black,
        fontWeight: '300',
        marginTop: 2,
        fontSize: 13,
        fontWeight: "400",
        marginBottom: 8
    },
    preferencesLineStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        width: '110%'
    },
    preferencesWrapperContent: {
        marginRight: 35,
    }
})