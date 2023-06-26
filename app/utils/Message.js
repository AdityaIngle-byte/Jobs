
import Toast from 'react-native-toast-message';
import { Alert } from "react-native";


export const showAlertMessage = (msg,buttonTitle,onButtonPress) => {
    Alert.alert(
        'High 5 Hire',
        msg,
        [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { 
                text: buttonTitle, onPress: onButtonPress
            }
        ]
    )
}


export const showAlert = (type,msg) => {
    // console.log('[Message.js] Toast: ',Toast.show)
    Toast.show({
        type: type,
        position: 'bottom',
        text1: msg,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 48,
        bottomOffset: 40,
    })
}


export const showConfirmAlert = (buttonTitle,msg,onButtonPress) => {
    // console.log('[Message.js] Toast: ',Toast.show)
    Toast.show({
        type: 'confirm',
        position: 'bottom',
        text1: msg,
        visibilityTime: 10000,
        autoHide: true,
        topOffset: 48,
        bottomOffset: 40,
        props : {
            buttonTitle : buttonTitle,
            onButtonPress : () => {
                onButtonPress();
                Toast.hide()
            },
            onCancel : () => Toast.hide(),
        }
    })
}


export const showChoiceAlert = (buttonTitle,msg,onButtonPress,buttonTitle2,onButtonPress2) => {
    // console.log('[Message.js] Toast: ',Toast.show)
    Toast.show({
        type: 'choiceConfirm',
        position: 'bottom',
        text1: msg,
        visibilityTime: 10000,
        // autoHide: true,
        topOffset: 48,
        bottomOffset: 40,
        props : {
            buttonTitle : buttonTitle,
            buttonTitle2 : buttonTitle2,
            onButtonPress : () => {
                onButtonPress();
                Toast.hide()
            },
            onButtonPress2 : () => {
                onButtonPress2();
                Toast.hide()
            },
            onCancel : () => {
                // onButtonPress2()
                Toast.hide()
            },
        }
    })
}