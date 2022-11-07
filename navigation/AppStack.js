import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";

const screens = {
  HomeScreen: {
    screen: HomeScreen,
  },
};

const AppStack = createStackNavigator(screens);

export default createAppContainer(AppStack);
