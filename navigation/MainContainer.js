import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/Feather';

//Import Screens

import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from "../screens/FriendsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfile from "../screens/EditProfile";

//Screen Names

const homeName='Home';
const friendsName='Friends';
const profileName='Profile';
const editProfile ='Settings';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
     
        <Tab.Navigator
        initialRouteName={homeName}
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === friendsName) {
              iconName = focused ? 'people-sharp' : 'people-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
            }
           else if (rn === editProfile) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />; 
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3491ff',
          inactiveTintColor: 'grey',
          //showLabel:false,
          //labelStyle: { paddingBottom: 5, fontSize: 10 },
          //style: { padding: 10, height: 70, paddingTop:10 }
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name={friendsName} component={FriendsScreen} options={{headerShown:false}} />
        <Tab.Screen name={profileName} component={ProfileScreen} options={{headerShown:false}}/>
        <Tab.Screen name={editProfile} component={EditProfile} options={{headerShown : false}}/>
        

      </Tab.Navigator>
     
    );
};

export default MainContainer;