import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import {SCREEN_WIDTH} from '../../values/dimens'

class BaseBottomSheet extends Component {

    state = {
        isVisible : false
    }

    showModal = () => {
        this.setState({ isVisible : true})
    }

    hideModal = () => {
        this.setState({ isVisible : false})
    }

    render(){
        const {children,title} = this.props;
        const {isVisible} = this.state;
        return (
            <Overlay 
                isVisible={isVisible}
                // containerStyle={styles.containerStyle}
                onBackdropPress={() => this.hideModal()}
                overlayStyle={{position:'absolute',bottom:32}}
            >      
                
                <View 
                    // animation='slideInUp' 
                    style={styles.parent}
                    // duration={500}
                >
                    {children}
                </View>
                
            </Overlay>
        )
    }
}

export default BaseBottomSheet

const styles = StyleSheet.create({
    parent : {
        width:SCREEN_WIDTH-48,
    },
    containerStyle : {
        backgroundColor:'#00000080',
        padding:16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        width:'100%'
    }
})
