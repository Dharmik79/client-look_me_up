
import React from 'react'
import {View, Text} from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }} >
      <Stack.Screen component={OnboardingScreen} name="OnboardingScreen" />
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
      <Stack.Screen component={VerifyScreen} name="VerifyScreen" />
      <Stack.Screen component={ResetPasswordScreen} name="ResetPasswordScreen" />
       <Stack.Screen component={NewPasswordScreen} name="NewPasswordScreen" />
    </Stack.Navigator>
  );
};

export default AuthStack;
