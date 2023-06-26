import React from 'react'
import { View, StatusBar, Platform } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default MyStatusBar = props => (
    <View style={[{height: STATUSBAR_HEIGHT,}, { backgroundColor : props.statusBarColor}]}>
        <StatusBar translucent backgroundColor={props.statusBarColor} barStyle='light-content'/>
    </View>
  );