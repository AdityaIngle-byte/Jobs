import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import BaseView from '../hoc/BaseView'

export default function UploadResume(props) {

  const baseViewRef = useRef(null);

  return (
    <BaseView
      hasTitle headerTitle={'Upload Resume'}
      hasHigh5Logo

    >
      <Text>e</Text>
    </BaseView>
  )
}