
import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { colors } from '../../values/colors'
import MyStatusBar from '../components/MyStatusBar'
import HeaderView from '../components/HeaderView'
import Loader from './Loader'
// import SuccessModal from '../modals/SuccessModal'

export default class BaseView extends Component {

    state = {
        loader : false,
        isRefreshing : false
    }

    componentDidMount = () => {
    };


    showLoader = () => {
        this.setState({
            loader : true
        })
    }


    hideLoader = () => {
        this.setState({
            loader : false
        })
    }


    showRefreshing = () => {
        this.setState({
            isRefreshing : true
        })
    }


    hideRefreshing = () => {
        this.setState({
            isRefreshing : false
        })
    }


    render() {

        const {
            hasStatusBar,statusBarColor,
            headerParentStyle,hasHeader,
            parentStyle,children,hasTitle} = this.props;
        const {loader} = this.state;
         

        return (
            <View style={[styles.safeAreaView,parentStyle]}>
                {
                    hasStatusBar
                    &&
                    <MyStatusBar 
                        statusBarColor={statusBarColor ? statusBarColor : colors.accent}
                    />
                }
                {
                    hasHeader
                    &&
                    <HeaderView 
                        {...this.props}
                        onMenuPress={() => this.props.navigation.toggleDrawer()}
                        title={this.props.headerTitle}
                        parentStyle={[{backgroundColor:colors.accent},headerParentStyle]}
                        onNotificationPress={() => this.props.navigation.navigate('Notifications')}
                    />
                }

                
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                    style={{flex:1}}
                >
                    {children}
                </KeyboardAvoidingView>
                
                <Loader 
                    loader={loader}
                />
{/* 
                <SuccessModal 
                    ref={ref=>this.successModal=ref}
                /> */} 

            </View>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaView : {
        flex:1,
    },
    view : {
        flex:1,
        backgroundColor:'#fff'
    },
    loader : {
        padding:24,
        backgroundColor: '#fff',
        borderRadius:8
    }
});
