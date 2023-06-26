import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'
import { IS_SCREEN_WIDTH_480_ABOVE, SCREEN_WIDTH } from '../../values/dimens'
import * as Animatable from 'react-native-animatable';

class BaseModal extends Component {

    state = {
        isVisible: false
    }

    showModal = () => {
        this.setState({ isVisible: true })
    }

    hideModal = () => {
        this.setState({ isVisible: false })
    }

    render() {
        const { overlayStyle, animation, children, onBackdropPress, easing } = this.props;
        const { isVisible } = this.state;
        return (
            <Overlay
                isVisible={isVisible}
                onBackdropPress={onBackdropPress}
                // style='overflow'
                style={styles.parent}
                overlayStyle={[styles.overlayStyle, overlayStyle]}
                backdropStyle={styles.backdropStyle}
            >
                <Animatable.View
                    animation={animation ? animation : 'fadeIn'}
                    easing={easing}
                    duration={1000}
                    useNativeDriver
                    style={styles.shadow}
                >
                    {children}
                </Animatable.View>
            </Overlay>
        )
    }
}

export default BaseModal

const styles = StyleSheet.create({
    parent: {
        backgroundColor: 'transparent',
        // backgroundColor: '#ffff',
        // shadowColor: '#000000',
        // shadowOffset: { height: 5, width: 0 },
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        // elevation: 24,

    },
    overlayStyle: {
        padding: 0,
        width: SCREEN_WIDTH > 480 ? SCREEN_WIDTH / 2 + 48 : SCREEN_WIDTH - 48,
        borderRadius: IS_SCREEN_WIDTH_480_ABOVE ? 20 : 12,
        backgroundColor: 'transparent',
        // shadowColor: '#000000',
        // shadowOffset: { height: 5, width: 0 },
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        // elevation: 48,
        // marginHorizontal:16
    },
    backdropStyle: {
        backgroundColor: '#00000033',
        // shadowColor: '#000000',
        // shadowOffset: { height: 5, width: 0 },
        // shadowOpacity: 0.5,
        // shadowRadius: 5,
        // elevation: 24,
        // marginHorizontal:16
        // width:SCREEN_WIDTH > 480 ? SCREEN_WIDTH/2+48 : SCREEN_WIDTH-48,
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 32,
        backgroundColor: '#00000000',
        borderRadius: IS_SCREEN_WIDTH_480_ABOVE ? 20 : 12,
    }
})
