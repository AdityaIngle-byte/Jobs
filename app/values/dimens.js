import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const IS_SCREEN_WIDTH_480_ABOVE = SCREEN_WIDTH > 480;
export const IS_TABLET = SCREEN_WIDTH > 480;
