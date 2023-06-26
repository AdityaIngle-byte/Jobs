import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import { colors } from '../../values/colors';
import {SCREEN_WIDTH} from '../../values/dimens';
// import { fonts } from '../../values/fonts';
import ButtonView from '../components/ButtonView';

export const toastConfig = {
  success: ({text1, props}) => (
    <View style={styles.successParent}>
      <Icon name="done" type="material" color="#fff" />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),

  error: ({text1, props}) => (
    <View style={styles.errorParent}>
      <Icon name="error" type="material" color="#fff" size={20} />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),

  message: ({text1, props}) => (
    <View style={styles.messageParent}>
      <Text style={[styles.text]}>{text1}</Text>
    </View>
  ),

  confirm: ({text1, props}) => (
    <View style={styles.confirmParent}>
      <View style={styles.row}>
        <Icon name="alert" type="foundation" color="#fff" size={24} />
        <Text style={[styles.text, {fontSize: 14}]}>{text1}</Text>
      </View>
      <View style={[styles.row, {justifyContent: 'flex-end', marginTop: 8}]}>
        <ButtonView
          title={props.buttonTitle}
          onPress={props.onButtonPress}
          containerStyle={{marginRight: 12}}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            paddingHorizontal: 16,
          }}
          titleStyle={{color: '#fff'}}
          size="small"
        />
        <ButtonView
          title={'Cancel'}
          onPress={props.onCancel}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            paddingHorizontal: 16,
          }}
          size="small"
        />
      </View>
    </View>
  ),

  choiceConfirm: ({text1, props}) => (
    <View style={styles.confirmParent}>
      <View style={styles.row}>
        <Icon name="alert" type="foundation" color="#fff" size={24} />
        <Text style={[styles.text, {fontSize: 14}]}>{text1}</Text>
      </View>
      <View style={[styles.row, {justifyContent: 'flex-end'}]}>
        <ButtonView
          title={props.buttonTitle}
          onPress={props.onButtonPress}
          containerStyle={{marginRight: 12}}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            paddingHorizontal: 16,
          }}
          titleStyle={{color: '#fff'}}
          size="small"
        />
        <ButtonView
          title={props.buttonTitle2}
          onPress={props.onButtonPress2}
          containerStyle={{marginRight: 12}}
          buttonStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            paddingHorizontal: 16,
          }}
          titleStyle={{color: '#fff'}}
          size="small"
        />
        <ButtonView
          title={'Cancel'}
          onPress={props.onCancel}
          //   buttonStyle={{
          //     backgroundColor: colors.alert,
          //     borderColor: colors.primary,
          //     paddingHorizontal: 16,
          //   }}
          outline
          size="small"
        />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  successParent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#53A653',
    height: 48,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorParent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3333',
    height: 48,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  messageParent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 48,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 12,
    // fontFamily:fonts.notoSansMedium,
    color: '#fff',
    paddingLeft: 8,
  },
  confirmParent: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
