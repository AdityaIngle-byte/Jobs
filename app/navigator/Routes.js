// Basic React native dependencies
import * as React from 'react';
import { View, Text, ActivityIndicator, Linking } from 'react-native';

// Navigation libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../views/screens/Login';
import CareerPage from '../views/screens/CareerPage';
import JobDescription from '../views/screens/JobDescription';
import ProfileDescription from '../views/screens/ProfileDescription';
import ProfileEducation from '../views/screens/ProfileEducation';
import Splash from '../views/screens/Splash';
import { BottomTabNavigator } from './BottomTabNavigator';
import ProfileExperience from '../views/screens/ProfileExperience';
import UploadResume from '../views/screens/UploadResume';
import ContactInfo from '../views/screens/ContactInfo';
import SelectAddress from '../views/screens/common/SelectAddress';
import ProfileInfo from '../views/screens/ProfileInfo';
import ProfileSkills from '../views/screens/ProfileSkills';
import SocialMedia from '../views/screens/SocialMedia';
import Preferences from '../views/screens/Preferences';
import ScoreCard from '../views/screens/ScoreCard';
import Screening from '../views/screens/Screening';
import EditPreferences from '../views/screens/EditPreferences';
import Vetting from '../views/screens/Vetting';
import JobsForYou from '../views/screens/JobsForYou';


const Stack = createNativeStackNavigator();

function Routes() {

  const linking = {
    prefixes: ['hi5jobs://'],
    config: {
      initialRouteName: 'JobDescription',
      screens: {
        JobDescription: {
          path: 'careers/:tenantId/joblist/jobdescription/:jobId/recruiter/:recruiterid'
        }
      }
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<ActivityIndicator color="blue" size="large" />}>
      <Stack.Navigator
        initialRouteName='CareerPage'
        screenOptions={{
          headerShown: false,
          headerMode: 'float',
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="CareerPage" component={CareerPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="JobDescription" component={JobDescription} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ProfileDescription" component={ProfileDescription} />
        <Stack.Screen name="JobsForYou" component={JobsForYou} />
        <Stack.Screen name="ProfileEducation" component={ProfileEducation} />
        <Stack.Screen name="ProfileExperience" component={ProfileExperience} />
        <Stack.Screen name="UploadResume" component={UploadResume} />
        <Stack.Screen name="ContactInfo" component={ContactInfo} />
        <Stack.Screen name="SelectAddress" component={SelectAddress} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="ProfileSkills" component={ProfileSkills} />
        <Stack.Screen name="SocialMedia" component={SocialMedia} />
        <Stack.Screen name="Preferences" component={Preferences} />
        <Stack.Screen name="ScoreCard" component={ScoreCard} />
        <Stack.Screen name="Screening" component={Screening} />
        <Stack.Screen name="EditPreferences" component={EditPreferences} />
        <Stack.Screen name="Vetting" component={Vetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Routes;
