
import { View, Text, StyleSheet, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import Routes from './app/navigator/Routes'
import { toastConfig } from './app/views/hoc/Toast'
import Toast from 'react-native-toast-message';
import configStore from './app/redux/store/configStore';

// Redux
import { Provider } from 'react-redux';

export default function App() {

  useEffect(() => {
    _init();
  }, [])

  const _init = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  return (
    <View style={{ flex: 1 }}>
      <Provider store={configStore}>
        <Routes />
        <Toast ref={ref => Toast.setRef(ref)} config={toastConfig} />
      </Provider>
    </View>
  )
}

