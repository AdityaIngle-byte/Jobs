import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import InputView2 from './InputView2'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const PlusMinusCounter = (props) => {

    const { label, placeholder, value, setValue, error, touched } = props;

    return (
        <View style={{ height: 40, flexDirection: "row" }}>
            <InputView2
                parentStyle={{ borderWidth: 0, borderRadius: 0 }}
                textInputViewStyle={{ backgroundColor: null }}
                label={label}
                placeholder={placeholder}
                value={value.toString()}
                onChangeText={(text) => { setValue(+text) }}
                error={error}
                touched={touched}
            />

            <View style={styles.iconBody}>
                <FontAwesome
                    name={'sort-up'}
                    color={'#888'}
                    size={20}
                    onPress={() => { setValue((prevState) => prevState + 1) }}
                />
                <FontAwesome
                    name={'sort-down'}
                    color={'#888'}
                    size={20}
                    onPress={() => { setValue((prevState) => prevState !== 0 ? prevState - 1 : prevState) }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    counterParent: {
        // alignItems: 'center',
        flexDirection: 'row',
        // paddingHorizontal: 4,
        // backgroundColor: '#fff',
        // borderRadius: 5,
        // borderWidth: 0.2,
        // marginTop: 20,
        // flex: 1,
    },
    iconBody: {
        // marginRight: 10,
        // paddingVertical: 10,
    },
})

export default PlusMinusCounter