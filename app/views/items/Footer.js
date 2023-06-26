import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { images } from '../../assets/images'
import { fonts } from '../../values/fonts'
import { colors } from '../../values/colors';

export default function Footer(props) {
    const {privacyTextVisible} = props;
  return (
    <>
        <View style={[styles.row]}>
            <Text style={styles.powered}>Powered By </Text>
            <Image
                source={images.high5logo}
                style={styles.bottomHigh5Logo}
                resizeMode={'contain'}
            />
        </View>
        {
            privacyTextVisible &&
            <Text style={styles.powered}>Privacy Policy and Terms of Service</Text>
        }
    </>
  )
}

const styles = StyleSheet.create({
    bottomHigh5Logo: {
        height: 24,
        width: 48,
        marginBottom: 1,
        marginLeft:4
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    powered: {
        fontSize: 12,
        fontFamily: fonts.notoSans600,
        color: '#888',
    },
})