import  React, {useState}  from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/home.js';
import MobileAds from './components/MobileView.js';
import PostAd from './components/PostAd.js';
import Detail from './components/Details.js';
import MyAds from './components/MyAds.js';
import MyAdsDetails from './components/MyAdsDetails';
import UpdateAd from './components/UpdateAd';
import Offer from './components/Offers';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

 function App ()  {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='MyAds'>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='MobileAds' component={MobileAds}/>
    <Stack.Screen name='PostAD' component={PostAd}/>
    <Stack.Screen name='Details' component={Detail}/>
    <Stack.Screen name='MyAds' component={MyAds}/>
    <Stack.Screen name='MyAdsDetails' component={MyAdsDetails}/>
    <Stack.Screen name='UpdateMyAds' component={UpdateAd}/>
    <Stack.Screen name='Offers' component={Offer}/>
    
    </Stack.Navigator>
    </NavigationContainer>

    
    
  );
}






export default App;
