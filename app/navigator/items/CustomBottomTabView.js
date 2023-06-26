import React, { useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setBottomTab } from '../../redux/actions/homeActions'
import { BottomTabItem } from './BottomTabItem'


const CustomBottomTabView = props => {
    
    const dispatch = useDispatch()
    const tab = useSelector(state => state.home.currentBottomTab)

    useEffect(() => {
        _updateCurrentTabIndex()
        
    })


    const _updateCurrentTabIndex = () => {
        const currentTabIndex = props.state.index;
        if(currentTabIndex === 0){
            dispatch(setBottomTab('Home'))
        }
    }


    const moveToTab = (tab) => {
        props.navigation.jumpTo(tab)
        dispatch(setBottomTab(tab))
    }

    return (

        <View style={[styles.parent]}>
            <BottomTabItem 
                iconName='home'
                title={'Home'}
                iconSize={24}
                isFocused={tab === 'Home'}
                onPress={() => moveToTab('Home')}
            />
            <BottomTabItem 
                iconName='briefcase'
                title={'Job Applications'}
                isFocused={tab === 'JobApplications'}
                onPress={() => moveToTab('JobApplications')}
            />
            <BottomTabItem 
                iconName='bookmark'
                title={'Assessments'}
                iconType={'Entypo'}
                isFocused={tab === 'Assessments'}
                onPress={() => moveToTab('Assessments')}
            />
            <BottomTabItem 
                iconName='slideshare'
                title={'Jobs for you'}
                iconType={'Entypo'}
                isFocused={tab === 'JobsForYou'}
                onPress={() => moveToTab('JobsForYou')}
            />
        </View>
            
    )
}

export default CustomBottomTabView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        backgroundColor:'#fff',
        height:Platform.OS === 'ios' ? 84 : 64,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 12,
        elevation: 9,
    }
})

