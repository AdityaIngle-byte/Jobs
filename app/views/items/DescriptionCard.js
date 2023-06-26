import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../values/colors'
import { Icon } from 'react-native-elements'
import { fonts } from '../../values/fonts'


export default function DescriptionCard(props) {

    const { item, onEditProfileDescription } = props;
    const text = item ? item : 'Enter your Description here.';
    const noDescriptionText = 'Description not yet added. Please update it by clicking Edit Button Above';
    const [showMore, setShowMore] = useState(false);
    const description = text;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cardTitle}>Description</Text>
                <Icon
                    name={'edit'}
                    type={'AntDesign'}
                    color={colors.black}
                    size={20}
                    onPress={() => onEditProfileDescription('ProfileDescription')}
                />
            </View>
            <View style={styles.body}>
                {
                    item ? <Text style={styles.descriptionText}>{showMore ? description : description.substring(0, 100)}<Text style={styles.displayText} onPress={() => setShowMore(!showMore)}> {showMore ? 'show less' : ' ...show more'}</Text></Text>
                        :
                        <Text style={styles.descriptionText}>{noDescriptionText}</Text>
                }

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
        paddingHorizontal: 13,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Platform.OS == 'ios' ? 10 : 0,
        marginBottom: 10,
        marginLeft: 5
    },
    descriptionText: {
        fontSize: 12,
        color: colors.black,
        fontFamily: fonts.notoSansRegular
    },
    displayText: {
        color: '#ADAAAA',
        fontSize: 12,
        fontFamily: fonts.notoSansRegular,
        fontWeight: '500'
    }
})