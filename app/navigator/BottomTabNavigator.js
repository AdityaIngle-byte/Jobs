import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../views/screens/Home';
import JobApplications from '../views/screens/JobApplications';
import CustomBottomTabView from './items/CustomBottomTabView';
import Assessments from '../views/screens/Assessments';
import JobsForYou from '../views/screens/JobsForYou';

const Tab = createBottomTabNavigator();

export const  BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
        screenOptions={{headerShown:false}}
        initialRouteName='Home' 
        backBehavior='initialRoute'
        tabBar={props => (
            <CustomBottomTabView  {...props} />
        )}
        // swipeEnabled
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="JobApplications" component={JobApplications} />
      <Tab.Screen name="Assessments" component={Assessments} />
      <Tab.Screen name="JobsForYou" component={JobsForYou} />
    </Tab.Navigator>
  );
}