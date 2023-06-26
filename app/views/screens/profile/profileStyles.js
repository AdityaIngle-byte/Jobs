import { StyleSheet } from "react-native";
import { colors } from "../../../values/colors";
import { fonts } from "../../../values/fonts";

export const profileStyles = StyleSheet.create({
    parent: {
        marginTop: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // height: 40,
    },
    personalInfoText: {
        fontSize: 18,
        fontFamily: fonts.notoSansBold,
        color: '#888',
        paddingLeft: 8
    },
    editText: {
        fontFamily: fonts.notoSansMedium,
        color: colors.editTextColor,
        padding: 8,
        fontSize: 16
    },
    viewDetails: {
        fontFamily: fonts.notoSansMedium,
        color: colors.primary,
        fontSize: 14
    },
    itemTitle: {
        fontFamily: fonts.notoSansBold,
        fontSize: 14,
    },
    itemValue: {
        fontFamily: fonts.notoSansRegular,
        fontSize: 12,
    },
    itemView: {
        marginTop: 20,
        flex: 1
        // borderBottomWidth:1,
        // borderBottomColor:'#c4c4c4'
    },
    profileRowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'space-between',
        // height: 40,
    },
    noData: {
        fontFamily: fonts.notoSansMedium,
        fontSize: 12,
        textAlign: 'center'
    },
    headingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },
    heading: {
        fontSize: 16,
        color: colors.textInputTextColor,
        fontFamily: fonts.notoSansMedium,
        paddingLeft: 4
    },
    headingReset: {
        fontSize: 12,
        paddingBottom: 4,
        color: colors.darkBlueColor,
        fontFamily: fonts.notoSansBold
    },
    multiLineTextInputStyle: {
        minHeight: 172,
        paddingTop: 24,
        // borderWidth:1,
        borderColor: '#d4d4d4',
        padding: 12,
        borderRadius: 4,
        borderBottomColor: '#d4d4d4',
        backgroundColor: '#fff',
        textAlignVertical: 'top'
    }
})