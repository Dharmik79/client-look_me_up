import React from 'react'
import {View, Text} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerifyScreen from '../screens/VerifyScreen';

const screens = {
  OnboardingScreen: {
    screen: OnboardingScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  RegisterScreen: {
    screen: RegisterScreen,
  },
  VerifyScreen: {
    screen: VerifyScreen,
  },
};

const AuthStack = createStackNavigator(screens);

export default createAppContainer(AuthStack);