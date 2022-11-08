import React from "react";
import { View, Text } from "react-native";
import {
  createNativeStackNavigator,
  NavigationContainer,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
