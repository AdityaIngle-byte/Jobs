import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {images} from '../../assets/images';
import {IS_TABLET} from '../../values/dimens';

const Loader = props => {
  return (
    <Overlay
      isVisible={props.loader}
      overlayStyle={{backgroundColor: '#0000', elevation: 0}}
      backdropStyle={{backgroundColor: '#00000080'}}>
      <Image
        source={images.loader}
        style={{height: IS_TABLET ? 480 : 240, width: IS_TABLET ? 480 : 240}}
      />
    </Overlay>
  );
};

export default Loader;

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: 240,
    // backgroundColor: '#00000000'
  },
  loader: {},
});
